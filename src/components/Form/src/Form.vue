<script lang="tsx">
import { set } from 'lodash-es'
import { PropType } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { findIndex } from '@/utils'
import { useDesign } from '@/hooks/web/useDesign'
import type { FormProps } from './type'
import { getSlot } from '@/utils/tsxHelper'
import { componentMap } from './componentMap'
import {
  setGridProp,
  setTextPlaceholder,
  setItemComponentSlots,
  setFormItemSlots,
  setComponentProps,
  initModel
} from './helper'
import { Icon } from '@/components/Icon'
import { useRenderSelect } from './components/useRenderSelect'
import { useRenderRadio } from './components/useRenderRadio'
import { useRenderCheckbox } from './components/useRenderCheckbox'

const { getPrefixCls, namespace } = useDesign()

const prefixCls = getPrefixCls('form') // v-form

const themeColor = `var(--${namespace}-color-primary)`

export default defineComponent({
  name: 'Form',
  props: {
    // 是否需要栅格布局
    isCol: propTypes.bool.def(true),
    // 是否自定义内容
    isCustom: propTypes.bool.def(false),
    // 是否自动设置placeholder
    autoSetPlaceholder: propTypes.bool.def(true),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    // 表单数据对象
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    }
  },
  emits: ['register'],
  setup(props, { slots, expose, emit }) {
    // element form 实例
    const elFormRef = ref<ComponentRef<typeof ElForm>>()

    // useForm传入的props
    const outsideProps = ref<FormProps>({})

    const mergeProps = ref<FormProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    // 对表单赋值
    const setValues = (data: Recordable = {}) => {
      formModel.value = Object.assign(unref(formModel), data)
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      const { schema } = unref(getProps)
      if (index !== void 0) {
        schema.splice(index, 0, formSchema)
        return
      }
      schema.push(formSchema)
    }

    const delSchema = (field: string) => {
      const { schema } = unref(getProps)
      const index = findIndex(schema, (v: FormSchema) => v.field === field)
      if (index > -1) {
        schema.splice(index, 1)
      }
    }

    const setSchema = (schemaProps: FormSetPropsType[]) => {
      const { schema } = unref(getProps)
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          }
        }
      }
    }

    const getElFormRef = (): ComponentRef<typeof ElForm> => {
      return unref(elFormRef) as ComponentRef<typeof ElForm>
    }

    // 表单数据
    const formModel = ref<Recordable>({})

    onMounted(() => {
      emit('register', unref(elFormRef)?.$parent, unref(elFormRef))
    })

    expose({
      setProps,
      setValues,
      getElFormRef,
      formModel,
      addSchema,
      delSchema,
      setSchema
    })

    // 监听表单结构化数组，重新生成formModel
    // 顺便初始化表单数据
    watch(
      () => unref(getProps).schema,
      (schema = []) => {
        formModel.value = initModel(schema, unref(formModel))
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps)
      const content = isCol ? (
        <ElRow gutter={40}>{renderFormItemWrap()}</ElRow>
      ) : (
        renderFormItemWrap()
      )
      return content
    }

    const renderFormItemWrap = () => {
      // hidden属性表示隐藏，不做渲染
      const { schema = [], isCol } = unref(getProps)

      return schema
        .filter((v) => !v.hidden)
        .map((item) => {
          // 如果是 Divider 组件，需要自己占用一行
          const isDivider = item.component === 'Divider'
          const Com = componentMap['Divider'] as ReturnType<typeof defineComponent>
          return isDivider ? (
            <Com {...{ contentPosition: 'left', ...item.componentProps }}>{item?.label}</Com>
          ) : isCol ? (
            // 如果需要栅格，需要包裹 ElCol
            <ElCol {...setGridProp(item.colProps)}>{renderFormItem(item)}</ElCol>
          ) : (
            renderFormItem(item)
          )
        })
    }

    const renderFormItem = (item: FormSchema) => {
      // 单独给只有options属性的组件做判断
      const notRenderOptions = ['SelectV2', 'Cascader', 'Transfer']

      // 设置slot，例如Select
      const slotsMap: Recordable = {
        ...setItemComponentSlots(slots, item?.componentProps?.slots, item.field)
      }
      if (
        item?.component !== 'SelectV2' &&
        item?.component !== 'Cascader' &&
        item?.componentProps?.options
      ) {
        slotsMap.default = () => renderOptions(item)
      }

      // 设置FormItem的slot
      const formItemSlots: Recordable = setFormItemSlots(slots, item.field)
      // 如果有 labelMessage，自动使用插槽渲染
      if (item?.labelMessage) {
        formItemSlots.label = () => {
          return (
            <>
              <span>{item.label}</span>
              <ElTooltip placement="right" raw-content>
                {{
                  content: () => <span v-html={item.labelMessage}></span>,
                  default: () => (
                    <Icon
                      icon="ep:warning"
                      size={16}
                      color={themeColor}
                      class="ml-2px relative top-1px"
                    ></Icon>
                  )
                }}
              </ElTooltip>
            </>
          )
        }
      }

      return (
        <ElFormItem {...(item.formItemProps || {})} prop={item.field} label={item.label || ''}>
          {{
            ...formItemSlots,
            default: () => {
              const Com = componentMap[item.component as string] as ReturnType<
                typeof defineComponent
              >

              const { autoSetPlaceholder } = unref(getProps)

              return slots[item.field] ? (
                getSlot(slots, item.field, formModel.value)
              ) : (
                <Com
                  v-model={formModel.value[item.field]}
                  {...(autoSetPlaceholder && setTextPlaceholder(item))}
                  {...setComponentProps(item)}
                  style={{ width: '100%', ...item.componentProps?.style }}
                  {...(notRenderOptions.includes(item?.component as string) &&
                  item?.componentProps?.options
                    ? { options: item?.componentProps?.options || [] }
                    : {})}
                >
                  {{ ...slotsMap }}
                </Com>
              )
            }
          }}
        </ElFormItem>
      )
    }

    // 渲染options
    const renderOptions = (item: FormSchema) => {
      switch (item.component) {
        case 'Select':
          const { renderSelectOptions } = useRenderSelect(slots)
          return renderSelectOptions(item)
        case 'Radio':
        case 'RadioButton':
          const { renderRadioOptions } = useRenderRadio()
          return renderRadioOptions(item)
        case 'Checkbox':
        case 'CheckboxButton':
          const { renderCheckboxOptions } = useRenderCheckbox()
          return renderCheckboxOptions(item)
        default:
          break
      }
    }

    // 过滤传入Form组件的属性
    const getFormBindValue = () => {
      // 避免在标签上出现多余的属性
      const delKeys = ['schema', 'isCol', 'autoSetPlaceholder', 'isCustom', 'model']
      const props = { ...unref(getProps) }
      for (const key in props) {
        if (delKeys.indexOf(key) !== -1) {
          delete props[key]
        }
      }
      return props
    }

    return () => {
      return (
        <ElForm
          ref={elFormRef}
          {...getFormBindValue()}
          model={props.isCustom ? props.model : formModel}
          class={prefixCls}
        >
          {{
            // 如果需要自定义，就什么都不渲染，而是提供默认插槽
            default: () => {
              return props.isCustom ? getSlot(slots, 'default') : renderWrap()
            }
          }}
        </ElForm>
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.#{$namespace}-form.#{$namespace}-form .#{$namespace}-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>
