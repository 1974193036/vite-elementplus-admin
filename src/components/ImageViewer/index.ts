import ImageViewer from './src/ImageViewer.vue'
import { isClient } from '@/utils/is'
import { createVNode, render, VNode } from 'vue'
import { ImageViewerProps } from './src/type'

let instance: Nullable<VNode> = null

export function createImageViewer(options: ImageViewerProps) {
  if (!isClient) return
  const {
    urlList,
    initialIndex = 0,
    infinite = true,
    hideOnClickModal = false,
    appendToBody = false,
    zIndex = 2000,
    show = false
  } = options

  const propsData: Partial<ImageViewerProps> = {}

  propsData.urlList = urlList
  propsData.initialIndex = initialIndex
  propsData.infinite = infinite
  propsData.hideOnClickModal = hideOnClickModal
  propsData.appendToBody = appendToBody
  propsData.zIndex = zIndex
  propsData.show = show

  if (!instance) {
    const container = document.createElement('div')
    instance = createVNode(ImageViewer, propsData) // 将组件渲染成虚拟节点
    render(instance, container) // 生成真实DOM挂载到容器中
    document.body.appendChild(container)
  }

  const { showImageViewer} = instance!.component!.exposed!

  if (typeof showImageViewer === 'function') {
    showImageViewer()
  }
}
