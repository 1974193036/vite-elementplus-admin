<script setup lang="ts">
import Detail from './components/Detail.vue'
import { useRouter, useRoute } from 'vue-router'
import { getTableDetApi } from '@/api/table'
import { TableData } from '@/api/table/types'

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
</script>

<template>
  <ContentDetailWrap title="详情" @back="push('/example/example-page')">
    <Detail :current-row="currentRow" />
  </ContentDetailWrap>
</template>
