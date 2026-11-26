import type { ComponentKey, ComponentResult, ComponentProps, ComponentType } from "./types.js"

export function Fragment(props: ComponentProps): ComponentResult[] {
  return Array.isArray(props.children)
    ? props.children as ComponentResult[]
    : props.children
      ? [props.children as ComponentResult]
      : []
}

export function jsx(
  type: ComponentType,
  props: ComponentProps | null,
  key?: ComponentKey
): ComponentResult {
  return type(props ?? {}, key)
}

export const jsxs = jsx

export namespace JSX {
  export type Element = ComponentResult

  export interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>
  }
}