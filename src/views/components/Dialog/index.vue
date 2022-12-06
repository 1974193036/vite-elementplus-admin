<script lang="ts" setup>
import { useValidator } from '@/hooks/web/useValidator'
import { FormExpose } from '@/components/Form'

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)

const { required } = useValidator()

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'field2',
    label: '选择器',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field3',
    label: '单选框',
    component: 'Radio',
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field4',
    label: '多选框',
    component: 'Checkbox',
    value: [],
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'field5',
    component: 'DatePicker',
    label: '日期选择器',
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field6',
    component: 'TimeSelect',
    label: '时间选择器'
  }
])

const formRef = ref<FormExpose>()

const formSubmit = () => {
  unref(formRef)
    ?.getElFormRef()
    ?.validate((valid) => {
      if (valid) {
        const formData = unref(formRef)?.formModel
        console.log('submit success', formData)
      } else {
        console.log('submit fail')
      }
    })
}
</script>

<template>
  <ContentWrap title="弹窗" message="基于 ElementPlus 的 Dialog 组件二次封装">
    <ElButton type="primary" @click="dialogVisible = !dialogVisible">打开</ElButton>

    <ElButton type="primary" @click="dialogVisible2 = !dialogVisible2">与表单结合</ElButton>

    <Dialog v-model="dialogVisible" title="弹窗">
      <div v-for="v in 10000" :key="v">{{ v }}</div>
      <template #footer>
        <ElButton @click="dialogVisible = false">关闭</ElButton>
      </template>
    </Dialog>

    <Dialog v-model="dialogVisible2" title="弹窗2">
      <Form ref="formRef" :schema="schema" />
      <template #footer>
        <ElButton @click="dialogVisible2 = false">关闭</ElButton>
        <ElButton type="primary" @click="formSubmit">提交</ElButton>
      </template>
    </Dialog>
  </ContentWrap>
</template>
