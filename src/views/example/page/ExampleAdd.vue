<script setup lang="ts">
import Write from './components/Write.vue'
import { useRouter } from 'vue-router'
import { saveTableApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { useEmitt } from '@/hooks/web/useEmitt'

const { emitter } = useEmitt()

const { push } = useRouter()

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as TableData
      const res = await saveTableApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        push('/example/example-page')
        setTimeout(() => {
          emitter.emit('getList', 'add')
        }, 0)
      }
    }
  })
}
</script>

<template>
  <ContentDetailWrap title="新增" @back="push('/example/example-page')">
    <Write ref="writeRef" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save"> 保存 </ElButton>
    </template>
  </ContentDetailWrap>
</template>
