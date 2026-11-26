import type { ComponentKey, ComponentResult, ComponentProps, ComponentFunction } from "./types.js";
export declare function Fragment(props: ComponentProps): ComponentResult[];
export declare function jsx(type: ComponentFunction, props: ComponentProps | null, key?: ComponentKey): ComponentResult;
export declare const jsxs: typeof jsx;
export declare namespace JSX {
    type Element = ComponentResult;
    interface IntrinsicElements {
        [elementName: string]: Record<string, unknown>;
    }
}
//# sourceMappingURL=jsx-runtime.d.ts.map