<script lang="tsx">
import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/store/modules/app'
import { useRenderLayout } from './components/useRenderLayout'
import { Setting } from '@/components/Setting'
import { BackTop } from '@/components/BackTop'

const { getPrefixCls, namespace } = useDesign()
const prefixCls = getPrefixCls('layout') // v-layout

const appStore = useAppStore()

// 菜单布局
const layout = computed(() => appStore.getLayout)
// 菜单折叠
const collapse = computed(() => appStore.getCollapse)
// 是否是移动端
const mobile = computed(() => appStore.getMobile)

const handleClickOutside = () => {
  appStore.setCollapse(true)
}

const renderLayout = () => {
  switch (unref(layout)) {
    case 'classic':
      const { renderClassic } = useRenderLayout()
      return renderClassic()
    case 'topLeft':
      const { renderTopLeft } = useRenderLayout()
      return renderTopLeft()
    case 'top':
      const { renderTop } = useRenderLayout()
      return renderTop()
    case 'cutMenu':
      const { renderCutMenu } = useRenderLayout()
      return renderCutMenu()
  }
}

// 是否去除Layout的setting模块
// 这种情况下，请先设置好项目参数
const isDropSetting: boolean =
  (import.meta.env.VITE_DROP_LAYOUT_SETTING as unknown as string) === 'true' ? true : false

// bg-[var(--v-color-black)]
const colorThemeBlack = `bg-[var(--${namespace}-color-black)]`

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section class={[prefixCls, `${prefixCls}__${layout.value}`, 'w-[100%] h-[100%] relative']}>
        {mobile.value && !collapse.value ? (
          <div
            class={['absolute top-0 left-0 w-full h-full opacity-30 z-99', `${colorThemeBlack}`]}
            onClick={handleClickOutside}
          />
        ) : null}

        {renderLayout()}

        <BackTop></BackTop>

        { isDropSetting ? null : <Setting></Setting>}
      </section>
    )
  }
})
</script>

<style lang="scss" scoped>
$prefix: '#{$namespace}';
$prefix-cls: '#{$namespace}-layout'; // v-layout

.#{$prefix-cls} {
  background-color: var(--app-content-bg-color);
  :deep(.#{$prefix}-scrollbar__view) {
    height: 100% !important;
  }
}
</style>
