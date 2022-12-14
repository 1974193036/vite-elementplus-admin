import { Layout } from '../routerHelper'

const hooks: AppRouteRecordRaw[] = [
  {
    path: '/hooks',
    component: Layout,
    redirect: '/hooks/useWatermark',
    name: 'Hooks',
    orderNo: 4,
    meta: {
      title: 'hooks',
      icon: 'ic:outline-webhook',
      alwaysShow: true,
      roles: ['admin']
    },
    children: [
      {
        path: 'useWatermark',
        component: () => import('@/views/hooks/useWatermark.vue'),
        name: 'UseWatermark',
        meta: {
          title: 'useWatermark'
        }
      },
      {
        path: 'useCopy',
        component: () => import('@/views/hooks/useCopy.vue'),
        name: 'UseCopy',
        meta: {
          title: 'useCopy'
        }
      },
      {
        path: 'useCrudSchemas',
        component: () => import('@/views/hooks/useCrudSchemas.vue'),
        name: 'UseCrudSchemas',
        meta: {
          title: 'useCrudSchemas'
        }
      }
    ]
  }
]

export default hooks
