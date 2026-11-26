import type { ComponentKey, ComponentResult, ComponentProps, ComponentFunction, JSXElement } from "./types.js"

export function Fragment(props: ComponentProps): ComponentResult[] {
  return Array.isArray(props.children)
    ? props.children as ComponentResult[]
    : props.children
      ? [props.children as ComponentResult]
      : []
}

export function jsx(
  type: ComponentFunction,
  props: ComponentProps | null,
  key?: ComponentKey
): JSXElement {
  return type(props ?? {}, key)
}

export const jsxs = jsx

export namespace JSX {
  export type Element = JSXElement

  export interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>
  }
}