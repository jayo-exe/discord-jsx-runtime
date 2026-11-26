import type { APIMessageComponent, APIModalComponent } from "discord-api-types/v10"

export type ComponentKey = string | number
export type ComponentProps = Record<string, unknown>
export type ComponentResult = APIMessageComponent | APIModalComponent

export type ComponentType = (props: ComponentProps, key?: ComponentKey) => ComponentResult