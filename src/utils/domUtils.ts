import type { FunctionArgs } from '@vueuse/core'

export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: Fn,
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export function once(el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export function useRafThrottle<T extends FunctionArgs>(fn: T): T {
  let locked = false
  // @ts-ignore
  return function (...args: any[]) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      // @ts-ignore
      fn.apply(this, args)
      locked = false
    })
  }
}
