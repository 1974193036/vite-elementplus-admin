export const useRenderCheckbox = () => {
  const renderCheckboxOptions = (item: FormSchema) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField
    const Com = (item.component === 'Checkbox' ? ElCheckbox : ElCheckboxButton) as ReturnType<
      typeof defineComponent
    >
    return item?.componentProps?.options?.map((option) => {
      const { value, ...other } = option
      return (
        <Com {...other} label={option[labelAlias || 'value']}>
          {option[valueAlias || 'label']}
        </Com>
      )
    })
  }

  return {
    renderCheckboxOptions
  }
}
