import type { App } from 'vue'

// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
import { ElScrollbar, ElMenu, ElMenuItem, ElSubMenu, ElLoading } from 'element-plus'

// 解决tsx中指令不生效问题
import 'element-plus/es/components/loading/style/index' // 解决tsx中样式不生效
import 'element-plus/es/components/scrollbar/style/index' // 解决tsx中样式不生效
import 'element-plus/es/components/menu/style/index' // 解决tsx中样式不生效
import 'element-plus/es/components/menu-item/style/index' // 解决tsx中样式不生效
import 'element-plus/es/components/sub-menu/style/index' // 解决tsx中样式不生效

const plugins = [ElLoading]

const components = [ElScrollbar, ElMenu, ElMenuItem, ElSubMenu]

export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin) // 解决tsx中v-loading不生效
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
