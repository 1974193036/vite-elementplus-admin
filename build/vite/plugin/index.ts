import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // JSX写法
import windiCSS from 'vite-plugin-windicss' // windiCss
import legacy from '@vitejs/plugin-legacy' // IE11兼容
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // script setup语法糖中定义组件`name`
import { configVisualizerConfig } from './visualizer' // 打包文件分析
import AutoImport from 'unplugin-auto-import/vite' // 自动导入vue全局api
import Components from 'unplugin-vue-components/vite' // 自动导入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { configMockPlugin } from './mock' // mock
import { configIconConfig } from './icon'
import { configEjsPlugin } from './ejs'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY, VITE_USE_MOCK } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    vueJsx(),
    // support name
    vueSetupExtend()
  ]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // icon
  vitePlugins.push(configIconConfig())

  vitePlugins.push(configEjsPlugin(viteEnv))

  vitePlugins.push(
    AutoImport({
      dts: 'types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      imports: ['vue', 'vue-router'],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      // eslint报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    })
  )
  vitePlugins.push(
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'types/components.d.ts',
      // 搜索子目录
      deep: true,
      // 允许子目录作为组件的命名空间前缀。, 目录+名字
      directoryAsNamespace: false
    })
  )

  if (isBuild) {
    VITE_LEGACY &&
      vitePlugins.push(
        legacy({
          targets: ['chrome 65', 'firefox 63'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
          // 显示指定polyfills
          // polyfills: [
          //   'es.symbol',
          //   'es.array.filter',
          //   'es.promise',
          //   'es.promise.finally',
          //   'es/map',
          //   'es/set',
          //   'es.array.for-each',
          //   'es.object.define-properties',
          //   'es.object.define-property',
          //   'es.object.get-own-property-descriptor',
          //   'es.object.get-own-property-descriptors',
          //   'es.object.keys',
          //   'es.object.to-string',
          //   'web.dom-collections.for-each',
          //   'esnext.global-this',
          //   'esnext.string.match-all'
          // ],
          modernPolyfills: false
        })
      )

    // rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig())
  }

  return vitePlugins
}
