<template>
  <div>
    <div>dashboard/index.vue</div>
    <el-input v-model="tt"></el-input>

    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary" @click="change">Primary</el-button>
      <el-button type="success" @click="getValue">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>

    <el-row class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain @click="showNoti">Success</el-button>
      <el-button type="info" plain @click="showModalConfirm">Info</el-button>
      <el-button type="warning" plain @click="showModal">Warning</el-button>
      <el-button type="danger" @click="showMessage" plain>Danger</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Analysis">
import { useMessage } from '@/hooks/web/useMessage'

const { createMessage, createSuccessModal, createConfirm, notification } = useMessage()
const tt = ref('test')

const change = () => {
  tt.value = 'hhhhahhaha'
}

const getValue = () => {
  console.log(tt.value)
}

const showMessage = () => {
  createMessage.success('1111')
  createMessage.error('222')
  createMessage.warning('333')
  createMessage.info('444')
}

const showModal = () => {
  createSuccessModal({
    title: '111',
    content: '222'
  })
}

const showModalConfirm = () => {
  createConfirm({
    title: '确定要删除吗?',
    content: '<span style="color: red;font-weight: bold">删除</span>后怎么样怎么样怎么样 ',
    async onOk() {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('')
        }, 1000)
      })
      console.log('点击了确定')
    },
    onCancel() {
      console.log('点击了取消')
    }
  })
}

const showNoti = () => {
  notification.warning({
    title: '11',
    message: '222'
  })
}
</script>
