import Logo from './Logo.vue'
import Menu from './Menu/index.vue'
import ToolHeader from './ToolHeader.vue'
import TagsView from './TagsView/index.vue'
import AppView from './AppView.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/store/modules/app'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout') // v-layout

const appStore = useAppStore()

// 是否显示路由跳转loading
const pageLoading = computed(() => appStore.getPageLoading)
// 是否显示标签页
const isTagsView = computed(() => appStore.getTagsView)
// 是否菜单折叠
const collapse = computed(() => appStore.getCollapse)
// 是否显示logo
const isLogo = computed(() => appStore.getLogo)
// 是否固定头部
const fixedHeader = computed(() => appStore.getFixedHeader)
// 是否是移动端
const mobile = computed(() => appStore.getMobile)
// 是否固定菜单
// const fixedMenu = computed(() => appStore.getFixedMenu)

export const useRenderLayout = () => {
  const renderClassic = () => {
    return (
      <>
        <div class={['absolute top-0 left-0 h-full', { '!fixed z-3000': mobile.value }]}>
          {isLogo.value ? (
            <Logo
              class={[
                `bg-[var(--left-menu-bg-color)] border-bottom-1 border-solid border-[var(--logo-border-color)] dark:border-v-dark`,
                {
                  '!pl-0': mobile.value && collapse.value,
                  'w-[var(--left-menu-min-width)]': collapse.value,
                  'w-[var(--left-menu-max-width)]': !collapse.value
                }
              ]}
              style="transition: all var(--transition-time-02);"
            />
          ) : undefined}
          <Menu class={[{ '!h-[calc(100%-var(--logo-height))]': isLogo.value }]} />
        </div>
        <div
          class={[
            `${prefixCls}-content`,
            'absolute top-0 h-[100%]',
            {
              'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
                collapse.value && !mobile.value,
              'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                !collapse.value && !mobile.value,
              'fixed !w-full !left-0': mobile.value
            }
          ]}
          style="transition: all var(--transition-time-02);"
        >
          <ElScrollbar
            v-loading={pageLoading.value}
            class={[
              `${prefixCls}-content-scrollbar`,
              {
                '!h-[calc(100%-var(--top-tool-height)-var(--tags-view-height))] mt-[calc(var(--top-tool-height)+var(--tags-view-height))]':
                  fixedHeader.value
              }
            ]}
          >
            <div
              class={[
                {
                  'fixed top-0 left-0 z-10': fixedHeader.value,
                  'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
                    collapse.value && fixedHeader.value && !mobile.value,
                  'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                    !collapse.value && fixedHeader.value && !mobile.value,
                  '!w-full !left-0': mobile.value
                }
              ]}
              style="transition: all var(--transition-time-02);"
            >
              <ToolHeader
                class={`border-bottom-1 border-solid border-[var(--top-tool-border-color)] bg-[var(--top-header-bg-color)] dark:border-v-dark`}
              />

              {isTagsView.value ? (
                <TagsView
                  class={`border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-v-dark`}
                />
              ) : undefined}
            </div>

            <AppView></AppView>
          </ElScrollbar>
        </div>
      </>
    )
  }
  const renderTopLeft = () => {
    return (
      <>
        <div class="flex items-center bg-[var(--top-header-bg-color)] border-bottom-1 border-solid border-[var(--top-tool-border-color)] dark:border-v-dark">
          {isLogo.value ? <Logo class="hover-trigger !pr-15px"></Logo> : undefined}

          <ToolHeader class="flex-1"></ToolHeader>
        </div>
        <div class="absolute top-[var(--logo-height)+1px] left-0 w-full h-[calc(100%-1px-var(--logo-height))] flex">
          <Menu class="!h-full"></Menu>
          <div
            class={[
              `${prefixCls}-content`,
              'h-[100%]',
              {
                'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
                  collapse.value,
                'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                  !collapse.value
              }
            ]}
            style="transition: all var(--transition-time-02);"
          >
            <ElScrollbar
              v-loading={pageLoading.value}
              class={[
                `${prefixCls}-content-scrollbar`,
                {
                  '!h-[calc(100%-var(--tags-view-height))] mt-[calc(var(--tags-view-height))]':
                    fixedHeader.value && isTagsView.value
                }
              ]}
            >
              {isTagsView.value ? (
                <TagsView
                  class={[
                    'border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-v-dark',
                    {
                      '!fixed top-0 left-0 z-10': fixedHeader.value,
                      'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)] mt-[var(--logo-height)]':
                        collapse.value && fixedHeader.value,
                      'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)] mt-[var(--logo-height)]':
                        !collapse.value && fixedHeader.value
                    }
                  ]}
                  style="transition: width var(--transition-time-02), left var(--transition-time-02);"
                ></TagsView>
              ) : undefined}

              <AppView></AppView>
            </ElScrollbar>
          </div>
        </div>
      </>
    )
  }
  const renderTop = () => {
    return (
      <>
        <div class="flex items-center justify-between bg-[var(--top-header-bg-color)] border-bottom-1 border-solid border-[var(--top-tool-border-color)] dark:border-v-dark">
          {isLogo.value ? <Logo class="hover-trigger"></Logo> : undefined}
          <Menu class="flex-1 px-10px h-[var(--top-tool-height)]"></Menu>
          <ToolHeader></ToolHeader>
        </div>
        <div class={[`${prefixCls}-content`, 'h-full w-full']}>
          <ElScrollbar
            v-loading={pageLoading.value}
            class={[
              `${prefixCls}-content-scrollbar`,
              {
                'mt-[var(--tags-view-height)]': fixedHeader.value
              }
            ]}
          >
            {isTagsView.value ? (
              <TagsView
                class={[
                  'border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-v-dark',
                  {
                    '!fixed w-full top-[var(--top-tool-height)] left-0': fixedHeader.value
                  }
                ]}
                style="transition: width var(--transition-time-02), left var(--transition-time-02);"
              ></TagsView>
            ) : undefined}

            <AppView></AppView>
          </ElScrollbar>
        </div>
      </>
    )
  }
  const renderCutMenu = () => {
    return (
      <>
        <div>这个布局先摆烂</div>
      </>
    )
  }
  return {
    renderClassic,
    renderTopLeft,
    renderTop,
    renderCutMenu
  }
}
