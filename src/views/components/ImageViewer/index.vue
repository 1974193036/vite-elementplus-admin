<script lang="ts" setup>
import { createImageViewer } from '@/components/ImageViewer'

const open = () => {
  createImageViewer({
    urlList: [
      'https://t7.baidu.com/it/u=1010739515,2488150950&fm=193&f=GIF',
      'https://t7.baidu.com/it/u=3694360626,2933607547&fm=193&f=GIF',
      'https://t7.baidu.com/it/u=3337661019,3898256580&fm=193&f=GIF'
    ]
  })
}
</script>

<template>
  <ContentWrap title="图片预览" message="基于 ElementPlus 的 ImageViewer 组件二次封装">
    <ElButton type="primary" @click="open">打开</ElButton>
  </ContentWrap>
</template>
