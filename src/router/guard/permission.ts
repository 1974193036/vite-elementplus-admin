import { resetRouter } from '@/router'
import { useCache } from '@/hooks/web/useCache'
import { useAppStoreWithOut } from '@/store/modules/app'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useUserStore } from '@/store/modules/user'
import { getUserInfo } from '@/api/login'
import type { RouteRecordRaw } from 'vue-router'

const { wsCache } = useCache()

const appStore = useAppStoreWithOut()

const permissionStore = usePermissionStoreWithOut()

const tagsViewStore = useTagsViewStore()

const userStore = useUserStore()

const whiteList = ['/login'] // 不重定向白名单

export function createPermissionGuard(router) {
  router.beforeEach(async (to, from, next) => {
    if (wsCache.get(appStore.getUserInfo)) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (permissionStore.getIsAddRouters) {
          next()
          return
        }

        const res = await getUserInfo().catch(() => {})
        if (res) {
          // 设置用户基本信息
          userStore.setUserInfo(res)
          if (appStore.getDynamicRouter === 'backend') {
            // 后端路由
            const routers = res.menus || []
            await permissionStore.generateRoutes({ type: 'backend', routers }).catch(() => {})
          } else if (appStore.getDynamicRouter === 'frontend') {
            // 前端路由
            const roles = (res.roles || []).map((v) => v.value)
            await permissionStore.generateRoutes({ type: 'frontend', roles }).catch(() => {})
          } else if (appStore.getDynamicRouter === 'none') {
            // 不控制路由，展示所有路由
            await permissionStore.generateRoutes({ type: 'none' }).catch(() => {})
          }
          permissionStore.getAddRouters.forEach((route) => {
            router.addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
          })
          permissionStore.setIsAddRouters(true)

          const redirectPath = from.query.redirect || to.path
          const redirect = decodeURIComponent(redirectPath as string)
          const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
          next(nextData)
        } else {
          wsCache.clear()
          tagsViewStore.delAllViews()
          resetRouter() // 重置静态路由表
          router.replace('/login')
          next()
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      }
    }
  })
}
