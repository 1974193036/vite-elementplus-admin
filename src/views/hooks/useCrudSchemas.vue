<script lang="ts" setup>
import { getDictOneApi } from '@/api/dict'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useDictStore } from '@/store/modules/dict'
import { TableData } from '@/api/table/types'
import { useTable } from '@/hooks/web/useTable'
import { getTableListApi, delTableListApi } from '@/api/table'

const dictStore = useDictStore()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: '序号',
    type: 'index'
  },
  {
    field: 'title',
    label: '标题',
    search: {
      show: true,
      colProps: {
        span: 8
      }
    }
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间',
    width: '220px'
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
    }
  },
  {
    field: 'importance2',
    label: '重要性2',
    search: {
      show: true,
      component: 'Select',
      dictName: 'importance',
      colProps: {
        span: 8
      }
    }
  },
  {
    field: 'importance3',
    label: '重要性3',
    search: {
      show: true,
      component: 'Select',
      // @ts-ignore
      api: async () => {
        const res = await getDictOneApi()
        return res.data
      },
      colProps: {
        span: 8
      }
    }
  },
  {
    field: 'pageviews',
    label: '阅读数'
  },
  {
    field: 'content',
    label: '内容',
    table: {
      show: false
    }
  },
  {
    field: 'action',
    label: '操作',
    width: '260px',
    align: 'left'
  }
])

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
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
            <ElButton type="danger" @click="delData(row, false)">删除</ElButton>
          </template>
        </Table>
      </template>
    </ContentWrap>
  </div>
</template>
