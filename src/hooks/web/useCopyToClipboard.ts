import { isDef } from '@/utils/is'
import { Ref } from 'vue'

interface Options {
  target?: HTMLElement
}

export function useCopyToClipboard(initial?: Ref<string> | string | undefined) {
  const clipboardRef = ref(initial || '')
  const isSuccessRef = ref(false)
  const copiedRef = ref(false)

  const copy = (str?: string) => {
    let text = clipboardRef.value
    if (isDef(str)) {
      text = str
    }
    isSuccessRef.value = copyTextToClipboard(text)
    clipboardRef.value = text
    copiedRef.value = true
  }

  return {
    text: clipboardRef,
    isSuccess: isSuccessRef,
    copied: copiedRef,
    copy
  }
}

function copyTextToClipboard(input: string, { target = document.body }: Options = {}) {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement

  element.value = input

  element.setAttribute('readonly', '')
  ;(element.style as any).contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt'

  const selection = document.getSelection()
  let originalRange
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  target.append(element)
  element.select()

  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch (e: any) {
    throw new Error(e)
  }

  element.remove()

  if (originalRange && selection) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  if (previouslyFocusedElement) {
    ;(previouslyFocusedElement as HTMLElement).focus()
  }

  return isSuccess
}
