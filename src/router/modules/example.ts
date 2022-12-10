import { Layout } from '../routerHelper'

const example: AppRouteRecordRaw[] = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/example-dialog',
    name: 'Example',
    orderNo: 5,
    meta: {
      title: '综合示例',
      icon: 'ep:management',
      alwaysShow: true
    },
    children: [
      {
        path: 'example-dialog',
        component: () => import('@/views/example/dialog/index.vue'),
        name: 'ExampleDialog',
        meta: {
          title: '综合示例 - 弹窗'
        }
      },
      {
        path: 'example-page',
        component: () => import('@/views/example/page/index.vue'),
        name: 'ExamplePage',
        meta: {
         title: '综合示例 - 页面'
        }
      },
      {
        path: 'example-add',
        component: () => import('@/views/example/page/ExampleAdd.vue'),
        name: 'ExampleAdd',
        meta: {
          title: '综合示例 - 新增',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-edit',
        component: () => import('@/views/example/page/ExampleEdit.vue'),
        name: 'ExampleEdit',
        meta: {
          title: '综合示例 - 编辑',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-detail',
        component: () => import('@/views/example/page/ExampleDetail.vue'),
        name: 'ExampleDetail',
        meta: {
          title: '综合示例 - 详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/example/example-page'
        }
      }
    ]
  }
]

export default example
