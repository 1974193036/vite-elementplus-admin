import { defHttp } from '@/utils/http'
import type { TableData, TableResultModel } from './types'

export const getTableListApi = (params: any) => {
  return defHttp.get<TableResultModel>({ url: '/example/list', params })
}

export const saveTableApi = (data: Partial<TableData>)=> {
  return defHttp.post({ url: '/example/save', data })
}

export const getTableDetApi = (id: string) => {
  return defHttp.get<TableData>({ url: '/example/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]) => {
  return defHttp.post({ url: '/example/delete', data: { ids } })
}
