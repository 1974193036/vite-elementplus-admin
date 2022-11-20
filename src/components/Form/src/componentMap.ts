import type { Component } from 'vue'
import { InputPassword } from '@/components/InputPassword'
// import { Editor } from '@/components/Editor'
// import { ComponentName } from '@/types/components'

const componentMap: RecordableM<Component, ComponentName> = {
  Radio: ElRadioGroup,
  RadioButton: ElRadioGroup,
  Checkbox: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  Input: ElInput,
  Autocomplete: ElAutocomplete,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  SelectV2: ElSelectV2,
  Cascader: ElCascader,
  Switch: ElSwitch,
  // Slider: ElSlider,
  TimePicker: ElTimePicker,
  DatePicker: ElDatePicker,
  Rate: ElRate,
  // ColorPicker: ElColorPicker,
  // Transfer: ElTransfer,
  Divider: ElDivider,
  InputPassword: InputPassword,
  // Editor: Editor
}

export { componentMap }
