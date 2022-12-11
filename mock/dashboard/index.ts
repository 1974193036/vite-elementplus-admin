import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_util'

const timeout = 1000

export default [
  {
    url: '/basic-api/analysis/total',
    method: 'get',
    timeout,
    response: () => {
      return resultSuccess({
        users: 102400,
        messages: 81212,
        moneys: 9280,
        shoppings: 13600
      })
    }
  },
  {
    url: '/basic-api/analysis/userAccessSource',
    method: 'get',
    timeout,
    response: () => {
      return resultSuccess([
        { value: 1000, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ])
    }
  },
  {
    url: '/basic-api/analysis/weeklyUserActivity',
    method: 'get',
    timeout,
    response: () => {
      return resultSuccess([
        { value: 13253, name: '周一' },
        { value: 34235, name: '周二' },
        { value: 26321, name: '周三' },
        { value: 12340, name: '周四' },
        { value: 24643, name: '周五' },
        { value: 1322, name: '周六' },
        { value: 1324, name: '周日' }
      ])
    }
  },
  {
    url: '/basic-api/analysis/monthlySales',
    method: 'get',
    timeout,
    response: () => {
      return resultSuccess([
        { estimate: 100, actual: 120, name: '一月' },
        { estimate: 120, actual: 82, name: '二月' },
        { estimate: 161, actual: 91, name: '三月' },
        { estimate: 134, actual: 154, name: '四月' },
        { estimate: 105, actual: 162, name: '五月' },
        { estimate: 160, actual: 140, name: '六月' },
        { estimate: 165, actual: 145, name: '七月' },
        { estimate: 114, actual: 250, name: '八月' },
        { estimate: 163, actual: 134, name: '九月' },
        { estimate: 185, actual: 56, name: '十月' },
        { estimate: 118, actual: 99, name: '十一月' },
        { estimate: 123, actual: 123, name: '十二月' }
      ])
    }
  }
] as MockMethod[]
