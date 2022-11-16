import variables from '@/styles/variables.module.scss'

export const useDesign = () => {
  const { namespace } = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `${namespace}-${scope}`
  }

  return {
    namespace,
    getPrefixCls
  }
}
