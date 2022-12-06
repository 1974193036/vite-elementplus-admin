<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { useForm } from '@/hooks/web/useForm'
import { findIndex } from '@/utils'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  // 生成Form的布局结构数组
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  // 是否需要栅格布局
  isCol: propTypes.bool.def(false),
  actionCol: propTypes.number.def(8),
  // 操作按钮风格位置
  layout: propTypes.string.validate((v: string) => ['inline', 'bottom'].includes(v)).def('inline'),
  // 表单label宽度
  labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
  // 底部按钮的对齐方式
  buttomPosition: propTypes.string
    .validate((v: string) => ['left', 'center', 'right'].includes(v))
    .def('center'),
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  // 是否显示伸缩
  expand: propTypes.bool.def(false),
  // 伸缩的界限字段
  expandField: propTypes.string.def(''),
  inline: propTypes.bool.def(true),
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  }
})

const emit = defineEmits(['search', 'reset'])

const visible = ref(true)

const newSchema = computed(() => {
  let schema: FormSchema[] = cloneDeep(props.schema)
  if (props.expand && props.expandField && !unref(visible)) {
    const index = findIndex(schema, (v: FormSchema) => v.field === props.expandField)
    if (index > -1) {
      const length = schema.length
      schema.splice(index + 1, length)
    }
  }
  if (props.layout === 'inline') {
    schema = schema.concat([
      {
        field: 'action',
        formItemProps: {
          labelWidth: '0px',
          // style: {
          //   justifyContent: 'flex-end'
          // }
        },
        colProps: {
          span: props.actionCol
        }
      }
    ])
  }
  return schema
})

const { register, elFormRef, methods } = useForm({
  model: props.model || {}
})

const bottomButtonStyle = computed(() => {
  return {
    textAlign: props.buttomPosition as unknown as 'left' | 'center' | 'right'
  }
})

const search = async () => {
  await unref(elFormRef)?.validate(async (isValid) => {
    if (isValid) {
      const { getFormData } = methods
      const model = await getFormData()
      emit('search', model)
    }
  })
}

const reset = async () => {
  unref(elFormRef)?.resetFields()
  const { getFormData } = methods
  const model = await getFormData()
  emit('reset', model)
}

const setVisible = () => {
  unref(elFormRef)?.resetFields()
  visible.value = !unref(visible)
}
</script>

<template>
  <Form
    :is-custom="false"
    :label-width="props.labelWidth"
    hide-required-asterisk
    :inline="props.inline"
    :is-col="props.isCol"
    :schema="newSchema"
    @register="register"
  >
    <template #action>
      <div v-if="props.layout === 'inline'">
        <ElButton v-if="showSearch" type="primary" @click="search">
          <Icon icon="ep:search" class="mr-5px" />
          查询
        </ElButton>
        <ElButton v-if="showReset" @click="reset">
          <Icon icon="ep:refresh-right" class="mr-5px" />
          重置
        </ElButton>
        <ElButton v-if="expand" text @click="setVisible">
          {{ visible ? '收起' : '展开' }}
          <Icon :icon="visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
        </ElButton>
      </div>
    </template>
  </Form>

  <template v-if="props.layout === 'bottom'">
    <div :style="bottomButtonStyle">
      <ElButton v-if="showSearch" type="primary" @click="search">
        <Icon icon="ep:search" class="mr-5px" />
        查询
      </ElButton>
      <ElButton v-if="showReset" @click="reset">
        <Icon icon="ep:refresh-right" class="mr-5px" />
        重置
      </ElButton>
      <ElButton v-if="expand" text @click="setVisible">
        {{ visible ? '收起' : '展开' }}
        <Icon :icon="visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
      </ElButton>
    </div>
  </template>
</template>
