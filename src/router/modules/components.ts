import { Layout, getParentLayout } from '../routerHelper'

const components: AppRouteRecordRaw[] = [
  {
    path: '/components',
    component: Layout,
    redirect: '/components/form/default-form',
    name: 'ComponentsDemo',
    orderNo: 3,
    meta: {
      title: '组件demo',
      icon: 'bx:bxs-component',
      alwaysShow: true,
      roles: ['admin']
    },
    children: [
      {
        path: 'form',
        component: getParentLayout(),
        redirect: '/components/form/default-form',
        name: 'Form',
        meta: {
          title: '表单',
          alwaysShow: true
        },
        children: [
          {
            path: 'default-form',
            component: () => import('@/views/components/Form/DefaultForm.vue'),
            name: 'DefaultForm',
            meta: {
              title: '全部示例'
            }
          },
          {
            path: 'use-form',
            component: () => import('@/views/components/Form/UseFormDemo.vue'),
            name: 'UseForm',
            meta: {
              title: 'UseForm',
              roles: ['admin']
            }
          },
          {
            path: 'ref-form',
            component: () => import('@/views/components/Form/RefForm.vue'),
            name: 'RefForm',
            meta: {
              title: 'RefForm',
              roles: ['admin']
            }
          }
        ]
      },
      {
        path: 'table',
        component: getParentLayout(),
        redirect: '/components/table/default-table',
        name: 'TableDemo',
        meta: {
          title: '表格',
          alwaysShow: true
        },
        children: [
          {
            path: 'default-table',
            component: () => import('@/views/components/Table/DefaultTable.vue'),
            name: 'DefaultTable',
            meta: {
              title: '基础示例'
            }
          },
          {
            path: 'use-table',
            component: () => import('@/views/components/Table/UseTableDemo.vue'),
            name: 'UseTable',
            meta: {
              title: 'UseTable'
            }
          },
          {
            path: 'ref-table',
            component: () => import('@/views/components/Table/RefTable.vue'),
            name: 'RefTable',
            meta: {
              title: 'RefTable'
            }
          }
        ]
      },
      {
        path: 'input-password',
        component: () => import('@/views/components/InputPassword/index.vue'),
        name: 'InputPassword',
        meta: {
          title: '密码输入框'
        }
      },
      {
        path: 'search',
        component: () => import('@/views/components/Search/index.vue'),
        name: 'Search',
        meta: {
          title: '查询'
        }
      },
      {
        path: 'descriptions',
        component: () => import('@/views/components/Descriptions/index.vue'),
        name: 'Descriptions',
        meta: {
          title: '描述'
        }
      },
      {
        path: 'image-viewer',
        component: () => import('@/views/components/ImageViewer/index.vue'),
        name: 'ImageViewer',
        meta: {
          title: '图片预览'
        }
      },
      {
        path: 'dialog',
        component: () => import('@/views/components/Dialog/index.vue'),
        name: 'Dialog',
        meta: {
          title: '弹窗'
        }
      },
      {
        path: 'icon',
        component: () => import('@/views/components/Icon/index.vue'),
        name: 'Icon',
        meta: {
          title: '图标'
        }
      },
      {
        path: 'infotip',
        component: () => import('@/views/components/Infotip/index.vue'),
        name: 'Infotip',
        meta: {
          title: '信息提示'
        }
      },
      {
        path: 'highlight',
        component: () => import('@/views/components/Highlight/index.vue'),
        name: 'Highlight',
        meta: {
          title: '高亮'
        }
      },
      {
        path: 'count-to',
        component: () => import('@/views/components/CountTo/index.vue'),
        name: 'CountTo',
        meta: {
          title: '数字动画'
        }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/components/Qrcode/index.vue'),
        name: 'Qrcode',
        meta: {
          title: '二维码'
        }
      },
      {
        path: 'echart',
        component: () => import('@/views/components/Echart/index.vue'),
        name: 'Echart',
        meta: {
          title: '图表'
        }
      }
    ]
  }
]

export default components
