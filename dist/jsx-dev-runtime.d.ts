import type { ComponentProps, ComponentFunction, JSXElement } from "./types.js";
import { Fragment } from "./jsx-runtime.js";
export { Fragment };
export declare function jsxDEV(type: ComponentFunction | "br", props: ComponentProps | null, _isStaticChildren?: boolean, _source?: unknown, _self?: unknown): JSXElement;
export declare namespace JSX {
    type Element = JSXElement;
    interface IntrinsicElements {
        [elementName: string]: Record<string, unknown>;
    }
}
//# sourceMappingURL=jsx-dev-runtime.d.ts.map