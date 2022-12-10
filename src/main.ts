import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '@/styles/index.scss'
import 'virtual:windi-utilities.css'

import { createApp } from 'vue'

// 引入状态管理
import { setupStore } from '@/store'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 路由
import router, { setupRouter } from './router'
import { setupRouterGuard } from './router/guard'

// 自定义指令
import { setupDirective } from './directives'

import App from './App.vue'

function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupElementPlus(app)

  setupRouter(app)

  setupRouterGuard(router)

  setupDirective(app)

  app.mount('#app')
}

bootstrap()
