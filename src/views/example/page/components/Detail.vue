<script setup lang="ts">
import { PropType } from 'vue'
import type { TableData } from '@/api/table/types'

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'title',
    label: '标题',
    span: 2
  },
  {
    field: 'author',
    label: '作者',
    span: 1
  },
  {
    field: 'display_time',
    label: '创建时间',
    span: 1
  },
  {
    field: 'importance',
    label: '重要性',
    span: 1
  },
  {
    field: 'pageviews',
    label: '阅读数',
    span: 1
  },
  {
    field: 'content',
    label: '内容',
    span: 2
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #importance="{ row }: { row: TableData }">
      <ElTag :type="row.importance === 1 ? 'success' : row.importance === 2 ? 'warning' : 'danger'">
        {{ row.importance === 1 ? '重要' : row.importance === 2 ? '良好' : '一般' }}
      </ElTag>
    </template>

    <template #content="{ row }: { row: TableData }">
      <div v-html="row.content"></div>
    </template>
  </Descriptions>
</template>
