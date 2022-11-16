import type { VNode } from 'vue'
import type { MessageProps, ElMessageBoxOptions } from 'element-plus'

interface ElMessageBoxOptionsOpt extends ElMessageBoxOptions {
  onOk?: Fn
  onCancel?: Fn
  content?: string | VNode | (() => VNode)
}

/**
 * 封装 Message
 */
function showMessage(options: Partial<MessageProps>) {
  return ElMessage(options)
}

const createMessage = {
  success: (message: string) => {
    return showMessage({ message, type: 'success', duration: 1500 })
  },
  error: (message: string) => {
    return showMessage({ message, type: 'error', duration: 2500 })
  },
  warning: (message: string) => {
    return showMessage({ message, type: 'warning', duration: 2500 })
  },
  info: (message: string) => {
    return showMessage({ message, type: 'info', duration: 2500 })
  }
}

/**
 * 封装 Messagebox的alert
 */
const getBaseOptions = (): ElMessageBoxOptionsOpt => {
  return {
    cancelButtonText: '取消',
    confirmButtonText: '知道了',
    dangerouslyUseHTMLString: true,
    center: true,
    showClose: false,
    buttonSize: 'default',
    customClass: 'custom-message-box'
  }
}

function createModalOptions(options: ElMessageBoxOptionsOpt): ElMessageBoxOptionsOpt {
  return {
    ...getBaseOptions(),
    ...options,
    title: options.title || '提示',
    message: options.content,
    type: options.type || 'warning'
  }
}

function createModal(options: ElMessageBoxOptionsOpt) {
  const { title, content, onOk, onCancel } = options
  return ElMessageBox.alert(content, title, options)
    .then(() => {
      onOk && onOk()
    })
    .catch(() => {
      onCancel && onCancel()
    })
}

function createSuccessModal(options: ElMessageBoxOptionsOpt) {
  return createModal(createModalOptions({ ...options, type: 'success' }))
}
function createErrorModal(options: ElMessageBoxOptionsOpt) {
  return createModal(createModalOptions({ ...options, type: 'error' }))
}
function createWarningModal(options: ElMessageBoxOptionsOpt) {
  return createModal(createModalOptions({ ...options, type: 'warning' }))
}
function createInfoModal(options: ElMessageBoxOptionsOpt) {
  return createModal(createModalOptions({ ...options, type: 'info' }))
}

/**
 * 封装 Messagebox的confirm
 */
function createConfirm(options: ElMessageBoxOptionsOpt) {
  const opt = createModalOptions({ ...options, confirmButtonText: '确定', type: 'warning' })
  const { title, content, onOk, onCancel } = opt
  // const { title = '温馨提示', content, type = 'warning', confirmButtonText = '确定', cancelButtonText = '取消', dangerouslyUseHTMLString = true, onOk, onCancel } = options
  return ElMessageBox.confirm(content, title, {
    ...opt,
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        if (!onOk) {
          done()
          return
        }
        instance.confirmButtonLoading = true
        Promise.resolve(onOk())
          .then(() => {
            instance.confirmButtonLoading = false
            done()
          })
          .catch(() => {
            instance.confirmButtonLoading = false
            done()
          })
      } else {
        done()
      }
    }
  }).catch(() => {
    onCancel && onCancel()
  })
}

export function useMessage() {
  return {
    createConfirm,
    createMessage,
    createSuccessModal,
    createErrorModal,
    createWarningModal,
    createInfoModal,
    notification: ElNotification
  }
}
