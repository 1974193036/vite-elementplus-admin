import PurgeIcons from 'vite-plugin-purge-icons'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export function configIconConfig() {
  return PurgeIcons()
}

export function configSpriteConfig() {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), '.', 'src/assets/svgs')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: true
  })
}


