<script lang="ts">
export default {
  name: 'ExamplePage'
}
</script>

<script lang="ts" setup>
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useDictStore } from '@/store/modules/dict'
import { TableData } from '@/api/table/types'
import { useTable } from '@/hooks/web/useTable'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useRouter } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'

const { push } = useRouter()

const dictStore = useDictStore()

useEmitt({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      if (tableObject.currentPage == 1) {
        getList()
      } else {
        // 避免重复调用getList方法
        // 更改currentPage被watch监听到之后，会自动调用 methods.getList()
        tableObject.currentPage = 1
      }
    } else {
      getList()
    }
  }
})

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: '序号',
    type: 'index',
    form: {
      show: false
    },
    detail: {
      show: false
    }
  },
  {
    field: 'title',
    label: '标题',
    search: {
      show: true,
      colProps: {
        span: 8
      }
    },
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 2
    }
  },
  {
    field: 'author',
    label: '作者',
    form: {
      colProps: {
        span: 12
      }
    },
    detail: {
      span: 1
    }
  },
  {
    field: 'display_time',
    label: '创建时间',
    width: '220px',
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      colProps: {
        span: 12
      }
    },
    detail: {
      span: 1
    }
  },
  {
    field: 'importance',
    label: '重要性',
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () => (cellValue === 1 ? '重要' : cellValue === 2 ? '良好' : '一般')
      )
    },
    search: {
      show: true,
      component: 'Select',
      componentProps: {
        // 可以在登录或者获取用户信息的时候，提前获取字典存储在store中，这里偷个懒写死
        options: dictStore.getDictObj.importance
        // options: [
        //   {
        //     value: 0,
        //     label: '一般'
        //   },
        //   {
        //     value: 1,
        //     label: '良好'
        //   },
        //   {
        //     value: 2,
        //     label: '重要'
        //   }
        // ]
      },
      colProps: {
        span: 8
      }
    },
    form: {
      component: 'Select',
      componentProps: {
        style: {
          width: '100%'
        },
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
      },
      colProps: {
        span: 12
      }
    },
    detail: {
      span: 1
    }
  },
  {
    field: 'pageviews',
    label: '阅读数',
    form: {
      component: 'InputNumber',
      value: 0, // 默认值
      colProps: {
        span: 12
      }
    },
    detail: {
      span: 1
    }
  },
  {
    field: 'content',
    label: '内容',
    table: {
      show: false
    },
    form: {
      component: 'Input', // Editor, 后续再封装 Editor，富文本编辑器
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 2
    }
  },
  {
    field: 'action',
    label: '操作',
    width: '260px',
    align: 'left',
    form: {
      show: false
    },
    detail: {
      show: false
    }
  }
])

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  defaultParams: {
    title: 's' // 这是一个默认值, 初始化的时候就传入这个参数去查询
  }
})

const { getList, setSearchParams } = methods

// 调用数据接口，useTable中会自动更新tableObject对象里的数据列表、loading、总条数
getList().then(() => {
  // console.log('这里可以自己干点啥')
})

const delLoading = ref(false)

const { allSchemas } = useCrudSchemas(crudSchemas)
console.log(allSchemas)

const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections() // 获取选中的所有行数据

  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

const AddAction = () => {
  push('/example/example-add')
}

const action = (row: TableData, type: string) => {
  push(`/example/example-${type}?id=${row.id}`)
}
</script>

<template>
  <div>
    <ContentWrap>
      <template #message>
        <Search
          :schema="allSchemas.searchSchema"
          :is-col="true"
          :is-visible="true"
          :action-col="8"
          :model="{ title: 's' }"
          expand
          expand-field="importance"
          @search="setSearchParams"
          @reset="setSearchParams"
        />
      </template>
    </ContentWrap>

    <ContentWrap class="pt-12px">
      <template #message>
        <div class="mb-10px">
          <ElButton type="primary" @click="AddAction">新增</ElButton>
          <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">删除</ElButton>
        </div>

        <Table
          v-model:pageSize="tableObject.pageSize"
          v-model:currentPage="tableObject.currentPage"
          :columns="allSchemas.tableColumns"
          :data="tableObject.tableList"
          :loading="tableObject.loading"
          :pagination="{
            total: tableObject.total
          }"
          @register="register"
        >
          <template #action="{ row }">
            <ElButton
              type="primary"
              v-hasPermi="['example:dialog:edit']"
              @click="action(row, 'edit')"
            >
              编辑
            </ElButton>
            <ElButton
              type="success"
              v-hasPermi="['example:dialog:view']"
              @click="action(row, 'detail')"
            >
              详情
            </ElButton>
            <ElButton
              type="danger"
              v-hasPermi="['example:dialog:delete']"
              @click="delData(row, false)"
            >
              删除
            </ElButton>
          </template>
        </Table>
      </template>
    </ContentWrap>
  </div>
</template>
