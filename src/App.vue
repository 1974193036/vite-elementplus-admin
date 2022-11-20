<template>
  <ConfigGlobal>
    <div class="app-inner" :class="greyMode ? `${prefixCls}-grey-mode` : ''">
      <RouterView />
    </div>

    <!-- <HelloWorld msg="Vite + Vue" />
    <div class="ff" :class="true ? `${prefixCls}-child` : ''">
      <div>AA</div>
      <div>BB</div>
    </div>
    <div class="flex flex-col">
      <div class="bg-v-dark enter-y border-top-3 hover-trigger">11</div>
      <div class="bg-dark-400 enter-y">22</div>
      <div class="bg-red-400 enter-y">33</div>
    </div> -->
  </ConfigGlobal>
</template>

<script lang="ts" setup>
import { useAppStoreWithOut } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { useCache } from '@/hooks/web/useCache'
import { isDark } from '@/utils/is'

const appStore = useAppStoreWithOut()
const greyMode = computed(() => appStore.getGreyMode)

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('app') // v-app

// 根据浏览器当前主题设置系统主题色
const { wsCache } = useCache()
const setDefaultTheme = () => {
  // 优先使用用户设置
  if (wsCache.get('isDark') !== null) {
    appStore.setIsDark(wsCache.get('isDark'))
    return
  }
  // 使用系统默认
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}

setDefaultTheme()

// import { useDesign } from '@/hooks/web/useDesign'
// import { useMessage } from '@/hooks/web/useMessage'
// import { defHttp } from '@/utils/http'
// import { useAppStoreWithOut } from '@/store/modules/app'

// const { createMessage, createSuccessModal, createConfirm, notification } = useMessage()

// createSuccessModal({
//   title: '111',
//   content: '222'
// })

// ElMessage.error('Oops, this is a error message.')
// const showMessage = () => {
//   createMessage.success('1111')
//   createMessage.error('222')
//   createMessage.warning('333')
//   createMessage.info('444')
//   defHttp
//     .post(
//       {
//         url: '/login',
//         params: {
//           username: 'vben',
//           password: '123456'
//         }
//       },
//       {
//         errorMessageMode: 'modal'
//       }
//     )
//     .then((res) => {
//       console.log(res)
//     })
// }

// const showModalAlert = () => {
//   createSuccessModal({
//     title: '温馨提示',
//     content: '您的的啦看到您的的',
//     onOk() {
//       console.log('点击了确定')
//     }
//   })
//   // createErrorModal({
//   //   title: '温馨提示',
//   //   content: '您的的啦看到您的的'
//   // })
//   // createWarningModal({
//   //   title: '温馨提示',
//   //   content: '您的的啦看到您的的'
//   // })
//   // createInfoModal({
//   //   title: '温馨提示',
//   //   content: '您的的啦看到您的的'
//   // })
// }

// const showModalConfirm = () => {
//   createConfirm({
//     title: '确定要删除吗?',
//     content: '<span style="color: red;font-weight: bold">删除</span>后怎么样怎么样怎么样 ',
//     async onOk() {
//       await new Promise((resolve) => {
//         setTimeout(() => {
//           resolve('')
//         }, 1000)
//       })
//       console.log('点击了确定')
//     },
//     onCancel() {
//       console.log('点击了取消')
//     }
//   })
// }

// const showNotifi = () => {
//   notification.success({
//     title: '11',
//     message: '222'
//   })
// }

// const { getPrefixCls } = useDesign()
// const prefixCls = getPrefixCls('app') // v-app

// const appStore = useAppStoreWithOut()

// const currentSize = computed(() => appStore.getCurrentSize)
</script>

<style lang="scss">
/* namespace已经全局注入，不需要额外在引入 */
$prefix-cls: '#{$namespace}-app'; // v-app

.#{$prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>
