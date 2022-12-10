<script lang="ts" setup>
import { PropType } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { TableData } from '@/api/table/types'
import { useForm } from '@/hooks/web/useForm'

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

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
  schema: props.formSchema
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
