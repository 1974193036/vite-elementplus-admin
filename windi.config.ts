import { defineConfig } from 'windicss/helpers'

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

const namespace = 'v'

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  darkMode: 'class',
  attributify: false,
  theme: {
    extend: {
      colors: {
        'v-primary': `var(--${namespace}-color-primary)` // text-v-primary
      },
      backgroundColor: {
        // 暗黑背景色
        'v-dark': `var(--${namespace}-bg-color)`, // bg-v-dark
        'v-dark-l': 'var(--dark-bg-color)', // bg-v-dark-l
        'v-dark-ll': 'var(--dark-bg-color-light)', // bg-v-dark-ll
        'v-primary': `var(--${namespace}-color-primary)`, // bg-v-primary
        'v-primary-light-3': `var(--${namespace}-color-primary-light-3)`, // bg-v-primary-light-3
        'v-primary-light-5': `var(--${namespace}-color-primary-light-5)`, // bg-v-primary-light-5
        'v-primary-light-9': `var(--${namespace}-color-primary-light-9)` // bg-v-primary-light-9
      },
      borderColor: {
        'v-dark': `var(--${namespace}-border-color)`, // border-v-dark
        'v-primary': `var(--${namespace}-color-primary)`, // border-v-primary
        'v-primary-light-3': `var(--${namespace}-color-primary-light-3)`, // border-v-primary-light-3
        'v-primary-light-5': `var(--${namespace}-color-primary-light-5)`, // border-v-primary-light-5
        'v-primary-light-9': `var(--${namespace}-color-primary-light-9)`, // border-v-primary-light-9
      }
    }
  },
  plugins: [createHoverPlugin(), createEnterPlugin()]
})

function createHoverPlugin() {
  const handler = ({ addComponents }) => {
    const obj = {}
    range(50).forEach((i) => {
      obj[`.border-top-${i}`] = {
        borderTopWidth: `${i}px`
      }
      obj[`.border-left-${i}`] = {
        borderLeftWidth: `${i}px`
      }
      obj[`.border-right-${i}`] = {
        borderRightWidth: `${i}px`
      }
      obj[`.border-bottom-${i}`] = {
        borderBottomWidth: `${i}px`
      }
    })
    addComponents({
      '.hover-trigger': {
        display: 'flex',
        height: '100%',
        padding: '1px 10px 0',
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'background var(--transition-time-02)',
        '&:hover': {
          backgroundColor: 'var(--top-header-hover-color)'
        }
      },
      '.dark .hover-trigger': {
        '&:hover': {
          backgroundColor: `var(--${namespace}-bg-color-overlay)`
        }
      },
      ...obj
    })
  }
  return {
    handler
  }
}

function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase()
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`
      }
    }
  }
  const handler = ({ addBase }) => {
    const addRawCss = {}
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y')
      })
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)'
        }
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)'
        }
      }
    })
  }
  return { handler }
}
