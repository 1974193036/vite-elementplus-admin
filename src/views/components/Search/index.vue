<script setup lang="ts">
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
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
      ],
      onChange: (value: string) => {
        console.log(value)
      }
    },
    colProps: {
      span: 8
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
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field5',
    component: 'DatePicker',
    label: '日期选择器',
    componentProps: {
      type: 'date'
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field6',
    component: 'TimeSelect',
    label: '时间选择',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field8',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field9',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field10',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field11',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field12',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field13',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field14',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field15',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field16',
    label: '输入框',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 8
    }
  }
])

const isGrid = ref(false)

const layout = ref('inline')

const buttomPosition = ref('left')

const getFormData = (formData) => {
  console.log(formData)
}

const changeGrid = (grid: boolean) => {
  isGrid.value = grid
}

const changeLayout = () => {
  layout.value = unref(layout) === 'inline' ? 'bottom' : 'inline'
}

const changePosition = (position: string) => {
  layout.value = 'bottom'
  buttomPosition.value = position
}

const getDictOne = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: '草莓',
          value: 'caomei'
        },
        {
          label: '西瓜',
          value: 'xigua'
        }
      ])
    }, 1000)
  })
  if (res) {
    schema[1].componentProps!.options = res as ComponentOptions[]
  }
}
</script>

<template>
  <ContentWrap title="查询 操作">
    <template #message>
      <ElButton @click="changeGrid(true)">栅格</ElButton>
      <ElButton @click="changeGrid(false)">还原 栅格</ElButton>

      <ElButton @click="changeLayout"> 按钮 位置 </ElButton>

      <ElButton @click="changePosition('left')"> 底部 位置-左 </ElButton>
      <ElButton @click="changePosition('center')"> 底部 位置-中 </ElButton>
      <ElButton @click="changePosition('right')"> 底部 位置-右 </ElButton>
      <ElButton @click="getDictOne"> 动态选项 </ElButton>
    </template>
    <Search
      :schema="schema"
      :is-col="isGrid"
      :layout="layout"
      :buttom-position="buttomPosition"
      expand
      expand-field="field6"
      @search="getFormData"
    />
  </ContentWrap>
</template>
