<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls, namespace } = useDesign()

const prefixCls = getPrefixCls('footer') // v-footer

const appStore = useAppStore()

const title = computed(() => appStore.getTitle)

const year = new Date().getFullYear()


// text-[var(--v-text-color-placeholder)]
const textThemeColor = `text-[var(--${namespace}-text-color-placeholder)]`
</script>

<template>
  <div
    :class="[
      prefixCls,
      'text-center bg-[var(--app-content-bg-color)] h-[var(--app-footer-height)] leading-[var(--app-footer-height)]' ,
      `${textThemeColor}`,
      `dark:bg-v-dark`
    ]"
  >
    Copyright ©{{ year }}-present {{ title }}
  </div>
</template>
