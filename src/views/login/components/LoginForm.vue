<script lang="ts" setup>
import { useValidator } from '@/hooks/web/useValidator'
import { useForm } from '@/hooks/web/useForm'
import { useCache } from '@/hooks/web/useCache'
import type { LoginParams } from '@/api/login/types'
import { loginApi, getUserInfo } from '@/api/login'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const { required } = useValidator()

const rules = {
  username: [required()],
  password: [required()]
}

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'username',
    label: '用户名',
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: '请输入用户名'
      // style: {
      //   width: '100%'
      // }
    }
  },
  {
    field: 'password',
    label: '密码',
    value: '123456',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      // style: {
      //   width: '100%'
      // },
      strength: false,
      placeholder: '请输入密码'
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    }
  },
  {
    field: 'other',
    component: 'Divider',
    label: '其他登录方式',
    componentProps: {
      contentPosition: 'center'
    }
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24
    }
  }
])

const remember = ref(false)

const loading = ref(false)

const emit = defineEmits(['to-register'])

const { register, elFormRef, methods } = useForm()

const { wsCache } = useCache()

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const userStore = useUserStore()

const { addRoute, push } = useRouter()

const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData<LoginParams>()
      try {
        const res = await loginApi(formData)
        if (res) {
          // 存储登录token
          wsCache.set(appStore.getUserInfo, res.token)
          await getRole()
        }
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取角色信息
const getRole = async () => {
  const res = await getUserInfo()
  if (res) {
    // 设置用户基本信息
    userStore.setUserInfo(res)
    if (appStore.getDynamicRouter === 'backend') {
      // 后端路由
      const routers = res.menus || []
      await permissionStore.generateRoutes({ type: 'backend', routers }).catch(() => {})
    } else if (appStore.getDynamicRouter === 'frontend') {
      // 前端路由
      const roles = (res.roles || []).map((v) => v.value)
      await permissionStore.generateRoutes({ type: 'frontend', roles }).catch(() => {})
    } else if (appStore.getDynamicRouter === 'none') {
      // 不控制路由，展示所有路由
      await permissionStore.generateRoutes({ type: 'none' }).catch(() => {})
    }
    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    })
    permissionStore.setIsAddRouters(true)
    push({ path: res.homePath })
  }
}

const toRegister = () => {
  emit('to-register')
}

const iconColor = '#999'

const iconSize = 30
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-v-dark border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">登录</h2>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" label="记住我" size="small" />
        <ElLink type="primary" :underline="false">忘记密码</ElLink>
      </div>
    </template>

    <template #login>
      <div class="w-[100%]">
        <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
          登录
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toRegister"> 注册 </ElButton>
      </div>
    </template>

    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
          icon="ant-design:github-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:wechat-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:alipay-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
        <Icon
          icon="ant-design:weibo-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
      </div>
    </template>
  </Form>
</template>

<style lang="scss" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--#{$namespace}-color-primary) !important;
  }
}
</style>
