import type { ComponentProps, ComponentFunction, JSXElement } from "./types.js"
import { jsx, Fragment } from "./jsx-runtime.js"

export { Fragment }

export function jsxDEV(
  type: ComponentFunction,
    props: ComponentProps | null,
  _isStaticChildren?: boolean,
  _source?: unknown,
  _self?: unknown
): JSXElement {
  return jsx(type, props)
}

export namespace JSX {
  export type Element = JSXElement

  export interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>
  }
}
