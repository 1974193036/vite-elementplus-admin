<script lang="ts" setup>
import { useForm } from '@/hooks/web/useForm'
import { useValidator } from '@/hooks/web/useValidator'

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
    label: '时间选择'
  }
])

const { register, methods, elFormRef } = useForm({
  schema
})

const changeLabelWidth = (width: number | string) => {
  const { setProps } = methods
  setProps({
    labelWidth: width
  })
}
const changeSize = (size: string) => {
  const { setProps } = methods
  setProps({
    size
  })
}
const changeDisabled = (bool: boolean) => {
  const { setProps } = methods
  setProps({
    disabled: bool
  })
}
const changeSchema = (del: boolean) => {
  const { delSchema, addSchema } = methods
  if (del) {
    delSchema('field2')
  } else if (!del && schema[1].field !== 'field2') {
    addSchema(
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
      1
    )
  }
}
const setValue = (reset: boolean) => {
  const { setValues } = methods
  if (reset) {
    unref(elFormRef)?.resetFields()
  } else {
    setValues({
      field1: 'field1',
      field2: '2',
      field3: '2',
      field4: ['1', '3'],
      field5: '2022-01-27',
      field6: '17:00'
    })
  }
}

const getFormData = async () => {
  const { getFormData } = methods
  const formData = await getFormData()
  console.log(formData)
}

const index = ref(7)

const setLabel = () => {
  const { setSchema } = methods
  setSchema([
    {
      field: 'field2',
      path: 'label',
      value: `选择器 ${index.value}`
    },
    {
      field: 'field2',
      path: 'componentProps.options',
      value: [
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
  ])
  index.value++
}
const addItem = () => {
  const { addSchema } = methods
  if (unref(index) % 2 === 0) {
    addSchema({
      field: `field${unref(index)}`,
      label: `输入框${unref(index)}`,
      component: 'Input'
    })
  } else {
    addSchema(
      {
        field: `field${unref(index)}`,
        label: `输入框${unref(index)}`,
        component: 'Input'
      },
      unref(index)
    )
  }
  index.value++
}
const formValidation = () => {
  unref(elFormRef)!.validate((isValid) => {
    console.log(isValid)
  })
}
const verifyReset = () => {
  unref(elFormRef)?.resetFields()
}
const getDictOne = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  const { setSchema } = methods
  setSchema([
    {
      field: 'field2',
      path: 'componentProps.options',
      value: [
        {
          label: 'test1',
          value: 0
        },
        {
          label: 'test2',
          value: 1
        },
        {
          label: 'test3',
          value: 2
        }
      ]
    }
  ])
}
</script>

<template>
  <ContentWrap title="UseForm操作">
    <template #message>
      <ElButton @click="changeLabelWidth(150)">更改 labelWidth</ElButton>
      <ElButton @click="changeLabelWidth('auto')">还原 labelWidth</ElButton>

      <ElButton @click="changeSize('large')">更改 size</ElButton>
      <ElButton @click="changeSize('default')">还原 size</ElButton>

      <ElButton @click="changeDisabled(true)">禁用</ElButton>
      <ElButton @click="changeDisabled(false)">解除禁用</ElButton>

      <ElButton @click="changeSchema(true)"> 删除 选择器 </ElButton>
      <ElButton @click="changeSchema(false)"> 添加选择器 </ElButton>

      <ElButton @click="setValue(false)">设置值</ElButton>
      <ElButton @click="setValue(true)">重置值</ElButton>
      <ElButton @click="getFormData">获取表单值</ElButton>

      <ElButton @click="setLabel">设置选择器 label</ElButton>

      <ElButton @click="addItem">添加子项</ElButton>

      <ElButton @click="formValidation">表单验证</ElButton>
      <ElButton @click="verifyReset">验证重置</ElButton>

      <ElButton @click="getDictOne"> 动态选项 </ElButton>
    </template>

    <Form @register="register" />
  </ContentWrap>
</template>
