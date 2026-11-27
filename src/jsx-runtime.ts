import type { ComponentProps, ComponentFunction, JSXElement } from "./types.js"

export function Fragment(props: ComponentProps): JSXElement[] {
  if(props.if === false) return []
  return Array.isArray(props.children)
    ? props.children as JSXElement[]
    : props.children
      ? [props.children as JSXElement]
      : []
}

export function jsx(type: "br", props: ComponentProps | null): string
export function jsx(type: ComponentFunction, props: ComponentProps | null): JSXElement
export function jsx(
  type: ComponentFunction | "br",
  props: ComponentProps | null
): JSXElement {
  if (type === "br") return "\n"
  return type(props ?? {})
}

export const jsxs = jsx

export namespace JSX {
  export type Element = JSXElement

  export interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>
  }
}