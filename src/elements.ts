import type { ComponentProps, ComponentResult, JSXElement, PropsFromAPIType } from "./types"
import { ComponentType, type APIActionRowComponent, type APIBaseComponent, type APIButtonComponent, type APIChannelSelectComponent, type APICheckboxComponent, type APICheckboxGroupComponent, type APIComponentInActionRow, type APIComponentInContainer, type APIContainerComponent, type APIFileComponent, type APIFileUploadComponent, type APILabelComponent, type APIMediaGalleryComponent, type APIMentionableSelectComponent, type APIRadioGroupComponent, type APIRoleSelectComponent, type APISectionComponent, type APISeparatorComponent, type APIStringSelectComponent, type APITextDisplayComponent, type APITextInputComponent, type APIThumbnailComponent, type APIUserSelectComponent } from "discord-api-types/v10"

export function MessageComponent
<T extends APIBaseComponent<C>, C extends ComponentType, P extends Record<string,unknown> = PropsFromAPIType<T>>
(type: C, props: P): T 
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
export const Container = (props: ContainerProps): APIContainerComponent => 
  MessageComponent<APIContainerComponent, ComponentType.Container>(ComponentType.Container, props)

export type ActionRowProps = PropsFromAPIType<APIActionRowComponent<APIComponentInActionRow>>
export const ActionRow = (props: ActionRowProps): APIActionRowComponent<APIComponentInActionRow> => 
  MessageComponent<APIActionRowComponent<APIComponentInActionRow>, ComponentType.ActionRow>(ComponentType.ActionRow, props)

export type ButtonProps = PropsFromAPIType<APIButtonComponent>
export const Button = (props: ButtonProps): APIButtonComponent => 
  MessageComponent<APIButtonComponent, ComponentType.Button>(ComponentType.Button, props)

export type TextDisplayProps = PropsFromAPIType<APITextDisplayComponent>
export const TextDisplay = (props: TextDisplayProps): APITextDisplayComponent => 
  MessageComponent<APITextDisplayComponent, ComponentType.TextDisplay>(ComponentType.TextDisplay, props)

export type SectionProps = Omit<PropsFromAPIType<APISectionComponent>, "accessory"> & { accessory: JSXElement };
export const Section = (props: SectionProps): APISectionComponent => 
  MessageComponent<APISectionComponent, ComponentType.Section, SectionProps>(ComponentType.Section, props)

export type SeparatorProps = PropsFromAPIType<APISeparatorComponent>
export const Separator = (props: SeparatorProps): APISeparatorComponent => 
  MessageComponent<APISeparatorComponent, ComponentType.Separator>(ComponentType.Separator, props)

export type ThumbnailProps = PropsFromAPIType<APIThumbnailComponent>
export const Thumbnail = (props: ThumbnailProps): APIThumbnailComponent => 
  MessageComponent<APIThumbnailComponent, ComponentType.Thumbnail>(ComponentType.Thumbnail, props)

export type FileProps = PropsFromAPIType<APIFileComponent>
export const File = (props: FileProps): APIFileComponent => 
  MessageComponent<APIFileComponent, ComponentType.File>(ComponentType.File, props)

export type FileUploadProps = PropsFromAPIType<APIFileUploadComponent>
export const FileUpload = (props: FileUploadProps): APIFileUploadComponent => 
  MessageComponent<APIFileUploadComponent, ComponentType.FileUpload>(ComponentType.FileUpload, props)

export type MediaGalleryProps = PropsFromAPIType<APIMediaGalleryComponent>
export const MediaGallery = (props: MediaGalleryProps): APIMediaGalleryComponent => 
  MessageComponent<APIMediaGalleryComponent, ComponentType.MediaGallery>(ComponentType.MediaGallery, props)

export type CheckboxProps = PropsFromAPIType<APICheckboxComponent>
export const Checkbox = (props: CheckboxProps): APICheckboxComponent => 
  MessageComponent<APICheckboxComponent, ComponentType.Checkbox>(ComponentType.Checkbox, props)

export type CheckboxGroupProps = PropsFromAPIType<APICheckboxGroupComponent>
export const CheckboxGroup = (props: CheckboxGroupProps): APICheckboxGroupComponent => 
  MessageComponent<APICheckboxGroupComponent ,ComponentType.CheckboxGroup>(ComponentType.CheckboxGroup, props)

export type RadioGroupProps = PropsFromAPIType<APIRadioGroupComponent>
export const RadioGroup = (props: RadioGroupProps): APIRadioGroupComponent => 
  MessageComponent<APIRadioGroupComponent ,ComponentType.RadioGroup>(ComponentType.RadioGroup, props)


export type MentionableSelectProps = PropsFromAPIType<APIMentionableSelectComponent>
export const MentionableSelect = (props: MentionableSelectProps): APIMentionableSelectComponent => 
  MessageComponent<APIMentionableSelectComponent, ComponentType.MentionableSelect>(ComponentType.MentionableSelect, props)

export type UserSelectProps = PropsFromAPIType<APIUserSelectComponent>
export const UserSelect = (props: UserSelectProps): APIUserSelectComponent => 
  MessageComponent<APIUserSelectComponent, ComponentType.UserSelect>(ComponentType.UserSelect, props)

export type RoleSelectProps = PropsFromAPIType<APIRoleSelectComponent>
export const RoleSelect = (props: RoleSelectProps): APIRoleSelectComponent => 
  MessageComponent<APIRoleSelectComponent, ComponentType.RoleSelect>(ComponentType.RoleSelect, props)

export type ChannelSelectProps = PropsFromAPIType<APIChannelSelectComponent>
export const ChannelSelect = (props: ChannelSelectProps): APIChannelSelectComponent => 
  MessageComponent<APIChannelSelectComponent, ComponentType.ChannelSelect>(ComponentType.ChannelSelect, props)

export type StringSelectProps = PropsFromAPIType<APIStringSelectComponent>
export const StringSelect = (props: StringSelectProps): APIStringSelectComponent => 
  MessageComponent<APIStringSelectComponent, ComponentType.StringSelect>(ComponentType.StringSelect, props)

export type LabelProps = PropsFromAPIType<APILabelComponent>
export const Label = (props: LabelProps): APILabelComponent => 
  MessageComponent<APILabelComponent, ComponentType.Label>(ComponentType.Label, props)

export type TextInputProps = PropsFromAPIType<APITextInputComponent>
export const TextInput = (props: TextInputProps): APITextInputComponent => 
  MessageComponent<APITextInputComponent, ComponentType.TextInput>(ComponentType.TextInput, props)