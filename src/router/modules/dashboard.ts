import { Layout } from '../routerHelper'

const dashboard: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    orderNo: 1,
    meta: {
      title: '首页',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        name: 'Analysis',
        meta: {
          title: '分析页',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'workplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        name: 'Workplace',
        meta: {
          title: '工作台',
          noCache: true
        }
      }
    ]
  }
]

export default dashboard
