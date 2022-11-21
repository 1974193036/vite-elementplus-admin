<script lang="ts" setup>
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { useTable } from '@/hooks/web/useTable'

const columns: TableColumn[] = reactive<TableColumn[]>([
  {
    field: 'index',
    label: '序号',
    type: 'index'
  },
  {
    field: 'content',
    label: '头部',
    children: [
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
      }
    ]
  },
  {
    field: 'action',
    label: '操作'
  }
])

const { register, tableObject, methods, elTableRef } = useTable<TableData>({
  getListApi: getTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const paginationObj = ref<Pagination>()

const { getList } = methods

getList().then(() => {
  // 获取数据后，拿到总条数
  // 展示分页
  paginationObj.value = {
    total: tableObject.total
  }
})

const actionFn = (data: TableSlotDefault) => {
  console.log(data.row.author)
}

const showPagination = (show: boolean) => {
  if (show) {
    paginationObj.value = {
      total: tableObject.total
    }
  } else {
    paginationObj.value = undefined
  }
}

const reserveIndex = (custom: boolean) => {
  const { setProps } = methods
  setProps({
    reserveIndex: custom
  })
}

const showSelections = (show: boolean) => {
 const { setProps } = methods
  setProps({
    selection: show
  })
}

const index = ref(1)

const changeTitle = () => {
  const { setColumn } = methods
  setColumn([
    {
      field: 'title',
      path: 'label',
      value: `标题${unref(index)}`
    }
  ])
  index.value++
}

const showExpandedRows = (show: boolean) => {
  const { setProps } = methods
  setProps({
    expand: show
  })
}

const selectAllNone = () => {
  unref(elTableRef)?.toggleAllSelection()
}

const getSelectDatas = () => {
  const { getSelections } = methods
  console.log(getSelections())
}
</script>

<template>
  <ContentWrap title="UseTable操作">
    <template #message>
      <ElButton @click="showPagination(true)"> 显示 分页 </ElButton>
      <ElButton @click="showPagination(false)"> 隐藏 分页 </ElButton>

      <ElButton @click="reserveIndex(true)">叠加序号</ElButton>
      <ElButton @click="reserveIndex(false)">还原序号</ElButton>

      <ElButton @click="showSelections(true)">显示多选</ElButton>
      <ElButton @click="showSelections(false)">隐藏多选</ElButton>

      <ElButton @click="changeTitle">修改标题</ElButton>

      <ElButton @click="showExpandedRows(true)">显示展开行</ElButton>
      <ElButton @click="showExpandedRows(false)">隐藏展开行</ElButton>

      <ElButton @click="selectAllNone">全选/全不选</ElButton>
      <ElButton @click="getSelectDatas">获取选中行数据</ElButton>
    </template>
    <!-- 如果默认就要展示页码，传入：:pagination="{total: tableObject.total}" -->
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="columns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="paginationObj"
      @register="register"
    >
      <template #expand="data">
        <div class="ml-30px">
          <div>标题：{{ data.row.title }}</div>
          <div>作者：{{ data.row.author }}</div>
          <div>创建时间：{{ data.row.display_time }}</div>
        </div>
      </template>

      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">操作</ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
