import type { App } from 'vue'
import { setupPermissionDirective } from './permission/hasPermi'

/**
 * 导出指令：v-xxx
 * @methods hasPermi 按钮权限，用法: v-hasPermi
 */
export const setupDirective = (app: App<Element>) => {
  setupPermissionDirective(app)
}
