import type { APIMessageComponent, APIModalComponent } from "discord-api-types/v10"

export type ComponentKey = string | number
export type ComponentProps = Record<string, unknown>
export type ComponentResult = APIMessageComponent | APIModalComponent

export type ComponentFunction = (props: ComponentProps, key?: ComponentKey) => ComponentResult
export type PropsFromAPIType<T> =
  Omit<T, "type" | "id" | "components"> &
  (T extends { components?: infer C }
    ? { children?: C }
    : {})