<script lang="ts" setup>
import { useDesign } from '@/hooks/web/useDesign'
import { underlineToHump } from '@/utils'
import { LoginForm, RegisterForm } from './components'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login') // v-login

const title = underlineToHump(import.meta.env.VITE_GLOB_APP_SHORT_NAME)

const isLogin = ref(true)

const toRegister = () => {
  isLogin.value = false
}

const toLogin = () => {
  isLogin.value = true
}
</script>

<template>
  <div :class="prefixCls" class="h-[100%] relative <xl:(bg-v-dark-l px-10px) <sm:px-10px">
    <div class="relative h-full flex mx-auto">
      <div
        :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px <xl:hidden`"
      >
        <div class="flex items-center relative text-white">
          <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />
          <span class="text-20px font-bold">{{ title }}</span>
        </div>
        <div class="flex justify-center items-center h-[calc(100%-60px)]">
          <TransitionGroup
            tag="div"
            appear
            enter-active-class="animate__animated animate__bounceInLeft"
          >
            <img src="@/assets/svgs/login-box-bg.svg" key="1" alt="" class="w-350px" />
            <div class="text-3xl text-white text-center" key="2">欢迎使用本系统</div>
            <div class="mt-5 font-normal text-white text-14px text-center" key="3">
              开箱即用的中后台管理
            </div>
          </TransitionGroup>
        </div>
      </div>
      <div class="flex-1 p-30px <sm:p-10px dark:bg-v-dark-l relative">
        <div class="flex justify-between items-center text-white @2xl:justify-end @xl:justify-end">
          <div class="flex items-center @2xl:hidden @xl:hidden">
            <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />
            <span class="text-20px font-bold">{{ title }}</span>
          </div>
          <div class="flex justify-end items-center space-x-10px">
            <ThemeSwitch />
          </div>
        </div>

        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div
            class="h-full w-full flex items-center m-auto @2xl:max-w-500px @xl:max-w-500px @md:max-w-500px @lg:max-w-500px"
          >
            <LoginForm
              v-if="isLogin"
              class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)"
              @to-register="toRegister"
            />
            <RegisterForm
              v-else
              class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)"
              @to-login="toLogin"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-login'; // v-login

.#{$prefix-cls} {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}
</style>
