
import { useCache } from '@/hooks/web/useCache'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useTitle } from '@/hooks/web/useTitle'
import { AxiosCanceler } from '@/utils/http/axiosCancel'
import { createPermissionGuard } from './permission'
import type { Router } from 'vue-router'

const { wsCache } = useCache()

const appStore = useAppStoreWithOut()

const { start: startProgress, done: doneProgress } = useNProgress()

const { loadStart: startPageLoading, loadDone: donePageLoading } = usePageLoading()

function createPageGuard(router: Router) {
  const loadedPageMap = new Map()
  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

function createProgressGuard(router: Router) {
  router.beforeEach((to) => {
    if (to.meta.loaded) {
      return true
    }
    startProgress()
    return true
  })

  router.afterEach(() => {
    doneProgress()
    return true
  })
}

function createPageLoadingGuard(router: Router) {
  router.beforeEach(async (to) => {
    let hasToken = wsCache.get(appStore.getUserInfo)
    if (!hasToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }
    startPageLoading()
    return true
  })

  router.afterEach(async () => {
    donePageLoading()
    return true
  })
}

function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    useTitle(to?.meta?.title as string)
    return true
  })
}

function createHttpGuard(router: Router) {
  let axiosCanceler
  axiosCanceler = new AxiosCanceler()

  router.beforeEach(() => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      ElMessage.closeAll()
      ElNotification.closeAll()
    } catch (error) {
      console.warn('message guard error:' + error)
    }
    return true
  })
}

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
  createPageGuard(router)
  createPageLoadingGuard(router)
  createPageTitleGuard(router)
  createProgressGuard(router)
  createHttpGuard(router)
  createMessageGuard(router)
}
