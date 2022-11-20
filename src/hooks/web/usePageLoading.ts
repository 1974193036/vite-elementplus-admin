import { useAppStoreWithOut } from '@/store/modules/app'

const appStore = useAppStoreWithOut()

export const usePageLoading = () => {
  const loadStart = () => {
    setTimeout(() => {
      appStore.setPageLoading(true)
    }, 50)
  }

  const loadDone = () => {
    setTimeout(() => {
      appStore.setPageLoading(false)
    }, 51)
  }

  return {
    loadStart,
    loadDone
  }
}
