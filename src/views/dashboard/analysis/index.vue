<script setup lang="ts">
import { pieOptions, barOptions, lineOptions } from '../echarts-data'
import type { EChartsOption } from 'echarts'
import { set } from 'lodash-es'
import {
  getUserAccessSourceApi,
  getWeeklyUserActivityApi,
  getMonthlySalesApi
} from '@/api/dashboard'

const loading = ref(true)

const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption

const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption

const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption

// 用户来源
const getUserAccessSource = async () => {
  const res = await getUserAccessSourceApi()
  if (res) {
    set(
      pieOptionsData,
      'legend.data',
      res.map((v) => v.name)
    )
    pieOptionsData!.series![0].data = res.map((v) => {
      return {
        name: v.name,
        value: v.value
      }
    })
  }
}

// 周活跃量
const getWeeklyUserActivity = async () => {
  const res = await getWeeklyUserActivityApi()
  if (res) {
    set(
      barOptionsData,
      'xAxis.data',
      res.map((v) => v.name)
    )
    set(barOptionsData, 'series', [
      {
        name: '活跃量',
        data: res.map((v) => v.value),
        type: 'bar'
      }
    ])
  }
}

// 每月销售总额
const getMonthlySales = async () => {
  const res = await getMonthlySalesApi()
  if (res) {
    set(
      lineOptionsData,
      'xAxis.data',
      res.map((v) => v.name)
    )
    set(lineOptionsData, 'series', [
      {
        name: '预计',
        smooth: true,
        type: 'line',
        data: res.map((v) => v.estimate),
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: '实际',
        smooth: true,
        type: 'line',
        itemStyle: {},
        data: res.map((v) => v.actual),
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ])
  }
}

const getAllApi = async () => {
  await Promise.all([getUserAccessSource(), getWeeklyUserActivity(), getMonthlySales()])
  loading.value = false
}

getAllApi()
</script>

<template>
  <div>
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px enter-y">
          <ElSkeleton :loading="loading" animated>
            <Echart :options="pieOptionsData" :height="300" />
          </ElSkeleton>
        </ElCard>
      </ElCol>
      <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px enter-y">
          <ElSkeleton :loading="loading" animated>
            <Echart :options="barOptionsData" :height="300" />
          </ElSkeleton>
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px enter-y">
          <ElSkeleton :loading="loading" animated :rows="4">
            <Echart :options="lineOptionsData" :height="350" />
          </ElSkeleton>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
