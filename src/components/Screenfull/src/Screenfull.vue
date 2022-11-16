<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('screenfull') // v-screenfull

defineProps({
  color: propTypes.string.def('')
})

const { toggle, isFullscreen } = useFullscreen()

const toggleFullscreen = () => {
  toggle()
}

const screenText = computed(() => {
  return isFullscreen.value ? '取消全屏' : '全屏'
})
</script>

<template>
  <div :class="prefixCls" @click="toggleFullscreen">
    <ElTooltip effect="dark" :content="screenText" placement="top">
      <Icon
        :size="18"
        :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
        :color="color"
      />
    </ElTooltip>
  </div>
</template>
