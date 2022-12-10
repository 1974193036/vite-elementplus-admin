<script lang="ts" setup>
import { PropType } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { TableData } from '@/api/table/types'
import { useForm } from '@/hooks/web/useForm'

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: {
      span: 24
    }
  },
  {
    field: 'author',
    label: '作者',
    component: 'Input'
  },
  {
    field: 'display_time',
    label: '创建时间',
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    field: 'importance',
    label: '重要性',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '重要',
          value: 2
        },
        {
          label: '良好',
          value: 1
        },
        {
          label: '一般',
          value: 0
        }
      ]
    }
  },
  {
    field: 'pageviews',
    label: '阅读数',
    component: 'InputNumber',
    value: 0
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        height: '300px'
      }
    }
  }
])

const { required } = useValidator()

const rules = reactive({
  title: [required()],
  author: [required()],
  importance: [required()],
  pageviews: [required()],
  display_time: [required()],
  content: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>

<template>
  <Form :rules="rules" @register="register" />
</template>
