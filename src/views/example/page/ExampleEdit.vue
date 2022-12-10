<script setup lang="ts">
import Write from './components/Write.vue'
import { useRouter, useRoute } from 'vue-router'
import { saveTableApi, getTableDetApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { useEmitt } from '@/hooks/web/useEmitt'

const { emitter } = useEmitt()

const { push } = useRouter()

const { query } = useRoute()

const currentRow = ref<Nullable<TableData>>(null)

const getTableDet = async () => {
  const res = await getTableDetApi(query.id as string)
  if (res) {
    currentRow.value = res
  }
}

getTableDet()

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  const validate = await write?.elFormRef?.validate()?.catch(() => {})
  if (validate) {
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
        emitter.emit('getList', 'edit')
      }, 0)
    }
  }
}
</script>

<template>
  <ContentDetailWrap title="编辑" @back="push('/example/example-page')">
    <Write ref="writeRef" :current-row="currentRow" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save"> 保存 </ElButton>
    </template>
  </ContentDetailWrap>
</template>
