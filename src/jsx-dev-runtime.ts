import type { ComponentKey, ComponentResult, ComponentProps, ComponentFunction } from "./types.js"
import { jsx, Fragment } from "./jsx-runtime.js"

export { Fragment }

export function jsxDEV(
  type: ComponentFunction,
    props: ComponentProps | null,
    key?: ComponentKey,
  _isStaticChildren?: boolean,
  _source?: unknown,
  _self?: unknown
): ComponentResult {
  return jsx(type, props, key)
}

export namespace JSX {
  export type Element = ComponentResult

  export interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>
  }
}

