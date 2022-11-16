<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls, namespace } = useDesign()

const prefixCls = getPrefixCls('backtop') // v-backtop
</script>

<template>
  <div>
    <ElTooltip effect="dark" content="滚到到顶部" placement="top">
      <ElBacktop
        :class="`${prefixCls}-backtop`"
        :target="`.${namespace}-layout-content-scrollbar .${namespace}-scrollbar__wrap`"
      />
    </ElTooltip>
  </div>
</template>
