import { ViteEjsPlugin } from 'vite-plugin-ejs'

export function configEjsPlugin(viteEnv: ViteEnv) {
  return ViteEjsPlugin({
    title: viteEnv.VITE_GLOB_APP_TITLE
  })
}
