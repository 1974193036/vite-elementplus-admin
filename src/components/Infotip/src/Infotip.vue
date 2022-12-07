<script setup lang="ts">
import { PropType } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls, namespace } = useDesign()

const prefixCls = getPrefixCls('infotip') // v-infotip

interface TipSchema {
  label: string
  keys?: string[]
}

const props = defineProps({
  title: propTypes.string.def(''),
  schema: {
    type: Array as PropType<Array<string | TipSchema>>,
    required: true,
    default: () => []
  },
  showIndex: propTypes.bool.def(true),
  highlightColor: propTypes.string.def('var(--v-color-primary)')
})

const emit = defineEmits(['click'])

const keyClick = (key: string) => {
  emit('click', key)
}
</script>

<template>
  <div
    :class="[
      prefixCls,
      'p-20px mb-20px border-1px border-solid bg-v-primary-light-9 border-v-primary'
    ]"
  >
    <div v-if="props.title" :class="[`${prefixCls}__header`, 'flex items-center']">
      <Icon
        icon="bi:exclamation-circle-fill"
        :size="22"
        :color="`var(--${namespace}-color-primary)`"
      />
      <span :class="[`${prefixCls}__title`, 'pl-5px text-16px font-bold']">{{ title }}</span>
    </div>
    <div :class="`${prefixCls}__content`">
      <p v-for="(item, $index) in schema" :key="$index" class="text-14px mt-15px">
        <Highlight
          :keys="typeof item === 'string' ? [] : item.keys"
          :color="highlightColor"
          @click="keyClick"
        >
          {{ showIndex ? `${$index + 1}、` : '' }}
          {{ typeof item === 'string' ? item : item.label }}
        </Highlight>
      </p>
    </div>
  </div>
</template>
