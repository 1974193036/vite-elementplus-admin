export interface LoginParams {
  username: string
  password: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

export interface LoginResultModel {
  userId: string
  token: string
  roles: RoleInfo[],
}

export interface GetUserInfoModel {
  roles: RoleInfo[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实名字
  realName: string
  // 头像
  avatar: string
  // 介绍
  desc?: string,
  // 菜单
  menus: [],
  // 主页地址
  homePath: string
}
