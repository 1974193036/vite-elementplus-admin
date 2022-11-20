<script setup lang="ts">
import { useCache } from '@/hooks/web/useCache'
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'
import { loginOutApi } from '@/api/login'
import { useDesign } from '@/hooks/web/useDesign'
import { useMessage } from '@/hooks/web/useMessage'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useUserStore } from '@/store/modules/user'

const tagsViewStore = useTagsViewStore()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('user-info') // v-user-info

const { wsCache } = useCache()

const { replace } = useRouter()

const { createConfirm } = useMessage()

const userStore = useUserStore()

const userInfo = computed(() => {
  return userStore.getUserInfo
})

const loginOut = () => {
  createConfirm({
    title: '温馨提示',
    content: '是否退出本系统？',
    onOk: async () => {
      await loginOutApi() // 实际项目中可以根据接口返回值再做处理
      wsCache.clear()
      tagsViewStore.delAllViews()
      resetRouter() // 重置静态路由表
      replace('/login')
    }
  })
}

const toDocument = () => {
  window.open('https://element-plus-admin-doc.cn/')
}
</script>

<template>
  <ElDropdown :class="prefixCls" trigger="hover">
    <div class="flex items-center">
      <img
        :src="userInfo.avatar"
        alt=""
        class="w-[calc(var(--logo-height)-25px)] rounded-[50%]"
      />
      <span class="<lg:hidden text-[14px] pl-[5px] text-[var(--top-header-text-color)]"
        >{{ userInfo.realName }}</span
      >
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>
          <div @click="toDocument">项目文档</div>
        </ElDropdownItem>
        <ElDropdownItem divided>
          <div @click="loginOut">退出系统</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
