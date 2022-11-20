<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { useConfigGlobal } from '@/hooks/web/useConfigGlobal'
import { zxcvbn } from '@zxcvbn-ts/core'
import type { ZxcvbnResult } from '@zxcvbn-ts/core'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('input-password') // v-input-password

const props = defineProps({
  // 是否显示密码强度
  strength: propTypes.bool.def(false),
  modelValue: propTypes.string.def('')
})

// 输入框的值
const valueRef = ref(props.modelValue)

const { configGlobal } = useConfigGlobal()

const emit = defineEmits(['update:modelValue'])

// 设置input的type属性
const textType = ref<'password' | 'text'>('password')

const changeTextType = () => {
  textType.value = unref(textType) === 'text' ? 'password' : 'text'
}

// 监听
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)

// 获取密码强度
const getPasswordStrength = computed(() => {
  const value = unref(valueRef)
  const zxcvbnRef = zxcvbn(unref(valueRef)) as ZxcvbnResult
  return value ? zxcvbnRef.score : -1
})

const getIconName = computed(() =>
  unref(textType) === 'password' ? 'ant-design:eye-invisible-outlined' : 'ant-design:eye-outlined'
)
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div :class="[prefixCls, `${prefixCls}--${configGlobal.size}`]">
    <ElInput v-bind="$attrs" v-model="valueRef" :type="textType">
      <template #suffix>
        <Icon class="v-input__icon cursor-pointer" :icon="getIconName" @click="changeTextType" />
      </template>
    </ElInput>
    <div
      v-if="props.strength"
      :class="`${prefixCls}__bar`"
      class="relative h-6px mt-10px mb-6px mr-auto ml-auto"
    >
      <div :class="`${prefixCls}__bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-input-password'; // v-input-password

.#{$prefix-cls} {
  :deep(.#{$namespace}-input__clear) {
    margin-left: 8px;
  }

  &__bar {
    background-color: var(--#{$namespace}-text-color-disabled);
    border-radius: var(--#{$namespace}-border-radius-base);

    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      background-color: transparent;
      border-color: var(--#{$namespace}-color-white);
      border-style: solid;
      border-width: 0 5px 0 5px;
      content: '';
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;

      &[data-score='0'] {
        width: 20%;
        background-color: var(--#{$namespace}-color-danger);
      }

      &[data-score='1'] {
        width: 40%;
        background-color: var(--#{$namespace}-color-danger);
      }

      &[data-score='2'] {
        width: 60%;
        background-color: var(--#{$namespace}-color-warning);
      }

      &[data-score='3'] {
        width: 80%;
        background-color: var(--#{$namespace}-color-success);
      }

      &[data-score='4'] {
        width: 100%;
        background-color: var(--#{$namespace}-color-success);
      }
    }
  }

  &--mini > &__bar {
    border-radius: var(--#{$namespace}-border-radius-small);
  }
}
</style>
