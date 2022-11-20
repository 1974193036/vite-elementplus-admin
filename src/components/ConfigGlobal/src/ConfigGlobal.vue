<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { setCssVar } from '@/utils'
// import { propTypes } from '@/utils/propTypes'

// 配置命名空间
const { namespace } = useDesign()

// 配置尺寸大小
const appStore = useAppStoreWithOut()
const currentSize = computed(() => appStore.getCurrentSize)

// 提供给全局
provide('configGlobal', ref({
  size: currentSize
}))

// 初始化所有主题色
onMounted(() => {
  appStore.setCssVarTheme()
})

// 监听窗口变化
const { width } = useWindowSize()
watch(
  () => width.value,
  (width: number) => {
    if (width < 768) {
      !appStore.getMobile ? appStore.setMobile(true) : undefined
      setCssVar('--left-menu-min-width', '0')
      appStore.setCollapse(true)
      appStore.getLayout !== 'classic' ? appStore.setLayout('classic') : undefined
    } else {
      appStore.getMobile ? appStore.setMobile(false) : undefined
      appStore.setCollapse(false)
      setCssVar('--left-menu-min-width', '64px')
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <ElConfigProvider
    :namespace="namespace"
    :message="{ max: 4 }"
    :size="currentSize"
    :locale="zhCn"
  >
    <slot></slot>
  </ElConfigProvider>
</template>
