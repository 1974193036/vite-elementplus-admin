import { defHttp } from '@/utils/http'
import { LoginParams, LoginResultModel } from './types'

const enum Api {
  Login = '/login',
  Logout = '/logout'
  // GetUserInfo = '/getUserInfo',
  // GetPermCode = '/getPermCode',
  // TestRetry = '/testRetry'
}

export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params
    },
    {
      errorMessageMode: 'message'
    }
  )
}

export function loginOutApi() {
  return defHttp.get({ url: Api.Logout })
}

// /**
//  * @description: getUserInfo
//  */
// export function getUserInfo() {
//   return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
// }

// export function getPermCode() {
//   return defHttp.get<string[]>({ url: Api.GetPermCode })
// }



// export function testRetry() {
//   return defHttp.get(
//     { url: Api.TestRetry },
//     {
//       retryRequest: {
//         isOpenRetry: true,
//         count: 5,
//         waitTime: 1000,
//       },
//     },
//   )
// }
