import type { ComponentProps, ComponentResult, PropsFromAPIType } from "./types"
import { ComponentType, type APIActionRowComponent, type APIBaseComponent, type APIButtonComponent, type APIChannelSelectComponent, type APICheckboxComponent, type APICheckboxGroupComponent, type APIComponentInActionRow, type APIComponentInContainer, type APIContainerComponent, type APIFileComponent, type APIFileUploadComponent, type APILabelComponent, type APIMediaGalleryComponent, type APIMentionableSelectComponent, type APIRadioGroupComponent, type APIRoleSelectComponent, type APISectionComponent, type APISeparatorComponent, type APIStringSelectComponent, type APITextDisplayComponent, type APITextInputComponent, type APIThumbnailComponent, type APIUserSelectComponent } from "discord-api-types/v10"

export function MessageComponent
<T extends APIBaseComponent<C>, C extends ComponentType>
(type: C, props: PropsFromAPIType<T>) 
{
  let finalProps: Record<string, unknown>
  if ("children" in props) {
    const {children, ...rest} = props
    finalProps = {components: children, ...rest}
  } else {
    finalProps = {...props}
  }
  return {type, ...finalProps} as T
}

export type ContainerProps = PropsFromAPIType<APIContainerComponent>
export const Container = (props: ContainerProps) => 
  MessageComponent(ComponentType.Container, props)

export type ActionRowProps = PropsFromAPIType<APIActionRowComponent<APIComponentInActionRow>>
export const ActionRow = (props: ActionRowProps) => 
  MessageComponent(ComponentType.ActionRow, props)

export type ButtonProps = PropsFromAPIType<APIButtonComponent>
export const Button = (props: ButtonProps) => 
  MessageComponent(ComponentType.Button, props)

export type TextDisplayProps = PropsFromAPIType<APITextDisplayComponent>
export const TextDisplay = (props: TextDisplayProps) => 
  MessageComponent(ComponentType.TextDisplay, props)

export type SectionProps = PropsFromAPIType<APISectionComponent>
export const Section = (props: SectionProps) => 
  MessageComponent(ComponentType.Section, props)

export type SeparatorProps = PropsFromAPIType<APISeparatorComponent>
export const Separator = (props: SeparatorProps) => 
  MessageComponent(ComponentType.Separator, props)

export type ThumbnailProps = PropsFromAPIType<APIThumbnailComponent>
export const Thumbnail = (props: ThumbnailProps) => 
  MessageComponent(ComponentType.Thumbnail, props)

export type FileProps = PropsFromAPIType<APIFileComponent>
export const File = (props: FileProps) => 
  MessageComponent(ComponentType.File, props)

export type FileUploadProps = PropsFromAPIType<APIFileUploadComponent>
export const FileUpload = (props: FileUploadProps) => 
  MessageComponent(ComponentType.FileUpload, props)

export type MediaGalleryProps = PropsFromAPIType<APIMediaGalleryComponent>
export const MediaGallery = (props: MediaGalleryProps) => 
  MessageComponent(ComponentType.MediaGallery, props)

export type CheckboxProps = PropsFromAPIType<APICheckboxComponent>
export const Checkbox = (props: CheckboxProps) => 
  MessageComponent(ComponentType.Checkbox, props)

export type CheckboxGroupProps = PropsFromAPIType<APICheckboxGroupComponent>
export const CheckboxGroup = (props: CheckboxGroupProps) => 
  MessageComponent(ComponentType.CheckboxGroup, props)

export type RadioGroupProps = PropsFromAPIType<APIRadioGroupComponent>
export const RadioGroup = (props: RadioGroupProps) => 
  MessageComponent(ComponentType.RadioGroup, props)


export type MentionableSelectProps = PropsFromAPIType<APIMentionableSelectComponent>
export const MentionableSelect = (props: MentionableSelectProps) => 
  MessageComponent(ComponentType.MentionableSelect, props)

export type UserSelectProps = PropsFromAPIType<APIUserSelectComponent>
export const UserSelect = (props: UserSelectProps) => 
  MessageComponent(ComponentType.UserSelect, props)

export type RoleSelectProps = PropsFromAPIType<APIRoleSelectComponent>
export const RoleSelect = (props: RoleSelectProps) => 
  MessageComponent(ComponentType.RoleSelect, props)

export type ChannelSelectProps = PropsFromAPIType<APIChannelSelectComponent>
export const ChannelSelect = (props: ChannelSelectProps) => 
  MessageComponent(ComponentType.ChannelSelect, props)

export type StringSelectProps = PropsFromAPIType<APIStringSelectComponent>
export const StringSelect = (props: StringSelectProps) => 
  MessageComponent(ComponentType.StringSelect, props)

export type LabelProps = PropsFromAPIType<APILabelComponent>
export const Label = (props: LabelProps) => 
  MessageComponent(ComponentType.Label, props)

export type TextInputProps = PropsFromAPIType<APITextInputComponent>
export const TextInput = (props: TextInputProps) => 
  MessageComponent(ComponentType.TextInput, props)