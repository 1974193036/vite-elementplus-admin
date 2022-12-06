<script lang="ts" setup>
import { useValidator } from '@/hooks/web/useValidator'
import { useForm } from '@/hooks/web/useForm'

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nickName',
    label: '昵称'
  },
  {
    field: 'phone',
    label: '联系电话'
  },
  {
    field: 'email',
    label: '邮箱'
  },
  {
    field: 'addr',
    label: '地址',
    span: 24
  }
])

const data = reactive({
  username: 'chenkl',
  nickName: '梦似花落。',
  age: 26,
  phone: '13655971928',
  email: '502431556@qq.com',
  addr: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址',
  sex: '男',
  certy: '3505831994xxxxxxxx'
})

const form = reactive({
  username: 'chenkl',
  nickName: '',
  phone: '',
  email: '',
  addr: ''
})

const { required } = useValidator()

const rules = reactive({
  username: [required()],
  nickName: [required()],
  phone: [required()],
  email: [required()],
  addr: [required()]
})

const { register, elFormRef } = useForm()

const formValidation = () => {
  unref(elFormRef)!.validate((isValid) => {
    console.log(isValid, form)
  })
}
</script>

<template>
  <div>
    <Descriptions
      title="描述"
      message="基于 ElementPlus 的 Descriptions 组件二次封装"
      :data="data"
      :schema="schema"
    >
      <template #addr-label="{ label }">
        <span class="text-red-400">{{ label }} </span>
      </template>
      <template #addr="{ row }">
        <span class="text-red-400">{{ row.phone }} - {{ row.addr }}</span>
      </template>
    </Descriptions>

    <Form is-custom :model="form" :rules="rules" @register="register">
      <Descriptions title="与Form组件结合" :data="data" :schema="schema" class="mt-20px">
        <template #username-label="scope">
          <span class="is-required--item">{{ scope.label }}</span>
        </template>
        <template #nickName-label="scope">
          <span class="is-required--item">{{ scope.label }}</span>
        </template>
        <template #phone-label="scope">
          <span class="is-required--item">{{ scope.label }}</span>
        </template>
        <template #email-label="scope">
          <span class="is-required--item">{{ scope.label }}</span>
        </template>
        <template #addr-label="scope">
          <span class="is-required--item">{{ scope.label }}</span>
        </template>

        <template #username>
          <ElFormItem prop="username">
            <ElInput v-model="form.username" />
          </ElFormItem>
        </template>
        <template #nickName>
          <ElFormItem prop="nickName">
            <ElInput v-model="form.nickName" />
          </ElFormItem>
        </template>
        <template #phone>
          <ElFormItem prop="phone">
            <ElInput v-model="form.phone" />
          </ElFormItem>
        </template>
        <template #email>
          <ElFormItem prop="email">
            <ElInput v-model="form.email" />
          </ElFormItem>
        </template>
        <template #addr>
          <ElFormItem prop="addr">
            <ElInput v-model="form.addr" />
          </ElFormItem>
        </template>
      </Descriptions>
      <div class="text-center mt-10px">
        <ElButton @click="formValidation">表单验证</ElButton>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.is-required--item {
  position: relative;

  &::before {
    margin-right: 4px;
    color: var(--#{$namespace}-color-danger);
    content: '*';
  }
}
</style>
