<script lang="ts" setup>
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const columns: TableColumn[] = [
  {
    field: 'index',
    label: '序号',
    type: 'index'
  },
  {
    field: 'title',
    label: '标题'
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间'
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
    }
  },
  {
    field: 'pageviews',
    label: '阅读数'
  },
  {
    field: 'action',
    label: '操作'
  }
]

const loading = ref(false)

let tableDataList = ref<TableData[]>([])

const getTableList = async (params?: Params) => {
  loading.value = true
  const res = await getTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.list
  }
}

getTableList()

const actionFn = (data: TableSlotDefault) => {
  console.log(data.row.author)
}
</script>

<template>
  <ContentWrap title="表格" message="基于 ElementPlus 的 Table 组件二次封装">
    <Table :columns="columns" :data="tableDataList" :loading="loading">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">操作</ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
