<script lang="ts" setup>
import { useValidator } from '@/hooks/web/useValidator'
import { useIcon } from '@/hooks/web/useIcon'

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
    labelMessage: '用于描述这个label',
    value: 'admin',
    // value: ['2022-11-12', '2022-11-18'],
    component: 'Input',
    colProps: {
      span: 24
    },
    // formItemProps: {
    //   labelWidth: 200
    // },
    componentProps: {
      placeholder: '请输入用户名',
      style: {
        width: '60%'
      },
      // suffixIcon: useIcon({ icon: 'ep:calendar' }),
      // prefixIcon: useIcon({ icon: 'ep:calendar' })

      // slots: {
      //   suffix: true, // 自定义 Input suffix 模板
      //   prefix: true
      // }

      slots: {
        prepend: true, // 自定义 Input prepend 模板
        append: true
      }

      // slots: {
      //   default: true // 自定义 selectV2 option 模板
      // },
      // optionsAlias: {
      //   labelField: 'name',
      //   valueField: 'code'
      // },
      // options: [
      //   {
      //     name: '西瓜',
      //     code: '西瓜',
      //     // disabled: true
      //   },
      //   {
      //     name: '苹果',
      //     code: '苹果'
      //   }
      // ],

      // options: [
      //   {
      //     label: '西瓜',
      //     value: '西瓜'
      //     // border: true,
      //     // disabled: true
      //   },
      //   {
      //     label: '苹果',
      //     value: '苹果'
      //     // border: true,
      //   }
      // ]

      // optionsSlot: true // 自定义 select option 模板
      // options: [
      //   {
      //     label: 'option1',
      //     value: '1'
      //   },
      //   {
      //     label: 'option2',
      //     value: '2'
      //   }
      // ],
      // options: [{
      //   value: '11',
      //   label: '11'
      // }, {
      //   value: '22',
      //   label: '22'
      // }, {
      //   value: '33',
      //   label: '33'
      // }]
      // type: 'daterange',
      // disabledDate: (time: Date) => {
      //   return time.getTime() > Date.now()
      // },
      // clearable: false
      // onFocus: () => {
      //   console.log(1111)
      // }
    }
  },
  {
    field: 'password',
    label: '密码',
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
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

const aaa = ref()

const test = async () => {
  await nextTick()
  aaa.value.setProps({
    size: 'small',
    labelPostition: 'right',
    labelWidth: '100px'
  })
  // aaa.value.setProps({
  //   size: 'small',
  //   labelPostition: 'right',
  //   labelWidth: '100px'
  // })
  // aaa.value.setSchema([
  //   {
  //     field: 'password',
  //     path: 'label',
  //     value: '密码333'
  //   }
  // ])
}

const register = (ref, elRef) => {
  aaa.value = ref
}
</script>

<template>
  <el-button @click="test">改变表单</el-button>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-v-dark border-solid)"
    @register="register"
  >
    <!-- <template #username="slotsData">
      <div>自定义用户名slot - {{ slotsData }}</div>
    </template> -->

    <template #username-prefix>
      <Icon icon="ep:calendar" class="el-input__icon" />
    </template>
    <template #username-suffix>
      <Icon icon="ep:calendar" class="el-input__icon" />
    </template>

    <template #username-prepend> Http:// </template>
    <template #username-append> .com </template>

    <template #username-error>
      <div class="text-blue-300">自定义用户名的error</div>
    </template>
    <template #username-label>
      <div class="text-red-600 font-700">自定义用户名的label</div>
    </template>

    <template #username-option="{ item }">
      <span class="text-red-600 font-700">{{ item.name }}</span>
      <span class="text-red-600 font-700">{{ item.code }}</span>
    </template>

    <template #username-default="{ item }">
      <span class="text-red-600 font-700">{{ item.label }}</span>
      <span class="text-red-600 font-700">{{ item.value }}</span>
    </template>

    <template #title="slotsData">
      <div>登录 slot - {{ slotsData }}</div>
    </template>

    <template #tool>
      <div>记住我/忘记密码 slot</div>
    </template>

    <template #login>
      <div>登录的按钮 slot</div>
    </template>

    <template #otherIcon>
      <div>其他登录方式的图标 slot</div>
    </template>
  </Form>
</template>
