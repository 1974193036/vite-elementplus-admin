import { isDef } from '@/utils/is'
import { useRafThrottle } from '@/utils/domUtils'

const domSymbol = Symbol('watermark-dom')

export function useWatermark(appendEl: HTMLElement | null = document.body) {
  const func = useRafThrottle(function () {
    const el = appendEl
    if (!el) return
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ height, width })
  })

  const id = domSymbol.toString()

  const watermarkEl = shallowRef<HTMLElement>() // 只处理基本数据类型的响应式, 不进行对象的响应式处理

  const clear = () => {
    const domEle = unref(watermarkEl)
    watermarkEl.value = undefined
    const el = appendEl
    if (!el) return
    domEle && el.removeChild(domEle)
    window.removeEventListener('resize', func)
  }

  const createBase64 = (str: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 300
    canvas.height = 240

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.rotate((-20 * Math.PI) / 120)
      ctx.font = '15px Vedana'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(str, canvas.width / 20, canvas.height)
    }
    return canvas.toDataURL('image/png')
  }

  const updateWatermark = (
    options: {
      str?: string
      width?: number
      height?: number
    } = {}
  ) => {
    const el = unref(watermarkEl)
    if (!el) return
    if (isDef(options.width)) {
      el.style.width = `${options.width}px`
    }
    if (isDef(options.height)) {
      el.style.height = `${options.height}px`
    }
    if (isDef(options.str)) {
      el.style.background = `url(${createBase64(options.str)}) left top repeat`
    }
  }

  const createWatermark = (str: string) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str })
      return id
    }

    const div = document.createElement('div')
    watermarkEl.value = div
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = '100000000'

    const el = appendEl
    if (!el) return id
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ str, width, height })
    el.appendChild(div)
    return id
  }

  const setWatermark = (str: string) => {
    createWatermark(str)
    window.addEventListener('resize', func)
  }

  return {
    setWatermark,
    clear
  }
}
