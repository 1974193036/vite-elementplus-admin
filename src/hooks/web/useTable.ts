import type { TableProps } from '@/components/Table/src/type'
import type { Table, TableExpose } from '@/components/Table'
import { get } from 'lodash-es'
import { useMessage } from '@/hooks/web/useMessage'

interface TableResponse<T = any> {
  total: number
  list: T[]
}

interface UseTableConfig<T = any> {
  getListApi: (option: any) => Promise<TableResponse<T>>
  delListApi?: (option: any) => Promise<any>
  // 返回数据格式配置
  response: {
    list: string
    total?: string
  }
  // 默认传递的参数
  defaultParams?: Recordable
  props?: TableProps
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  tableList: T[]
  params: any
  loading: boolean
  currentRow: Nullable<T>
}

const { createMessage, createConfirm } = useMessage()

export const useTable = <T = any>(config?: UseTableConfig<T>) => {
  const tableObject = reactive<TableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 0,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    // params: {},
    params: {
      ...(config?.defaultParams || {})
    },
    // 加载中
    loading: false,
    // 当前行的数据
    currentRow: null
  })

  const paramsObj = computed(() => {
    return {
      ...tableObject.params,
      // 后台字段统一: pageSize、pageIndex
      pageSize: tableObject.pageSize,
      pageIndex: tableObject.currentPage
    }
  })

  watch(
    () => tableObject.currentPage,
    () => {
      methods.getList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      // 当前页不为1时，修改页数后会导致多次调用getList方法
      if (tableObject.currentPage === 1) {
        methods.getList()
      } else {
        tableObject.currentPage = 1
      }
    }
  )

  // Table实例
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = unref(elRef)
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const delData = async (ids: string[] | number[]) => {
    const res = await (config?.delListApi && config?.delListApi(ids))
    if (res) {
      createMessage.success('删除成功')

      // 计算出临界点
      const currentPage =
        tableObject.total % tableObject.pageSize === ids.length || tableObject.pageSize === 1
          ? tableObject.currentPage > 1
            ? tableObject.currentPage - 1
            : tableObject.currentPage
          : tableObject.currentPage

      tableObject.currentPage = currentPage
      methods.getList()
    }
  }

  const methods = {
    getList: async () => {
      tableObject.loading = true
      const res = await config?.getListApi(unref(paramsObj)).finally(() => {
        tableObject.loading = false
      })
      if (res) {
        tableObject.tableList = get(res || {}, config?.response.list as string) || []
        tableObject.total = get(res || {}, config?.response?.total as string) || 0
      }
    },
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: TableSetPropsType[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParams: (data: Recordable) => {
      tableObject.params = Object.assign(tableObject.params, {
        pageSize: tableObject.pageSize,
        pageIndex: tableObject.currentPage,
        ...data
      })
      if (tableObject.currentPage == 1) {
        methods.getList()
      } else {
        // 避免重复调用getList方法
        // 更改currentPage被watch监听到之后，会自动调用 methods.getList()
        tableObject.currentPage = 1
      }
    },
    // 删除数据
    delList: async (ids: string[] | number[], multiple: boolean, message = true) => {
      const tableRef = await getTable()
      if (multiple) {
        if (!tableRef?.selections.length) {
          createMessage.warning('请选择需要删除的数据')
          return
        }
      } else {
        if (!tableObject.currentRow) {
          createMessage.warning('请选择需要删除的数据')
          return
        }
      }
      if (message) {
        createConfirm({
          title: '提示',
          content: '是否删除所选中数据？',
          async onOk() {
            await delData(ids)
          }
        })
      } else {
        await delData(ids)
      }
    }
  }

  ;(async () => {
    await nextTick()
    config?.props && methods.setProps(config.props)
  })()

  return {
    register,
    elTableRef,
    tableObject,
    methods
  }
}
