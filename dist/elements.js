import { ComponentType } from "discord-api-types/v10";
export function MessageComponent(type, props) {
    let finalProps;
    if ("children" in props) {
        const { children, ...rest } = props;
        finalProps = { components: children, ...rest };
    }
    else {
        finalProps = { ...props };
    }
    return { type, ...finalProps };
}
export const Container = (props) => MessageComponent(ComponentType.Container, props);
export const ActionRow = (props) => MessageComponent(ComponentType.ActionRow, props);
export const Button = (props) => MessageComponent(ComponentType.Button, props);
export const TextDisplay = (props) => MessageComponent(ComponentType.TextDisplay, props);
export const Section = (props) => MessageComponent(ComponentType.Section, props);
export const Separator = (props) => MessageComponent(ComponentType.Separator, props);
export const Thumbnail = (props) => MessageComponent(ComponentType.Thumbnail, props);
export const File = (props) => MessageComponent(ComponentType.File, props);
export const FileUpload = (props) => MessageComponent(ComponentType.FileUpload, props);
export const MediaGallery = (props) => MessageComponent(ComponentType.MediaGallery, props);
export const Checkbox = (props) => MessageComponent(ComponentType.Checkbox, props);
export const CheckboxGroup = (props) => MessageComponent(ComponentType.CheckboxGroup, props);
export const RadioGroup = (props) => MessageComponent(ComponentType.RadioGroup, props);
export const MentionableSelect = (props) => MessageComponent(ComponentType.MentionableSelect, props);
export const UserSelect = (props) => MessageComponent(ComponentType.UserSelect, props);
export const RoleSelect = (props) => MessageComponent(ComponentType.RoleSelect, props);
export const ChannelSelect = (props) => MessageComponent(ComponentType.ChannelSelect, props);
export const StringSelect = (props) => MessageComponent(ComponentType.StringSelect, props);
export const Label = (props) => MessageComponent(ComponentType.Label, props);
export const TextInput = (props) => MessageComponent(ComponentType.TextInput, props);
//# sourceMappingURL=elements.js.map