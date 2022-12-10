import type { App, Directive, DirectiveBinding } from 'vue'
import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'
import { useUserStore } from '@/store/modules/user'

const useStore = useUserStore()

// 全部权限
const all_permission = ['*.*.*']

const hasPermission = (value: string | string[]): boolean => {
  // console.log(value) // ['example:dialog:edit']
  const permissions = useStore.getUserInfo.permissions as string[] // ['example:dialog:view', 'xxx', 'yyy']
  if (!value) {
    throw new Error('请设置操作权限值')
  }
  if (!isArray(value)) {
    return permissions?.includes(value as string)
  }
  if (all_permission[0] === permissions[0]) {
    return true
  }
  return (intersection(value, permissions) as string[]).length > 0
}

const hasPermi = (el: Element, binding: DirectiveBinding) => {
  const value = binding.value
  const flag = hasPermission(value)
  if (!flag) {
    el.parentNode?.removeChild(el)
  }
}

const mounted = (el: Element, binding: DirectiveBinding) => {
  hasPermi(el, binding)
}

const permiDirective: Directive = {
  mounted
}

export function setupPermissionDirective(app: App<Element>) {
  app.directive('hasPermi', permiDirective)
}
