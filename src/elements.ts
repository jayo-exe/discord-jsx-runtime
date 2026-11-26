import type { ComponentProps, ComponentResult, JSXElement, PropsFromAPIType } from "./types"
import { ButtonStyle, ComponentType, type APIActionRowComponent, type APIBaseComponent, type APIButtonComponent, type APIButtonComponentWithCustomId, type APIButtonComponentWithSKUId, type APIButtonComponentWithURL, type APIChannelSelectComponent, type APICheckboxComponent, type APICheckboxGroupComponent, type APIComponentInActionRow, type APIComponentInContainer, type APIContainerComponent, type APIFileComponent, type APIFileUploadComponent, type APILabelComponent, type APIMediaGalleryComponent, type APIMentionableSelectComponent, type APIMessageTopLevelComponent, type APIModalComponent, type APIModalInteractionResponse, type APIModalInteractionResponseCallbackComponent, type APIModalInteractionResponseCallbackData, type APIRadioGroupComponent, type APIRoleSelectComponent, type APISectionComponent, type APISeparatorComponent, type APIStringSelectComponent, type APITextDisplayComponent, type APITextInputComponent, type APIThumbnailComponent, type APIUserSelectComponent } from "discord-api-types/v10"

export function normalizeChildren(children: JSXElement | JSXElement[]): JSXElement[] {
  if (children == null || typeof children === "boolean") return []
  if (Array.isArray(children)) return children.flatMap(normalizeChildren)
  return [children]
}

export function filterChildren(children: JSXElement | JSXElement[], allowedTypes?: JSXElement["type"][]): JSXElement[] {
  const normalized = normalizeChildren(children!)
  if(!allowedTypes || !allowedTypes.length) return normalized
  return normalized.filter(child => allowedTypes.includes(child.type))
}

export function MessageComponent
<T extends APIBaseComponent<C>, C extends ComponentType, P extends Record<string,unknown> & {
    children?: JSXElement | JSXElement[]
} = PropsFromAPIType<T>>
(type: C, props: P, childrenFilter?: JSXElement["type"][]): T 
{
  let childrenProp: Record<string, unknown> = {}
  let restProps: Record<string, unknown> = props
  
  if(!("children" in props)) return {type, ...childrenProp, ...restProps} as T
  
  const {children, ...rest} = props
  restProps = rest
  childrenProp = typeof children === "string"
    ? type === ComponentType.TextDisplay
      ? { content: children } 
      : {components: [{type: 10, content: children}]}
    : { components: filterChildren(children!, childrenFilter) }
    
  return {type, ...restProps, ...childrenProp} as T
}

export function MessageObject(components: JSXElement | JSXElement[] | string,): APIMessageTopLevelComponent[] {
  if(typeof components === "string") components = [{type: 10, content: components}]
  if (!Array.isArray(components)) components = [components]
  const topLevelMessageTypes = [
    ComponentType.ActionRow,
    ComponentType.Container,
    ComponentType.File,
    ComponentType.MediaGallery,
    ComponentType.Section,
    ComponentType.Separator,
    ComponentType.TextDisplay
  ]
  return components.filter(component => topLevelMessageTypes.includes(component.type)) as APIMessageTopLevelComponent[]
}

export function ModalObject(custom_id: string, title: string, components: JSXElement | JSXElement[] | string,): APIModalInteractionResponseCallbackData {
  if(typeof components === "string") components = [{type: 10, content: components}]
  if (!Array.isArray(components)) components = [components]
  const topLevelModalTypes = [
    ComponentType.ActionRow,
    ComponentType.Label,
    ComponentType.TextDisplay
  ]
  const modalComponents = components.filter(component => topLevelModalTypes.includes(component.type)) as APIModalInteractionResponseCallbackComponent[]
  return {title, custom_id, components: modalComponents}
}

export type ContainerProps = PropsFromAPIType<APIContainerComponent>
export const Container = (props: ContainerProps): APIContainerComponent => 
  MessageComponent<APIContainerComponent, ComponentType.Container>(ComponentType.Container, props, [
    ComponentType.ActionRow,
    ComponentType.File,
    ComponentType.MediaGallery,
    ComponentType.Section,
    ComponentType.Separator,
    ComponentType.TextDisplay
  ])

export type ActionRowProps = PropsFromAPIType<APIActionRowComponent<APIComponentInActionRow>>
export const ActionRow = (props: ActionRowProps): APIActionRowComponent<APIComponentInActionRow> => 
  MessageComponent<APIActionRowComponent<APIComponentInActionRow>, ComponentType.ActionRow>(ComponentType.ActionRow, props, [
    ComponentType.TextInput,
    ComponentType.Button,
    ComponentType.ChannelSelect,
    ComponentType.RoleSelect,
    ComponentType.UserSelect,
    ComponentType.MentionableSelect,
    ComponentType.StringSelect
  ])

export type ButtonProps = PropsFromAPIType<APIButtonComponent> & {children?: string}
export const Button = (props: ButtonProps): APIButtonComponent => 
  MessageComponent<APIButtonComponent, ComponentType.Button>(ComponentType.Button, props)

export type ThumbnailProps = PropsFromAPIType<APIThumbnailComponent>
export const Thumbnail = (props: ThumbnailProps): APIThumbnailComponent => 
  MessageComponent<APIThumbnailComponent, ComponentType.Thumbnail>(ComponentType.Thumbnail, props)

export type TextDisplayProps = PropsFromAPIType<APITextDisplayComponent> & {children?: string, content?: string}
export const TextDisplay = (props: TextDisplayProps): APITextDisplayComponent => 
  MessageComponent<APITextDisplayComponent, ComponentType.TextDisplay>(ComponentType.TextDisplay, props)

export type SectionProps = Omit<PropsFromAPIType<APISectionComponent>, "accessory"> & { accessory: JSXElement }
export const Section = (props: SectionProps): APISectionComponent => 
  MessageComponent<APISectionComponent, ComponentType.Section, SectionProps>(ComponentType.Section, props, [ComponentType.TextDisplay])

export type SeparatorProps = PropsFromAPIType<APISeparatorComponent>
export const Separator = (props: SeparatorProps): APISeparatorComponent => 
  MessageComponent<APISeparatorComponent, ComponentType.Separator>(ComponentType.Separator, props)

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
  MessageComponent<APILabelComponent, ComponentType.Label>(ComponentType.Label, props, [
    ComponentType.TextInput,
    ComponentType.Checkbox,
    ComponentType.CheckboxGroup,
    ComponentType.RadioGroup,
    ComponentType.FileUpload,
    ComponentType.ChannelSelect,
    ComponentType.RoleSelect,
    ComponentType.UserSelect,
    ComponentType.MentionableSelect,
    ComponentType.StringSelect
  ])

  //APICheckboxComponent | APICheckboxGroupComponent | APIFileUploadComponent | APIRadioGroupComponent | APITextInputComponent

export type TextInputProps = PropsFromAPIType<APITextInputComponent>
export const TextInput = (props: TextInputProps): APITextInputComponent => 
  MessageComponent<APITextInputComponent, ComponentType.TextInput>(ComponentType.TextInput, props)

// Shorthand/Convenience Elements

export const Text = TextDisplay // Alias

export type InteractButtonProps = Omit<PropsFromAPIType<APIButtonComponentWithCustomId>, "style">
export const PrimaryButton = (props: InteractButtonProps) => Button({...props, style: ButtonStyle.Primary})
export const SecondaryButton = (props: InteractButtonProps) => Button({...props, style: ButtonStyle.Secondary})
export const SuccessButton = (props: InteractButtonProps) => Button({...props, style: ButtonStyle.Success})
export const DangerButton = (props: InteractButtonProps) => Button({...props, style: ButtonStyle.Danger})

export type LinkButtonProps = Omit<PropsFromAPIType<APIButtonComponentWithURL>, "style">
export const LinkButton = (props: LinkButtonProps) => Button({...props, style: ButtonStyle.Link})
export const Link = LinkButton // Alias

export type PremiumButtonProps = Omit<PropsFromAPIType<APIButtonComponentWithSKUId>, "style">
export const PremiumButton = (props: PremiumButtonProps) => Button({...props, style: ButtonStyle.Premium})

export type CompactSectionProps<T> = Omit<T, "children"> & {children?: JSXElement | JSXElement[]} 

export type ButtonSectionProps = CompactSectionProps<ButtonProps>
export const ButtonSection = (props: ButtonSectionProps) => {
  const {children, ...rest} = props

  return Section({
    children,
    accessory: Button(rest as ButtonProps)
  })
}

export type InteractButtonSectionProps = CompactSectionProps<InteractButtonProps>
export const PrimaryButtonSection = (props: InteractButtonSectionProps) => ButtonSection({...props, style: ButtonStyle.Primary})
export const SecondaryButtonSection = (props: InteractButtonSectionProps) => ButtonSection({...props, style: ButtonStyle.Secondary})
export const SuccessButtonSection = (props: InteractButtonSectionProps) => ButtonSection({...props, style: ButtonStyle.Success})
export const DangerButtonSection = (props: InteractButtonSectionProps) => ButtonSection({...props, style: ButtonStyle.Danger})

export type LinkButtonSectionProps = CompactSectionProps<LinkButtonProps>
export const LinkButtonSection = (props: LinkButtonSectionProps) => ButtonSection({...props, style: ButtonStyle.Link})

export type PremiumButtonSectionProps = CompactSectionProps<PremiumButtonProps>
export const PremiumButtonSection = (props: PremiumButtonSectionProps) => ButtonSection({...props, style: ButtonStyle.Premium})

export type ThumbnailSectionProps = CompactSectionProps<ThumbnailProps>
export const ThumbnailSection = (props: ThumbnailSectionProps) => Section({
  children: props.children,
  accessory: Thumbnail(props)
})