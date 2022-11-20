import { defineStore } from 'pinia'
import { store } from '../index'
import type { GetUserInfoModel } from '@/api/login/types'

export const useUserStore = defineStore('user', {
  state: (): Partial<GetUserInfoModel> => ({
    username: '',
    realName: '',
    avatar: '',
    desc: '',
    roles: []
  }),
  getters: {
    getUserInfo(): Partial<GetUserInfoModel> {
      return {
        username: this.username,
        realName: this.realName,
        avatar: this.avatar,
        desc: this.desc,
        roles: this.roles
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
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return useUserStore(store)
}
