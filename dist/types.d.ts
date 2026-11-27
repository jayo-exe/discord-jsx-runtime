import type { APIComponentInLabel, APIMessageComponent, APIModalComponent } from "discord-api-types/v10";
export type ComponentKey = string | number;
export type ComponentProps = Record<string, unknown> & {
    key?: ComponentKey;
};
export type ComponentResult = APIMessageComponent | APIModalComponent | APIComponentInLabel;
export type JSXElement = ComponentResult | null;
export type ComponentFunction = (props: ComponentProps) => JSXElement;
export type PropsFromAPIType<T> = T extends unknown ? Omit<T, "type" | "id" | "components"> & {
    key?: ComponentKey;
} & (T extends {
    components?: infer C;
} ? {
    children?: JSXElement | JSXElement[] | string | string[];
} : {}) : never;
//# sourceMappingURL=types.d.ts.map