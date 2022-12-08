<script setup lang="ts">
import { useWatermark } from '@/hooks/web/useWatermark'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const title = computed(() => appStore.getTitle)

const { setWatermark, clear } = useWatermark()

// 即将销毁
onBeforeUnmount(() => {
  clear()
})
</script>

<template>
  <ContentWrap title="useWatermark">
    <ElButton type="primary" @click="setWatermark(title)">
      创建水印
    </ElButton>
    <ElButton type="danger" @click="clear">清除水印</ElButton>
    <ElButton type="warning" @click="setWatermark(`New${title}`)">
      重置水印
    </ElButton>
  </ContentWrap>
</template>
