<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'

// @ts-ignore
import logoImg from '@/assets/imgs/logo.png'

const appStore = useAppStore()

const title = computed(() => appStore.getTitle)

const codeClick = () => {
  alert('点击了二维码')
}

const disabledClick = () => {
  alert('二维码失效')
}

const asyncTitle = ref('')

setTimeout(() => {
  asyncTitle.value = unref(title)
}, 2000)

</script>

<template>
  <ContentWrap title="二维码" message="基于 qrcode 二次封装">
    <ElRow :gutter="20" justify="space-between">

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">基础用法</div>
          <Qrcode :text="title" />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">img标签</div>
          <Qrcode :text="title" tag="img" />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">样式配置</div>
          <Qrcode
            :text="title"
            :options="{ color: { dark: '#ff0000', light: '#00ff00'} }"
          />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">点击事件</div>
          <Qrcode :text="title" @click="codeClick" />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">异步内容</div>
          <Qrcode :text="asyncTitle" />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">失效</div>
          <Qrcode :text="title" disabled @disabled-click="disabledClick" />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">logo配置</div>
          <Qrcode :text="title" :logo="logoImg" />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">logo样式</div>
          <Qrcode
            :text="title"
            :logo="{
              src: logoImg,
              logoSize: 0.1,
              borderSize: 0.25,
              borderRadius: 20,
              bgColor: 'blue'
            }"
          />
        </ElCard>
      </ElCol>

      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">大小配置</div>
          <Qrcode :text="title" :width="100" />
        </ElCard>
      </ElCol>

    </ElRow>
  </ContentWrap>
</template>
