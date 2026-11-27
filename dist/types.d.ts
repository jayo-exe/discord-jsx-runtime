import type { APIComponentInLabel, APIMessageComponent, APIModalComponent } from "discord-api-types/v10";
export type ComponentKey = string | number;
export type ComponentProps = Record<string, unknown>;
export type ComponentResult = APIMessageComponent | APIModalComponent | APIComponentInLabel;
export type ComponentFunction = (props: ComponentProps, key?: ComponentKey) => JSXElement;
export type PropsFromAPIType<T> = T extends unknown ? Omit<T, "type" | "id" | "components"> & (T extends {
    components?: infer C;
} ? {
    children?: JSXElement | JSXElement[] | string | string[];
} : {}) : never;
export type JSXElement = ComponentResult;
//# sourceMappingURL=types.d.ts.map