/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */

import WebStorageCache from 'web-storage-cache'

type CacheType = 'sessionStorage' | 'localStorage'

const llCache = new WebStorageCache({
  storage: 'localStorage'
})

const ssCache = new WebStorageCache({
  storage: 'sessionStorage'
})

export const useCache = (type: CacheType = 'localStorage') => {
  let wsCache: Nullable<WebStorageCache> = null

  if (type === 'localStorage') {
    wsCache = llCache
  } else {
    wsCache = ssCache
  }

  return {
    wsCache
  }
}
