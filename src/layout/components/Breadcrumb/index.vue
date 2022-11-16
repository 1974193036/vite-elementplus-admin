<script lang="tsx">
import { TransitionGroup } from 'vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
import { filterBreadcrumb } from './helper'
import { filter, treeToList } from '@/utils/tree'
import type { RouteLocationNormalizedLoaded, RouteMeta } from 'vue-router'
import { Icon } from '@/components/Icon'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'


const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('breadcrumb') // v-breadcrumb

const appStore = useAppStore()

// 是否显示面包屑图标
const breadcrumbIcon = computed(() => appStore.getBreadcrumbIcon)

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const { currentRoute } = useRouter()

    const levelList = ref<AppRouteRecordRaw[]>([])

    const permissionStore = usePermissionStore()

    const menuRouters = computed(() => {
      const routers = permissionStore.getRouters
      return filterBreadcrumb(routers)
    })


    const getBreadcrumb = () => {
      const currentPath = currentRoute.value.path
      // console.log('currentPath', currentPath)
      // console.log('menuRouters', menuRouters.value)
      levelList.value = filter<AppRouteRecordRaw>(unref(menuRouters), (node: AppRouteRecordRaw) => {
        return node.path === currentPath
      })
      // console.log('levelList', levelList.value)
    }

    const renderBreadcrumb = () => {
      const breadcrumbList = treeToList<AppRouteRecordRaw[]>(unref(levelList))
      // console.log('breadcrumbList', breadcrumbList)
      return breadcrumbList.map((v) => {
        const disabled = v.redirect === 'noredirect'
        const meta = v.meta as RouteMeta
        return (
          <ElBreadcrumbItem to={{ path: disabled ? '' : v.path }} key={v.name}>
            {meta?.icon && breadcrumbIcon.value ? (
              <>
                <Icon icon={meta.icon} class="mr-[5px]"></Icon> {v?.meta?.title}
              </>
            ) : (
              <>{v?.meta?.title}</>
            )}
          </ElBreadcrumbItem>
        )
      })
    }

    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        if (route.path.startsWith('/redirect/')) {
          return
        }
        getBreadcrumb()
      },
      {
        immediate: true
      }
    )

    return () => (
      <ElBreadcrumb separator="/" class={`${prefixCls}-box flex items-center h-full ml-[10px]`}>
        <TransitionGroup appear name="breadcrumb">
          {renderBreadcrumb()}
        </TransitionGroup>
      </ElBreadcrumb>
    )
  }
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-breadcrumb'; // v-breadcrumb
$prefix-cls-box: '#{$namespace}-breadcrumb-box'; // v-breadcrumb-box

.#{$prefix-cls-box} {
  :deep(.#{$prefix-cls}__item) {
    display: flex;
    .#{$prefix-cls}__inner {
      display: flex;
      align-items: center;
      color: var(--top-header-text-color);

      &:hover {
        // color: $color-primary;
        color: var(--#{$namespace}-color-primary);
      }
    }
  }

  :deep(.#{$prefix-cls}__item):not(:last-child) {
    .#{$prefix-cls}__inner {
      color: var(--top-header-text-color);

      &:hover {
        // color: $color-primary;
        color: var(--#{$namespace}-color-primary);
      }
    }
  }

  :deep(.#{$prefix-cls}__item):last-child {
    .#{$prefix-cls}__inner {
      color: var(--#{$namespace}-text-color-placeholder);

      &:hover {
        color: var(--#{$namespace}-text-color-placeholder);
      }
    }
  }
}
</style>
