<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
// import { ElementPlusSize } from '@/types/elementPlus'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('size-dropdown') // v-size-dropdown

defineProps({
  color: propTypes.string.def('')
})


const appStore = useAppStore()

const sizeMapList = computed(() => appStore.sizeMap) // ['default', 'large', 'small']

const sizeMap = {
  default: '默认',
  large: '大',
  small: '小'
}

const setCurrentSize = (size: ElementPlusSize) => {
  appStore.setCurrentSize(size)
}

</script>

<template>
  <ElDropdown :class="prefixCls" trigger="click" @command="setCurrentSize">
    <Icon :size="18" icon="mdi:format-size" :color="color" class="cursor-pointer" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMapList" :key="item" :command="item">
          {{ sizeMap[item] }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
