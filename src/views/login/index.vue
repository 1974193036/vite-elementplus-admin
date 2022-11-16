<template>
  <div>
    <div>login/index.vue</div>
    <!-- <Icon icon="ep:aim" color="red" class="aaa" />
    <Icon icon="ep:plus" color="red" :size="24" /> -->

    <!-- <Icon :icon="iconx" color="red" :size="24" />

    <Icon icon="ant-design:aim-outlined" color="red" :size="24" />
    <Icon icon="ant-design:account-book-filled" color="red" :size="24" />
    <Icon icon="ant-design:aliwangwang-outlined" color="red" :size="24" />
    <Icon icon="ant-design:amazon-circle-filled" color="red" :size="24" />
    <Icon icon="ant-design:appstore-twotone" color="red" :size="24" />
    <Icon icon="ant-design:arrow-up-outlined" color="red" :size="24" />
    <Icon icon="ant-design:audio-filled" color="red" :size="24" />


    <Icon icon="svg-icon:peoples" color="red" :size="32" /> -->

    <!-- <ElButton @click="changeIcon">11</ElButton> -->

    <el-scrollbar>
      <div>
        <div v-for="i of count" :ref="refs.set">
          <!-- <router-link :ref="refs.set" class="mr-2" :to="'/a/' + i" custom v-slot="{ navigate }">
            <div @click="navigate">{{ i }}</div>
          </router-link> -->
        </div>
      </div>
    </el-scrollbar>
    <br />
    <button @click="count += 1">Inc</button>
    <button @click="ttt">Dec</button>
    <note>Open the console to see the output</note>
  </div>
</template>

<script lang="ts" setup>
// const iconx = ref('ep:aim')
// const changeIcon = () => {
//   iconx.value = 'ant-design:aliwangwang-outlined'
// }

import { nextTick, ref, watch } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'
const count = ref(2)
const refs = useTemplateRefsList<HTMLDivElement>()
watch(
  refs,
  async () => {
    await nextTick()
    console.log(refs.value)
  },
  {
    deep: true,
    flush: 'post'
  }
)
const ttt = () => {
  console.log(refs.value)
}
</script>
