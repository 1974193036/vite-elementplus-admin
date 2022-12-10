import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultTimeout, resultSuccess, getRequestToken } from '../_util'
import type { requestParams } from '../_util'

function createFakeUserList() {
  return [
    // 超级管理员
    {
      userId: '1',
      username: 'admin',
      realName: '超级管理员',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: '管理员～',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      permissions: ['example:dialog:edit', 'example:dialog:view', 'example:dialog:delete'],
      roles: [
        {
          roleName: '超级管理员',
          value: 'admin'
        }
      ],
      menus: [
        {
          path: '/dashboard',
          component: '#',
          redirect: '/dashboard/analysis',
          name: 'Dashboard',
          meta: {
            title: '首页',
            icon: 'ant-design:dashboard-filled',
            alwaysShow: true
          },
          children: [
            {
              path: 'analysis',
              component: 'views/dashboard/analysis/index',
              name: 'Analysis',
              meta: {
                title: '分析页',
                noCache: true
              }
            },
            {
              path: 'workplace',
              component: 'views/dashboard/workplace/index',
              name: 'Workplace',
              meta: {
                title: '工作台',
                noCache: true
              }
            }
          ]
        },
        {
          path: '/external-link',
          component: '#',
          meta: {},
          name: 'ExternalLink',
          children: [
            {
              path: 'https://element-plus-admin-doc.cn/',
              name: 'DocumentLink',
              meta: {
                title: '文档',
                icon: 'clarity:document-solid'
              }
            }
          ]
        },
        {
          path: '/components',
          component: '#',
          redirect: '/components/form/default-form',
          name: 'ComponentsDemo',
          meta: {
            title: '组件demo',
            icon: 'bx:bxs-component',
            alwaysShow: true
          },
          children: [
            {
              path: 'form',
              component: '##',
              name: 'Form',
              meta: {
                title: '表单',
                alwaysShow: true
              },
              children: [
                {
                  path: 'default-form',
                  component: 'views/components/Form/DefaultForm',
                  name: 'DefaultForm',
                  meta: {
                    title: '全部示例'
                  }
                },
                {
                  path: 'use-form',
                  component: 'views/components/Form/UseFormDemo',
                  name: 'UseForm',
                  meta: {
                    title: 'UseForm'
                  }
                },
                {
                  path: 'ref-form',
                  component: 'views/components/Form/RefForm',
                  name: 'RefForm',
                  meta: {
                    title: 'RefForm'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    // 测试员
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: '测试员',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: '测试员～',
      token: 'fakeToken2',
      homePath: '/dashboard/workplace',
      permissios: ['*.*.*'],
      roles: [
        {
          roleName: '测试员',
          value: 'test'
        }
      ],
      menus: [
        {
          path: '/dashboard',
          component: '#',
          redirect: '/dashboard/analysis/index',
          name: 'Dashboard',
          meta: {
            title: '首页',
            icon: 'ant-design:dashboard-filled',
            alwaysShow: true
          },
          children: [
            {
              path: 'analysis',
              component: 'views/dashboard/analysis/index',
              name: 'Analysis',
              meta: {
                title: '分析页',
                noCache: true
              }
            },
            {
              path: 'workplace',
              component: 'views/dashboard/workplace/index',
              name: 'Workplace',
              meta: {
                title: '工作台',
                noCache: true
              }
            }
          ]
        }
      ]
    }
  ]
}

const fakeCodeList = {
  '1': ['1000', '3000', '5000'],
  '2': ['2000', '4000', '6000']
}

export default [
  // 登录
  {
    url: '/basic-api/login',
    timeout: 400,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      )
      if (!checkUser) {
        return resultError('账户名或者密码错误！')
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc
      })
    }
  },
  // 获取用户信息
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('无效的token')
      if (token === '123456') {
        // 模拟401
        return resultTimeout('登录失效，请重新登录')
      }
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('没有相应的用户信息!')
      }
      return resultSuccess(checkUser)
    }
  },
  // 该角色的权限编码
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('无效的token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('无效的token')
      }
      const codeList = fakeCodeList[checkUser.userId]

      return resultSuccess(codeList)
    }
  },
  // 登出
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('无效的token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('无效的token')
      }
      return resultSuccess(null, '登出成功！')
    }
  },
  // 测试异常情况
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!')
    }
  }
] as MockMethod[]
