import type { ComponentKey, ComponentResult, ComponentProps, ComponentFunction } from "./types.js";
import { Fragment } from "./jsx-runtime.js";
export { Fragment };
export declare function jsxDEV(type: ComponentFunction, props: ComponentProps | null, key?: ComponentKey, _isStaticChildren?: boolean, _source?: unknown, _self?: unknown): ComponentResult;
export declare namespace JSX {
    type Element = ComponentResult;
    interface IntrinsicElements {
        [elementName: string]: Record<string, unknown>;
    }
}
//# sourceMappingURL=jsx-dev-runtime.d.ts.map