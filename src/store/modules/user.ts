import { defineStore } from 'pinia'
import { store } from '../index'
import type { GetUserInfoModel } from '@/api/login/types'

export const useUserStore = defineStore('user', {
  state: (): Partial<GetUserInfoModel> => ({
    username: '',
    realName: '',
    avatar: '',
    desc: '',
    roles: [],
    permissions: [] // 一些按钮权限
  }),
  getters: {
    getUserInfo(): Partial<GetUserInfoModel> {
      return {
        username: this.username,
        realName: this.realName,
        avatar: this.avatar,
        desc: this.desc,
        roles: this.roles,
        permissions: this.permissions
      }
    }
  },
  actions: {
    setUserInfo(info: GetUserInfoModel) {
      this.username = info.username
      this.realName = info.realName
      this.avatar = info.avatar
      this.desc = info.desc
      this.roles = info.roles
      this.permissions = info.permissions || []
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return useUserStore(store)
}
