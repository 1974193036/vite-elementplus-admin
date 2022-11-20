import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
// import { Layout, getParentLayout } from '@/utils/routerHelper'
import { basicRoutes } from './basic'

const modules = import.meta.globEager('./modules/**/*.ts')
const asyncRoutes: AppRouteRecordRaw[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  // @ts-ignore
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  asyncRoutes.push(...modList)
})

// @ts-ignore
asyncRoutes.sort((a, b) => a.orderNo - b.orderNo)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  strict: true,
  routes: basicRoutes as RouteRecordRaw[],
  scrollBehavior(to, _from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && !to.meta.noCache) {
      return savedPosition
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 0)
    })
  }
})

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export { basicRoutes }
export { asyncRoutes }

export default router
