<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { useIcon } from '@/hooks/web/useIcon'

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}

onMounted(() => {
  restaurants.value = loadAll()
})

const createFilter = (queryString: string) => {
  return (restaurant: Recordable) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const restaurants = ref<Recordable[]>([])
const querySearch = (queryString: string, cb: Fn) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const handleSelect = (item: Recordable) => {
  console.log(item)
}

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = ref<ComponentOptions[]>(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`
  }))
)

const options2 = ref<ComponentOptions[]>(
  Array.from({ length: 10 }).map((_, idx) => {
    const label = idx + 1
    return {
      value: `Group ${label}`,
      label: `Group ${label}`,
      options: Array.from({ length: 10 }).map((_, idx) => ({
        value: `Option ${idx + 1 + 10 * label}`,
        label: `${initials[idx % 10]}${idx + 1 + 10 * label}`
      }))
    }
  })
)

const options3: ComponentOptions[] = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  }
]

const generateData = () => {
  const data: {
    value: number
    desc: string
    disabled: boolean
  }[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `Option ${i}`,
      disabled: i % 4 === 0
    })
  }
  return data
}

const holidays = [
  '2022-10-01',
  '2022-10-02',
  '2022-10-03',
  '2022-10-04',
  '2022-10-05',
  '2022-10-06',
  '2022-10-07'
]

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format('YYYY-MM-DD'))
}

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: '输入框',
    component: 'Divider'
  },
  {
    field: 'field2',
    label: '默认',
    component: 'Input'
  },
  {
    field: 'field3',
    label: '图标1',
    component: 'Input',
    componentProps: {
      suffixIcon: useIcon({ icon: 'ep:calendar' }),
      prefixIcon: useIcon({ icon: 'ep:calendar' })
    }
  },
  {
    field: 'field4',
    label: '图标2',
    component: 'Input',
    componentProps: {
      slots: {
        suffix: true,
        prefix: true
      }
    }
  },
  {
    field: 'field5',
    label: '复合型',
    component: 'Input',
    componentProps: {
      slots: {
        prepend: true,
        append: true
      }
    }
  },
  {
    field: 'field6',
    label: '多行文本',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 1
    }
  },
  {
    field: 'field7',
    label: '自动补全',
    component: 'Divider'
  },
  {
    field: 'field8',
    label: '默认',
    component: 'Autocomplete',
    componentProps: {
      fetchSuggestions: querySearch,
      onSelect: handleSelect
    }
  },
  {
    field: 'field9',
    label: '插槽',
    component: 'Autocomplete',
    componentProps: {
      fetchSuggestions: querySearch,
      onSelect: handleSelect,
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field10',
    component: 'Divider',
    label: '数字输入框'
  },
  {
    field: 'field11',
    label: '默认',
    component: 'InputNumber',
    value: 0
  },
  {
    field: 'field12',
    label: '位置',
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    },
    value: 10
  },
  {
    field: 'field13',
    label: '选择器',
    component: 'Divider'
  },
  {
    field: 'field14',
    label: '默认',
    component: 'Select',
    componentProps: {
      options: [
        {
          disabled: true,
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
    field: 'field15',
    label: '插槽',
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
      optionsSlot: true
    }
  },
  {
    field: 'field16',
    label: '选项分组',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          options: [
            {
              disabled: true,
              label: 'option1-1',
              value: '1-1'
            },
            {
              label: 'option1-2',
              value: '1-2'
            }
          ]
        },
        {
          label: 'option2',
          options: [
            {
              label: 'option2-1',
              value: '2-1'
            },
            {
              label: 'option2-2',
              value: '2-2'
            }
          ]
        }
      ]
    }
  },
  {
    field: 'field17',
    label: '选项分组插槽',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          options: [
            {
              label: 'option1-1',
              value: '1-1',
              disabled: true
            },
            {
              label: 'option1-2',
              value: '1-2'
            }
          ]
        },
        {
          label: 'option2',
          options: [
            {
              label: 'option2-1',
              value: '2-1'
            },
            {
              label: 'option2-2',
              value: '2-2'
            }
          ]
        }
      ],
      optionsSlot: true
    }
  },
  {
    field: 'field18',
    label: '虚拟列表选择器',
    component: 'Divider'
  },
  {
    field: 'field19',
    label: '默认',
    component: 'SelectV2',
    componentProps: {
      options: options.value
    }
  },
  {
    field: 'field20',
    label: '插槽',
    component: 'SelectV2',
    componentProps: {
      options: options.value,
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field21',
    label: '选项分组',
    component: 'SelectV2',
    componentProps: {
      options: options2.value
    }
  },
  {
    field: 'field22',
    label: '选项分组插槽',
    component: 'SelectV2',
    componentProps: {
      options: options2.value,
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field23',
    label: '级联选择器',
    component: 'Divider'
  },
  {
    field: 'field24',
    label: '默认',
    component: 'Cascader',
    componentProps: {
      options: options3
    }
  },
  {
    field: 'field25',
    label: '插槽',
    component: 'Cascader',
    componentProps: {
      options: options3,
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field26',
    label: '开关',
    component: 'Divider'
  },
  {
    field: 'field27',
    label: '默认',
    component: 'Switch',
    value: true
  },
  {
    field: 'field28',
    label: '图标',
    component: 'Switch',
    value: true,
    componentProps: {
      activeIcon: useIcon({ icon: 'ep:check' }),
      inactiveIcon: useIcon({ icon: 'ep:close' })
    }
  },
  {
    field: 'field29',
    label: '评分',
    component: 'Divider'
  },
  {
    field: 'field30',
    label: '默认',
    component: 'Rate',
    value: 2
  },
  {
    field: 'field31',
    label: '图标',
    component: 'Rate',
    value: null,
    componentProps: {
      voidIcon: useIcon({ icon: 'ep:chat-round' }),
      icons: [
        useIcon({ icon: 'ep:chat-round' }),
        useIcon({ icon: 'ep:chat-line-round' }),
        useIcon({ icon: 'ep:chat-dot-round' })
      ]
    }
  },
  {
    field: 'field34',
    label: '穿梭框',
    component: 'Divider'
  },
  {
    field: 'field35',
    label: '默认',
    component: 'Transfer',
    componentProps: {
      props: {
        key: 'value',
        label: 'desc',
        disabled: 'disabled'
      },
      data: generateData()
    },
    value: [],
    colProps: {
      span: 24
    }
  },
  {
    field: 'field36',
    label: '插槽',
    component: 'Transfer',
    componentProps: {
      props: {
        key: 'value',
        label: 'desc',
        disabled: 'disabled'
      },
      leftDefaultChecked: [2, 3],
      rightDefaultChecked: [1],
      data: generateData(),
      slots: {
        default: true
      }
    },
    value: [1],
    colProps: {
      span: 24
    }
  },
  {
    field: 'field37',
    label: '渲染器',
    component: 'Transfer',
    componentProps: {
      props: {
        key: 'value',
        label: 'desc',
        disabled: 'disabled'
      },
      leftDefaultChecked: [2, 3],
      rightDefaultChecked: [1],
      data: generateData(),
      renderContent: (h: Fn, option: Recordable) => {
        return h('span', { style: {color: 'red'}}, `${option.value} - ${option.desc}`)
      }
    },
    value: [1],
    colProps: {
      span: 24
    }
  },
  {
    field: 'field38',
    label: '单选框',
    component: 'Divider'
  },
  {
    field: 'field39',
    label: '默认',
    component: 'Radio',
    componentProps: {
      options: [
        {
          disabled: true,
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
    field: 'field40',
    label: '按钮',
    component: 'RadioButton',
    componentProps: {
      options: [
        {
          disabled: true,
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
    field: 'field41',
    label: '多选框',
    component: 'Divider'
  },
  {
    field: 'field42',
    label: '默认',
    component: 'Checkbox',
    value: [],
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '23'
        }
      ]
    }
  },
  {
    field: 'field43',
    label: '按钮',
    component: 'CheckboxButton',
    value: [],
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '23'
        }
      ]
    }
  },
  {
    field: 'field44',
    component: 'Divider',
    label: '滑块',
  },
  {
    field: 'field45',
    component: 'Slider',
    label: '默认',
    value: 10
  },
  {
    field: 'field46',
    component: 'Divider',
    label: '日期选择器'
  },
  {
    field: 'field47',
    component: 'DatePicker',
    label: '默认',
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field48',
    component: 'DatePicker',
    label: '快捷选项',
    componentProps: {
      type: 'date',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: '今天',
          value: new Date()
        },
        {
          text: '昨天',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: '一周前',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'field49',
    component: 'DatePicker',
    label: '周',
    componentProps: {
      type: 'week',
      format: '周 ww'
    }
  },
  {
    field: 'field50',
    component: 'DatePicker',
    label: '年',
    componentProps: {
      type: 'year'
    }
  },
  {
    field: 'field51',
    component: 'DatePicker',
    label: '月',
    componentProps: {
      type: 'month'
    }
  },
  {
    field: 'field52',
    component: 'DatePicker',
    label: '日期',
    componentProps: {
      type: 'dates'
    }
  },
  {
    field: 'field53',
    component: 'DatePicker',
    label: '日期范围',
    componentProps: {
      type: 'daterange'
    }
  },
  {
    field: 'field54',
    component: 'DatePicker',
    label: '月份范围',
    componentProps: {
      type: 'monthrange'
    }
  },
  {
    field: 'field55',
    component: 'DatePicker',
    label: '插槽',
    componentProps: {
      type: 'date',
      format: 'YYYY/MM/DD',
      valueFormat: 'YYYY-MM-DD',
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field56',
    component: 'Divider',
    label: '日期时间选择器'
  },
  {
    field: 'field57',
    component: 'DatePicker',
    label: '默认',
    componentProps: {
      type: 'datetime'
    }
  },
  {
    field: 'field58',
    component: 'DatePicker',
    label: '快捷选项',
    componentProps: {
      type: 'datetime',
      shortcuts: [
        {
          text: '今天',
          value: new Date()
        },
        {
          text: '昨天',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: '一周前',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'field59',
    component: 'DatePicker',
    label: '日期时间范围',
    componentProps: {
      type: 'datetimerange'
    }
  },
  {
    field: 'field60',
    component: 'Divider',
    label: '时间选择器'
  },
  {
    field: 'field61',
    component: 'TimePicker',
    label: '默认'
  },
  {
    field: 'field62',
    component: 'Divider',
    label: '时间选择'
  },
  {
    field: 'field63',
    component: 'TimeSelect',
    label: '默认',
    componentProps: {
      start: '06:00',
      step: '00:30',
      end: "18:30"
    }
  }
])

const appStore = useAppStore()

const isMobile = computed(() => appStore.getMobile)
</script>

<template>
  <ContentWrap
    title="全部示例"
    message="基于 ElementPlus 的 Form 组件二次封装，实现数据驱动，支持所有 Form 参数"
  >
    <Form :schema="schema" label-width="auto" :label-position="isMobile ? 'top' : 'right'">
      <template #field4-prefix>
        <Icon icon="ep:calendar" class="v-input__icon" />
      </template>
      <template #field4-suffix>
        <Icon icon="ep:calendar" class="v-input__icon" />
      </template>

      <template #field5-prepend> Http:// </template>
      <template #field5-append> .com </template>

      <template #field9-default="{ item }">
        <span class="text-red-400">{{ item.value }}</span>
        <span>--</span>
        <span class="text-green-300">{{ item.link }}</span>
      </template>

      <template #field15-option="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--v-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field17-option="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--v-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field20-default="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field22-default="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field25-default="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>

      <template #field36-default="{ option }">
        <span>{{ option.value }} - {{ option.desc }}</span>
      </template>

      <template #field55-default="cell">
        <div class="cell" :class="{ current: cell.isCurrent }">
          <span class="text">{{ cell.text }}</span>
          <span v-if="isHoliday(cell)" class="holiday"></span>
        </div>
      </template>
    </Form>
  </ContentWrap>
</template>

<style lang="scss" scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;

  .text {
    position: absolute;
    left: 50%;
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  &.current {
    .text {
      color: #fff;
      background: purple;
    }
  }

  .holiday {
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 50%;
    transform: translateX(-50%);
  }
}
</style>
