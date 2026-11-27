import type { ComponentKey, ComponentProps, ComponentFunction, JSXElement } from "./types.js";
export declare function Fragment(props: ComponentProps): JSXElement[];
export declare function jsx(type: ComponentFunction, props: ComponentProps | null, key?: ComponentKey): JSXElement;
export declare const jsxs: typeof jsx;
export declare namespace JSX {
    type Element = JSXElement;
    interface IntrinsicElements {
        [elementName: string]: Record<string, unknown>;
    }
}
//# sourceMappingURL=jsx-runtime.d.ts.map