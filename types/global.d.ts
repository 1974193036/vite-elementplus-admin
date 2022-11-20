declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type ComponentRef<T> = InstanceType<T>

declare interface Fn<T = any> {
  (...arg: T[]): T
}

declare type RecordableM<T = any, K = string> = Record<K extends null | undefined ? string : K, T>
