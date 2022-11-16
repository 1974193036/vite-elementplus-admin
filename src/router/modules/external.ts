import { Layout } from '../routerHelper'

const external: AppRouteRecordRaw[] = [
  {
    path: '/external-link',
    component: Layout,
    name: 'ExternalLink',
    orderNo: 2,
    meta: {
      // alwaysShow: true,
      // title: '外链'
    },
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
  }
]

export default external
