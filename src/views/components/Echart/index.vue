<script lang="ts" setup name="Echart">
import { pieOptions, barOptions, lineOptions } from '@/views/dashboard/echarts-data'
</script>

<template>
  <ContentWrap
    title="图表"
    message="基于 echarts 二次封装组件，自适应宽度，只需传入 options 与 height 属性即可展示对应的图表。"
  >
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px enter-y">
          <Echart :options="pieOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px enter-y">
          <Echart :options="barOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px enter-y">
          <Echart :options="lineOptions" :height="350" />
        </ElCard>
      </ElCol>
      <!-- <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="wordOptions" :height="300" />
        </ElCard>
      </ElCol> -->
    </ElRow>
  </ContentWrap>
</template>
