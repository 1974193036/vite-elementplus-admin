import { h } from 'vue'
import type { VNode } from 'vue'
import { Icon } from '@/components/Icon'

interface IconTypes {
  size?: number
  color?: string
  icon: string
}

export const useIcon = (props: IconTypes): VNode => {
  return h(Icon, props)
}
