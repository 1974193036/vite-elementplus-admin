<script setup lang="ts">
const password = ref('')
</script>

<template>
  <ContentWrap title="密码输入框" message="基于 ElementPlus 的 Input 组件二次封装">
    <InputPassword v-model="password" class="mb-20px" clearable />
    <InputPassword v-model="password" strength clearable />
    <InputPassword v-model="password" strength disabled clearable class="mt-20px" />
  </ContentWrap>
</template>
