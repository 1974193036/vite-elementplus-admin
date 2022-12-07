<script setup lang="ts">
import { useIcon } from '@/hooks/web/useIcon'

const keyClick = (key: string) => {
  if (key === '访问地址') {
    window.open('https://iconify.design/')
  }
}

const peoples = useIcon({ icon: 'svg-icon:peoples', color: 'red', size: 24 })
const money = useIcon({ icon: 'svg-icon:money' })
const aim = useIcon({ icon: 'ep:aim' })
const alarmClock = useIcon({ icon: 'ep:alarm-clock' })
</script>

<template>
  <div>
    <ContentWrap>
      <template #message>
        <Infotip
          :show-index="false"
          title="推荐使用Iconify组件"
          @click="keyClick"
          :schema="[
            {
              label:
                'Iconify组件基本包含所有的图标，你可以查询到你想要的任何图标。并且打包只会打包所用到的图标。',
              keys: ['Iconify', '任何图标']
            },
            {
              label: '访问地址',
              keys: ['访问地址']
            }
          ]"
        />
      </template>
    </ContentWrap>

    <ContentWrap title="本地图标">
      <template #message>
        <div class="flex justify-between">
          <Icon icon="svg-icon:peoples" />
          <Icon icon="svg-icon:money" />
          <Icon icon="svg-icon:message" />
          <Icon icon="svg-icon:shopping" />
        </div>
      </template>
    </ContentWrap>

    <ContentWrap title="Iconify组件" class="pt-10px">
      <template #message>
        <div class="flex justify-between">
          <Icon icon="ep:aim" />
          <Icon icon="ep:alarm-clock" />
          <Icon icon="ep:baseball" />
          <Icon icon="ant-design:down-outlined" />
        </div>
      </template>
    </ContentWrap>

    <ContentWrap title="useIcon" class="pt-10px">
      <template #message>
        <div class="flex justify-between">
          <ElButton :icon="peoples">Button</ElButton>
          <ElButton :icon="money">Button</ElButton>
          <ElButton :icon="aim">Button</ElButton>
          <ElButton :icon="alarmClock">Button</ElButton>
        </div>
      </template>
    </ContentWrap>
  </div>
</template>
