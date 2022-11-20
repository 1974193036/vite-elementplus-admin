<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('content-wrap') // v-content-wrap

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def('')
})
</script>

<template>
  <div>
    <div
      :class="[
        'mt-[calc(0px-var(--app-content-padding))] mx-[calc(0px-var(--app-content-padding))] ml flex flex-col px-24px py-16px bg-white dark:bg-v-dark-ll',
        `${prefixCls}`
      ]"
    >
      <div
        class="pr-12px text-black text-opacity-85 font-weight-600 text-size-20px leading-32px overflow-hidden break-all dark:text-white"
      >
        {{ title }}
      </div>
      <div
        class="pt-12px text-black text-opacity-65 text-size-14px leading-normal overflow-hidden break-all dark:text-white"
      >
        <template v-if="$slots.message">
          <slot name="message"></slot>
        </template>
        <template v-else>
          {{ message }}
        </template>
      </div>
    </div>
    <div class="mt-[var(--app-content-padding)]">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
$prefix-cls: '#{$namespace}-content-wrap'; // v-content-wrap

.#{$prefix-cls} {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
