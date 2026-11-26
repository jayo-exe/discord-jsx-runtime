import type { ComponentProps, ComponentResult } from "./types"
import type { APIComponentInContainer, APIContainerComponent, APITextDisplayComponent } from "discord-api-types/v10"

export interface TextDisplayProps {
  content: string
}

export function TextDisplay(props: TextDisplayProps) {
  return {
    type: 10,
    content: props.content
  } as APITextDisplayComponent
}

export interface ContainerProps extends ComponentProps {
  accent_color?: number | null,
  spoiler?: boolean,
  children: APIComponentInContainer[]
}

export function Container(
  props: ContainerProps
) {
  return {
    type: 17,
    components: props.children
  } as APIContainerComponent
}