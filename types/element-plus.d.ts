declare type ElementPlusSize = 'default' | 'small' | 'large'

declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

// 有点搞不明白在tsx中写的组件无法通过`unplugin-auto-import`生成声明文件
// 临时解决方案：手动加声明
declare const ElBreadcrumb: typeof import('element-plus/es')['ElBreadcrumb']
declare const ElBreadcrumbItem: typeof import('element-plus/es')['ElBreadcrumbItem']
declare const ElScrollbar: typeof import('element-plus/es')['ElScrollbar']
declare const ElMenuItem: typeof import('element-plus/es')['ElMenuItem']
declare const ElSubMenu: typeof import('element-plus/es')['ElMeElSubMenunuItem']
declare const ElMenu: typeof import('element-plus/es')['ElMenu']
declare const ElDropdown: typeof import('element-plus/es')['ElDropdown']
