<script lang="ts" setup>
// import { getDictOneApi } from '@/api/dict'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useDictStore } from '@/store/modules/dict'
import { TableData } from '@/api/table/types'
import { useTable } from '@/hooks/web/useTable'
import { getTableListApi, delTableListApi, saveTableApi } from '@/api/table'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { useMessage } from '@/hooks/web/useMessage'

const { createMessage } = useMessage()

const dictStore = useDictStore()

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

const dialogVisible = ref(false)

const dialogTitle = ref('')

const actionType = ref('')

const AddAction = () => {
  dialogTitle.value = '新增'
  dialogVisible.value = true
  tableObject.currentRow = null
  actionType.value = ''
}

const action = (row: TableData, type: string) => {
  dialogTitle.value = type === 'edit' ? '编辑' : '详情'
  dialogVisible.value = true
  tableObject.currentRow = row
  actionType.value = type
}

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as TableData
      const res = await saveTableApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        dialogVisible.value = false
        if (tableObject.currentPage == 1) {
          getList()
        } else {
          // 避免重复调用getList方法
          // 更改currentPage被watch监听到之后，会自动调用 methods.getList()
          tableObject.currentPage = 1
        }
        createMessage.success(`${dialogTitle.value}成功`)
      }
    }
  })
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

    <Dialog v-model="dialogVisible" :title="dialogTitle">
      <!-- 新增/编辑 -->
      <Write
        v-if="actionType !== 'detail'"
        ref="writeRef"
        :form-schema="allSchemas.formSchema"
        :current-row="tableObject.currentRow"
      />

      <!-- 详情 -->
      <Detail
        v-if="actionType === 'detail'"
        :detail-schema="allSchemas.detailSchema"
        :current-row="tableObject.currentRow"
      />

      <template #footer>
        <ElButton @click="dialogVisible = false">关闭</ElButton>
        <ElButton v-if="actionType !== 'detail'" type="primary" :loading="loading" @click="save">
          保存
        </ElButton>
      </template>
    </Dialog>
  </div>
</template>
