import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '@/styles/index.scss'
import 'virtual:windi-utilities.css'

import 'virtual:svg-icons-register'


import { createApp } from 'vue'

// 引入状态管理
import { setupStore } from '@/store'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 路由
import { setupRouter } from './router'

import App from './App.vue'

function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupElementPlus(app)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
