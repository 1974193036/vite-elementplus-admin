import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '../_util'

const timeout = 100

export default [
  // 列表接口
  {
    url: '/basic-api/dict/list',
    method: 'get',
    timeout,
    response: () => {
      return resultSuccess({
        data: {
          importance: [
            {
              value: 0,
              label: '一般'
            },
            {
              value: 1,
              label: '良好'
            },
            {
              value: 2,
              label: '重要'
            }
          ]
        }
      })
    }
  },
  // 获取某个字典
  {
    url: '/basic-api/dict/one',
    method: 'get',
    timeout,
    response: () => {
      return resultSuccess({
        data: [
          {
            label: 'test1',
            value: 0
          },
          {
            label: 'test2',
            value: 1
          },
          {
            label: 'test3',
            value: 2
          }
        ]
      })
    }
  }
] as MockMethod[]
