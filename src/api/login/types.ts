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
  roles: RoleInfo[]
}
