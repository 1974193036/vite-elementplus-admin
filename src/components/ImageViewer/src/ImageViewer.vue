<script setup lang="ts">
// import { ElImageViewer } from 'element-plus'
import { PropType } from 'vue'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  urlList: {
    type: Array as PropType<string[]>,
    default: (): string[] => []
  },
  zIndex: propTypes.number.def(2000),
  initialIndex: propTypes.number.def(0),
  infinite: propTypes.bool.def(true),
  hideOnClickModal: propTypes.bool.def(false),
  appendToBody: propTypes.bool.def(false),
  show: propTypes.bool.def(false)
})

const getBindValue = computed(() => {
  const propsData: Recordable = { ...props }
  delete propsData.show
  return propsData
})

const show = ref(props.show)

const closeImageViewer = () => {
  show.value = false
}

const showImageViewer = () => {
  show.value = true
}

defineExpose({
  showImageViewer
})
</script>

<template>
  <ElImageViewer v-if="show" v-bind="getBindValue" @close="closeImageViewer" />
</template>
