<script lang="tsx">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { isUrl } from '@/utils/is'
import { useRenderMenuItem } from './useRenderMenuItem'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('menu') // v-menu

export default defineComponent({
  name: 'Menu',
  props: {
    menuSelect: {
      type: Function as PropType<(index: string) => void>,
      default: undefined
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()

    const layout = computed(() => appStore.getLayout)

    const menuMode = computed((): 'vertical' | 'horizontal' => {
      // 竖
      const vertical: LayoutType[] = ['classic', 'topLeft', 'cutMenu']

      if (vertical.includes(unref(layout))) {
        return 'vertical' // 竖
      } else {
        return 'horizontal' // 水平
      }
    })

    const routers = computed(() =>
      unref(layout) === 'cutMenu' ? permissionStore.getMenuTabRouters : permissionStore.getRouters
    )

    const collapse = computed(() => appStore.getCollapse)

    const uniqueOpened = computed(() => appStore.getUniqueOpened)

    const { push, currentRoute } = useRouter()

    const activeMenu = computed(() => {
      const { meta, path } = unref(currentRoute)
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })

    const menuSelect = (index: string) => {
      if (props.menuSelect) {
        props.menuSelect(index)
      }
      // 自定义事件
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }

    const renderMenu = () => {
      return (
        <ElMenu
          defaultActive={unref(activeMenu)}
          mode={unref(menuMode)}
          collapse={
            unref(layout) === 'top' || unref(layout) === 'cutMenu' ? false : unref(collapse)
          }
          uniqueOpened={unref(layout) === 'top' ? false : unref(uniqueOpened)}
          backgroundColor="var(--left-menu-bg-color)"
          textColor="var(--left-menu-text-color)"
          activeTextColor="var(--left-menu-text-active-color)"
          onSelect={menuSelect}
        >
          {{
            default: () => {
              const { renderMenuItem } = useRenderMenuItem(unref(menuMode))
              return renderMenuItem(unref(routers))
            }
          }}
        </ElMenu>
      )
    }

    const renderMenuWrap = () => {
      if (unref(layout) === 'top') {
        return renderMenu()
      } else {
        return <ElScrollbar>{renderMenu()}</ElScrollbar>
      }
    }

    return () => (
      <div
        id={prefixCls}
        class={[
          `${prefixCls}-box ${prefixCls}__${unref(menuMode)}`,
          'h-[100%] overflow-hidden flex-col bg-[var(--left-menu-bg-color)]',
          {
            'w-[var(--left-menu-min-width)]': unref(collapse) && unref(layout) !== 'cutMenu',
            'w-[var(--left-menu-max-width)]': !unref(collapse) && unref(layout) !== 'cutMenu'
          }
        ]}
      >
        {renderMenuWrap()}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
$prefix: '#{$namespace}'; // v
$prefix-cls: '#{$namespace}-menu'; // v-menu
$prefix-cls-box: '#{$namespace}-menu-box'; // v-menu-box

@mixin is-active-after {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  // background-color: $color-primary;
  background-color: var(--#{$namespace}-color-primary);;
  content: '';
}
.is-active--after {
  @include is-active-after;
}

.#{$prefix-cls-box} {
  position: relative;
  transition: width var(--transition-time-02);

  &:after {
    position: absolute;
    top: 0;
    right: -1px;
    height: 100%;
    border-left: 1px solid;
    border-color: var(--left-menu-border-color);
    content: '';
  }

  :deep(.#{$prefix}-menu) {
    width: 100% !important;
    border-right: none;

    // 设置选中时子标题的颜色
    .is-active {
      & > .#{$prefix}-sub-menu__title {
        color: var(--left-menu-text-active-color) !important;
      }
    }

    // 设置子菜单悬停的高亮和背景色
    .#{$prefix}-sub-menu__title,
    .#{$prefix}-menu-item {
      &:hover {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-color) !important;
      }
    }

    // 设置选中时的高亮背景和高亮颜色
    .#{$prefix}-sub-menu.is-active,
    .#{$prefix}-menu-item.is-active {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-active-color) !important;

      &:hover {
        background-color: var(--left-menu-bg-active-color) !important;
      }
    }

    .#{$prefix}-menu-item.is-active {
      position: relative;

      &:after {
        @include is-active-after;
      }
    }

    // 设置子菜单的背景颜色
    .#{$prefix}-menu {
      .#{$prefix}-sub-menu__title,
      .#{$prefix}-menu-item:not(.is-active) {
        background-color: var(--left-menu-bg-light-color) !important;
      }
    }
  }

  // 折叠时的最小宽度
  :deep(.#{$prefix}-menu--collapse) {
    width: var(--left-menu-min-width);

    & > .is-active,
    & > .is-active > .#{$prefix}-sub-menu__title {
      position: relative;
      background-color: var(--left-menu-collapse-bg-active-color) !important;

      &:after {
        @include is-active-after;
      }
    }
  }

  // 折叠动画的时候，就需要把文字给隐藏掉
  :deep(.horizontal-collapse-transition) {
    // transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out !important;
    .#{$prefix-cls}__title {
      display: none;
    }
  }
}

// 水平菜单
.#{$prefix-cls}__horizontal {
  height: calc(var(--top-tool-height)) !important;

  :deep(.#{$prefix}-menu--horizontal) {
    height: calc(var(--top-tool-height));
    border-bottom: none;
    justify-content: center;
    // 重新设置底部高亮颜色
    & > .#{$prefix}-sub-menu.is-active {
      .#{$prefix}-sub-menu__title {
        border-bottom-width: 2px;
        // border-bottom-color: $color-primary !important;
        border-bottom-color: var(--#{$namespace}-color-primary) !important;
      }
    }

    .#{$prefix}-menu-item.is-active {
      position: relative;

      &:after {
        display: none !important;
      }
    }

    .#{$prefix-cls}__title {
      /* stylelint-disable-next-line */
      max-height: calc(var(--top-tool-height) - 2px) !important;
      /* stylelint-disable-next-line */
      line-height: calc(var(--top-tool-height) - 2px);
    }
  }
}
</style>

<style lang="scss">
$prefix: '#{$namespace}'; // v
$prefix-cls: '#{$namespace}-menu-popper'; // v-menu-popper

@mixin is-active-after {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  // background-color: $color-primary;
  background-color: var(--#{$namespace}-color-primary);
  content: '';
}

.is-active--after {
  @include is-active-after;
}

.#{$prefix-cls}--vertical,
.#{$prefix-cls}--horizontal {
  // 设置选中时子标题的颜色
  .is-active {
    & > .#{$prefix}-sub-menu__title {
      color: var(--left-menu-text-active-color) !important;
    }
  }

  // 设置子菜单悬停的高亮和背景色
  .#{$prefix}-sub-menu__title,
  .#{$prefix}-menu-item {
    &:hover {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-color) !important;
    }
  }

  // 设置选中时的高亮背景
  .#{$prefix}-menu-item.is-active {
    position: relative;
    background-color: var(--left-menu-bg-active-color) !important;

    &:hover {
      background-color: var(--left-menu-bg-active-color) !important;
    }

    &:after {
      @include is-active-after;
    }
  }
}
</style>
