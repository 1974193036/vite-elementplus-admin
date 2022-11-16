<script setup lang="ts">
import { useTemplateRefsList } from '@vueuse/core'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouterLinkProps } from 'vue-router'
import { useDesign } from '@/hooks/web/useDesign'
import { useScrollTo } from '@/hooks/event/useScrollTo'
import { useAppStore } from '@/store/modules/app'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { usePermissionStore } from '@/store/modules/permission'
import { filterAffixTags } from './helper'

const { getPrefixCls, namespace } = useDesign()
const prefixCls = getPrefixCls('tags-view') // v-tags-view

const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.getVisitedViews)

const permissionStore = usePermissionStore()
const routers = computed(() => permissionStore.getRouters)

const affixTagArr = ref<RouteLocationNormalizedLoaded[]>([])

const appStore = useAppStore()

const tagLinksRefs = useTemplateRefsList<RouterLinkProps>()

const { currentRoute, push, replace } = useRouter()

// 是否是当前tag
const isActive = (route: RouteLocationNormalizedLoaded): boolean => {
  return route.path === unref(currentRoute).path
}

const selectedTag = ref<RouteLocationNormalizedLoaded>()

// 移动到某个位置
const move = (to: number) => {
  const wrap$ = unref(scrollbarRef)?.wrap$
  const { start } = useScrollTo({
    el: wrap$!,
    position: 'scrollLeft',
    to: unref(scrollLeftNumber) + to,
    duration: 500
  })
  start()
}

// elscroll 实例
const scrollbarRef = ref<ComponentRef<typeof ElScrollbar>>()

// 保存滚动位置
const scrollLeftNumber = ref(0)

const scroll = ({ scrollLeft }) => {
  scrollLeftNumber.value = scrollLeft as number
}

// 重新加载
const refreshSelectedTag = async (view?: RouteLocationNormalizedLoaded) => {
  if (!view) return
  tagsViewStore.delCachedView()
  const { path, query } = view
  await nextTick()
  replace({
    path: '/redirect' + path,
    query: query
  })
}

// 关闭左侧
const closeLeftTags = () => {
  tagsViewStore.delLeftViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 关闭右侧
const closeRightTags = () => {
  tagsViewStore.delRightViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 关闭其他
const closeOthersTags = () => {
  tagsViewStore.delOthersViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 关闭全部
const closeAllTags = () => {
  tagsViewStore.delAllViews()
  toLastView()
}

const closeSelectedTag = (view: RouteLocationNormalizedLoaded) => {
  if (view?.meta?.affix) return
  tagsViewStore.delView(view)
  if (isActive(view)) {
    toLastView()
  }
}

// 跳转到最后一个
const toLastView = () => {
  const visitedViews = tagsViewStore.getVisitedViews
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    push(latestView)
  } else {
    if (
      unref(currentRoute).path === permissionStore.getAddRouters[0].path ||
      unref(currentRoute).path === permissionStore.getAddRouters[0].redirect
    ) {
      addTags()
      return
    }
    // You can set another route
    push(permissionStore.getAddRouters[0].path)
  }
}

// 滚动到选中的tag
const moveToCurrentTag = async () => {
  await nextTick()
  for (const v of unref(visitedViews)) {
    if (v.fullPath === unref(currentRoute).path) {
      moveToTarget(v)
      if (v.fullPath !== unref(currentRoute).fullPath) {
        tagsViewStore.updateVisitedView(unref(currentRoute))
      }
      break
    }
  }
}

const moveToTarget = (currentTag: RouteLocationNormalizedLoaded) => {
  const wrap$ = unref(scrollbarRef)?.wrap$
  let firstTag: Nullable<RouterLinkProps> = null
  let lastTag: Nullable<RouterLinkProps> = null

  const tagList = unref(tagLinksRefs.value)

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }
  if ((firstTag?.to as RouteLocationNormalizedLoaded).fullPath === currentTag.fullPath) {
    // 直接滚动到0的位置
    const { start } = useScrollTo({
      el: wrap$!,
      position: 'scrollLeft',
      to: 0,
      duration: 500
    })
    start()
  } else if ((lastTag?.to as RouteLocationNormalizedLoaded).fullPath === currentTag.fullPath) {
    // 滚动到最后的位置
    const { start } = useScrollTo({
      el: wrap$!,
      position: 'scrollLeft',
      to: wrap$!.scrollWidth - wrap$!.offsetWidth,
      duration: 500
    })
    start()
  } else {
    // find preTag and nextTag
    const currentIndex: number = unref(visitedViews).findIndex(
      (item) => item.fullPath === currentTag.fullPath
    )

    const tgsRefs = document.getElementsByClassName(`${prefixCls}__item`)

    const prevTag = tgsRefs[currentIndex - 1] as HTMLElement
    const nextTag = tgsRefs[currentIndex + 1] as HTMLElement

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + 4

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - 4

    if (afterNextTagOffsetLeft > unref(scrollLeftNumber) + wrap$!.offsetWidth) {
      const { start } = useScrollTo({
        el: wrap$!,
        position: 'scrollLeft',
        to: afterNextTagOffsetLeft - wrap$!.offsetWidth,
        duration: 500
      })
      start()
    } else if (beforePrevTagOffsetLeft < unref(scrollLeftNumber)) {
      const { start } = useScrollTo({
        el: wrap$!,
        position: 'scrollLeft',
        to: beforePrevTagOffsetLeft,
        duration: 500
      })
      start()
    }
  }
}

// 初始化tag
const initTags = () => {
  affixTagArr.value = filterAffixTags(unref(routers))
  for (const tag of unref(affixTagArr)) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

// 新增tag
const addTags = () => {
  // console.log('addTags')
  const { name } = unref(currentRoute)
  if (name) {
    selectedTag.value = unref(currentRoute)
    tagsViewStore.addView(unref(currentRoute))
  }
  return false
}

onMounted(() => {
  initTags()
  addTags()
})

watch(
  () => currentRoute.value,
  () => {
    addTags()
    moveToCurrentTag()
  }
)
</script>

<template>
  <div
    :id="prefixCls"
    :class="[`${prefixCls}`, 'flex w-full relative bg-[#fff]', `dark:bg-v-dark`]"
  >
    <span
      :class="`${prefixCls}__tool`"
      class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
      @click="move(-200)"
    >
      <Icon
        icon="ep:d-arrow-left"
        :color="appStore.getIsDark ? `var(--${namespace}-text-color-regular)` : '#333'"
      />
    </span>
    <div class="overflow-hidden flex-1">
      <ElScrollbar ref="scrollbarRef" class="h-full" @scroll="scroll">
        <div class="flex h-full">
          <div
            v-for="item in visitedViews"
            :key="item.fullPath"
            :class="[
              `${prefixCls}__item`,
              item?.meta?.affix ? `${prefixCls}__item--affix` : '',
              {
                'is-active': isActive(item)
              }
            ]"
          >
            <router-link :ref="tagLinksRefs.set" :to="{ ...item }" custom v-slot="{ navigate }">
              <div
                @click="navigate"
                class="h-full flex justify-center items-center whitespace-nowrap pl-15px"
              >
                {{ item?.meta?.title }}
                <Icon
                  :class="`${prefixCls}__item--close`"
                  color="#333"
                  icon="ant-design:close-outlined"
                  :size="12"
                  @click.prevent.stop="closeSelectedTag(item)"
                />
              </div>
            </router-link>
          </div>
        </div>
      </ElScrollbar>
    </div>
    <span
      :class="`${prefixCls}__tool`"
      class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
      @click="move(200)"
    >
      <Icon
        icon="ep:d-arrow-right"
        :color="appStore.getIsDark ? `var(--${namespace}-text-color-regular)` : '#333'"
      />
    </span>
    <span
      :class="`${prefixCls}__tool`"
      class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
      @click="refreshSelectedTag(selectedTag)"
    >
      <Icon
        icon="ant-design:reload-outlined"
        :color="appStore.getIsDark ? `var(--${namespace}-text-color-regular)` : '#333'"
      />
    </span>
    <ContextMenu
      trigger="click"
      :schema="[
        {
          icon: 'ant-design:sync-outlined',
          label: '重新加载',
          command: function() {
            refreshSelectedTag(selectedTag)
          }
        },
        {
          icon: 'ant-design:close-outlined',
          label: '关闭标签页',
          disabled: !!visitedViews?.length && selectedTag?.meta.affix,
          command: function() {
            closeSelectedTag(selectedTag!)
          }
        },
        {
          icon: 'ant-design:vertical-right-outlined',
          label: '关闭左侧标签页',
          divided: true,
          disabled: !!visitedViews?.length && selectedTag?.fullPath === visitedViews[0].fullPath,
          command: function() {
            closeLeftTags()
          }
        },
        {
          icon: 'ant-design:vertical-left-outlined',
          label: '关闭右侧标签页',
          disabled:
            !!visitedViews?.length &&
            selectedTag?.fullPath === visitedViews[visitedViews.length - 1].fullPath,
          command: function() {
            closeRightTags()
          }
        },
        {
          icon: 'ant-design:tag-outlined',
          label: '关闭其他标签页',
          divided: true,
          command: function() {
            closeOthersTags()
          }
        },
        {
          icon: 'ant-design:line-outlined',
          label: '关闭全部标签页',
          command: function() {
            closeAllTags()
          }
        }
      ]"
    >
      <span
        :class="`${prefixCls}__tool`"
        class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer block"
      >
        <Icon
          icon="ant-design:setting-outlined"
          :color="appStore.getIsDark ? `var(--${namespace}-text-color-regular)` : '#333'"
        />
      </span>
    </ContextMenu>
  </div>
</template>

<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-tags-view'; // v-tags-view

.#{$prefix-cls} {
  :deep(.#{$namespace}-scrollbar__view) {
    height: 100%;
  }

  &__tool {
    position: relative;

    &:hover {
      :deep(span) {
        // color: $color-black !important;
        color: var(--#{$namespace}-color-black) !important;
      }
    }

    &:after {
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
      height: calc(100% - 1px);
      border-right: 1px solid var(--tags-view-border-color);
      border-left: 1px solid var(--tags-view-border-color);
      content: '';
    }
  }

  &__item {
    position: relative;
    top: 2px;
    height: calc(100% - 4px);
    padding-right: 25px;
    margin-left: 4px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #d9d9d9;

    &--close {
      position: absolute;
      top: 50%;
      right: 5px;
      display: none;
      transform: translate(0, -50%);
    }
    &:not(.#{$prefix-cls}__item--affix):hover {
      .#{$prefix-cls}__item--close {
        display: block;
      }
    }
  }

  &__item:not(.is-active) {
    &:hover {
      // color: $color-primary;
      color: var(--#{$namespace}-color-primary);
    }
  }

  &__item.is-active {
    // color: $color-white;
    color: var(--#{$namespace}-color-white);
    // background-color: $color-primary;
    background-color: var(--#{$namespace}-color-primary);
    border: 1px solid var(--#{$namespace}-color-primary);
    .#{$prefix-cls}__item--close {
      :deep(span) {
        // color: $color-white !important;
        color: var(--#{$namespace}-color-white) !important;
      }
    }
  }
}

.dark {
  .#{$prefix-cls} {
    &__tool {
      &:hover {
        :deep(span) {
          color: #fff !important;
        }
      }

      &:after {
        border-right: 1px solid var(--#{$namespace}-border-color);
        border-left: 1px solid var(--#{$namespace}-border-color);
      }
    }

    &__item {
      position: relative;
      top: 2px;
      height: calc(100% - 4px);
      padding-right: 25px;
      font-size: 12px;
      cursor: pointer;
      border: 1px solid var(--#{$namespace}-border-color);
    }

    &__item:not(.is-active) {
      &:hover {
        // color: $color-primary;
        color: var(--#{$namespace}-color-primary);
      }
    }

    &__item.is-active {
      // color: $color-white;
      color: var(--#{$namespace}-color-white);
      // background-color: $color-primary;
      background-color: var(--#{$namespace}-color-primary);
      .#{$prefix-cls}__item--close {
        :deep(span) {
          // color: $color-white !important;
          color: var(--#{$namespace}-color-white);
        }
      }
    }
  }
}
</style>
