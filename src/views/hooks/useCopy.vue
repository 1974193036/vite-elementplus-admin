<script lang="ts" setup>
// import { useClipboard } from '@vueuse/core'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'

const inputVal = ref('哈哈哈')

const { isSuccess, copied, copy } = useCopyToClipboard()
</script>

<template>
  <ContentWrap title="useCopy">
    <ElInput v-model="inputVal" style="width: 50%"></ElInput>
    <ElButton class="mx-10px" @click="copy(inputVal)">拷贝到剪切板</ElButton>

    <div v-if="copied">已拷贝</div>
    <div v-if="isSuccess">拷贝成功</div>
  </ContentWrap>
</template>
