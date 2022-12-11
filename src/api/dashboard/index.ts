import { defHttp } from '@/utils/http'
import type {
  AnalysisTotalTypes,
  UserAccessSource,
  WeeklyUserActivity,
  MonthlySales
} from './types'

export const getCountApi = () => {
  return defHttp.get<AnalysisTotalTypes>({ url: '/analysis/total' })
}

export const getUserAccessSourceApi = () => {
  return defHttp.get<UserAccessSource[]>({ url: '/analysis/userAccessSource' })
}

export const getWeeklyUserActivityApi = () => {
  return defHttp.get<WeeklyUserActivity[]>({ url: '/analysis/weeklyUserActivity' })
}

export const getMonthlySalesApi = () => {
  return defHttp.get<MonthlySales[]>({ url: '/analysis/monthlySales' })
}
