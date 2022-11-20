declare type ElementPlusSize = 'default' | 'small' | 'large'

declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

declare type ColProps = {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  tag?: string
}

declare type ComponentOptions = {
  label?: string
  value?: FormValueType
  disabled?: boolean
  key?: string | number
  children?: ComponentOptions[]
  options?: ComponentOptions[]
} & Recordable

declare type ComponentOptionsAlias = {
  labelField?: string
  valueField?: string
}

declare type ComponentProps = {
  optionsAlias?: ComponentOptionsAlias
  options?: ComponentOptions[]
  optionsSlot?: boolean
} & Recordable

declare type ComponentName =
  | 'Radio'
  | 'RadioButton'
  | 'Checkbox'
  | 'CheckboxButton'
  | 'Input'
  | 'Autocomplete'
  | 'InputNumber'
  | 'Select'
  | 'SelectV2'
  | 'Cascader'
  | 'Switch'
  | 'TimePicker'
  | 'DatePicker'
  | 'Rate'
  | 'Divider'
  | 'InputPassword'

// 有点搞不明白在tsx中写的组件无法通过`unplugin-auto-import`生成声明文件
// 临时解决方案：手动加声明
declare const ElBreadcrumb: typeof import('element-plus/es')['ElBreadcrumb']
declare const ElBreadcrumbItem: typeof import('element-plus/es')['ElBreadcrumbItem']
declare const ElScrollbar: typeof import('element-plus/es')['ElScrollbar']
declare const ElMenuItem: typeof import('element-plus/es')['ElMenuItem']
declare const ElSubMenu: typeof import('element-plus/es')['ElMeElSubMenunuItem']
declare const ElMenu: typeof import('element-plus/es')['ElMenu']
declare const ElDropdown: typeof import('element-plus/es')['ElDropdown']
declare const ElInput: typeof import('element-plus/es')['ElInput']
declare const ElForm: typeof import('element-plus/es')['ElForm']
declare const ElFormItem: typeof import('element-plus/es')['ElFormItem']
declare const ElRow: typeof import('element-plus/es')['ElRow']
declare const ElCol: typeof import('element-plus/es')['ElCol']
declare const ElTooltip: typeof import('element-plus/es')['ElTooltip']
declare const ElRadioGroup: typeof import('element-plus/es')['ElRadioGroup']
declare const ElCheckboxGroup: typeof import('element-plus/es')['ElCheckboxGroup']
declare const ElAutocomplete: typeof import('element-plus/es')['ElAutocomplete']
declare const ElInputNumber: typeof import('element-plus/es')['ElInputNumber']
declare const ElSelect: typeof import('element-plus/es')['ElSelect']
declare const ElCascader: typeof import('element-plus/es')['ElCascader']
declare const ElSwitch: typeof import('element-plus/es')['ElSwitch']
declare const ElSlider: typeof import('element-plus/es')['ElSlider']
declare const ElTimePicker: typeof import('element-plus/es')['ElTimePicker']
declare const ElDatePicker: typeof import('element-plus/es')['ElDatePicker']
declare const ElRate: typeof import('element-plus/es')['ElRate']
declare const ElColorPicker: typeof import('element-plus/es')['ElColorPicker']
declare const ElTransfer: typeof import('element-plus/es')['ElTransfer']
declare const ElDivider: typeof import('element-plus/es')['ElDivider']
declare const ElTimeSelect: typeof import('element-plus/es')['ElTimeSelect']
declare const ElSelectV2: typeof import('element-plus/es')['ElSelectV2']
declare const ElOption: typeof import('element-plus/es')['ElOption']
declare const ElOptionGroup: typeof import('element-plus/es')['ElOptionGroup']
declare const ElRadioButton: typeof import('element-plus/es')['ElRadioButton']
declare const ElRadio: typeof import('element-plus/es')['ElRadio']
declare const ElCheckbox: typeof import('element-plus/es')['ElCheckbox']
declare const ElCheckboxButton: typeof import('element-plus/es')['ElCheckboxButton']
