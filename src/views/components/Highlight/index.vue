<script setup lang="ts">
const keyClick = (key: string) => {
  alert(key)
}
</script>

<template>
  <ContentWrap title="高亮">
    <Highlight :keys="['十年前', '现在']" @click="keyClick">
      一棵树最好的时间是十年前，其次就是现在。
    </Highlight>
  </ContentWrap>
</template>
