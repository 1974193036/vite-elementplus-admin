import { defHttp } from '@/utils/http'
import type { DictOneData } from './types'

// 获取所有字典
export const getDictApi = () => {
  return defHttp.get({ url: '/dict/list' })
}

// 模拟获取某个字典
export const getDictOneApi = () => {
  return defHttp.get<DictOneData>({ url: '/dict/one' })
}
