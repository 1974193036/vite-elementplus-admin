interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export const treeToList = <T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T => {
  config = getConfig(config)
  const { children } = config
  const result: any = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue
    result.splice(i + 1, 0, ...result[i][children!])
  }
  return result
}

export const filter = <T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] => {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

/**
 * @description: Extract tree specified structure
 */
export const treeMap = <T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Fn }
): T[] => {
  return treeData.map((item) => treeMapEach(item, opt))
}

/**
 * @description: Extract tree specified structure
 */
export const treeMapEach = (
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) => {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((item: any) =>
        treeMapEach(item, {
          children,
          conversion
        })
      )
    }
  } else {
    return {
      ...conversionData
    }
  }
}

// let x = treeMap(
//   [{a:1, b: 2}, {a:100, b: 200}],
//   { conversion: (data) => {data.c = 'new'; return data} }
// )
// console.log(x)

// let y = treeMap(
//   [{a:1, b: 2, children: [{a: 1, b: 2}]}, {a:100, b: 200, children: [{a: 1100, b: 1200}]}],
//   { conversion: (data) => {data.c = 'new'; return data} }
// )
// console.log(y)

/**
 * 递归遍历树结构
 * @param treeDatas 树
 * @param callBack 回调
 * @param parentNode 父节点
 */
export const eachTree = (treeDatas: any[], callBack: Fn, parentNode = {}) => {
  treeDatas.forEach((element) => {
    const newNode = callBack(element, parentNode) || element
    if (element.children) {
      eachTree(element.children, callBack, newNode)
    }
  })
}

// let treeDatas = [
//   { a: 1, b: 2, children: [{ a: 1, b: 2 }] },
//   { a: 100, b: 200, children: [{ a: 100, b: 200 }] }
// ]
// eachTree(
//   treeDatas,
//   (item, parentNode) => {
//     item.c = 'new2'
//     return item
//   },
//   {}
// )
// console.log(treeDatas)
