<script setup lang="ts">
import { PropType } from 'vue'
import type { TableData } from '@/api/table/types'

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  },
  detailSchema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => []
  }
})
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}">
    <template #importance="{ row }: { row: TableData }">
      <ElTag :type="row.importance === 1 ? 'success' : row.importance === 2 ? 'warning' : 'danger'">
        {{
          row.importance === 1
            ? '重要'
            : row.importance === 2
            ? '良好'
            : '一般'
        }}
      </ElTag>
    </template>

    <template #content="{ row }: { row: TableData }">
      <div v-html="row.content"></div>
    </template>
  </Descriptions>
</template>
