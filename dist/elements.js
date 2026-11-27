import { ButtonStyle, ComponentType, TextInputStyle } from "discord-api-types/v10";
function combineStrings(children) {
    return children.reduce((result, item) => {
        const last = result[result.length - 1];
        if (typeof item === "string" && typeof last === "string") {
            result[result.length - 1] = last + item;
        }
        else {
            result.push(item);
        }
        return result;
    }, []);
}
function convertStrings(children) {
    return children.map(child => typeof child === "string" ? { type: 10, content: child } : child);
}
export function normalizeChildren(children) {
    if (children == null || typeof children === "boolean")
        return [];
    if (Array.isArray(children))
        return children.flatMap(normalizeChildren);
    return [children];
}
export function filterChildren(children, allowedTypes, shouldConvertStrings) {
    const normalized = combineStrings(normalizeChildren(children));
    if (!allowedTypes || !allowedTypes.length)
        return normalized;
    const filtered = normalized.filter(child => child && ((typeof child === "string" && allowedTypes.includes("string")) || (typeof child === "object" && allowedTypes.includes(child.type))));
    if (!shouldConvertStrings)
        return filtered;
    return convertStrings(filtered);
}
export function MessageComponent(type, props, childrenFilter) {
    let childrenProp = {};
    let restProps = props;
    if (!("children" in props))
        return { type, ...childrenProp, ...restProps };
    const { children, ...rest } = props;
    restProps = rest;
    // TODO: handle these special cases in thier components rather than the common handler
    if (type === ComponentType.TextDisplay) {
        const filtered = filterChildren(children, childrenFilter); // We know the result will be a string[] because of our requirements for TextDisplay
        childrenProp = { content: filtered[0] }; // We know that a string[] will come out of filterChildren with a single combined member
    }
    else if (type === ComponentType.Label) {
        const filtered = filterChildren(children, childrenFilter);
        childrenProp = { component: filtered[0] ?? null };
    }
    else {
        childrenProp = { components: filterChildren(children, childrenFilter, true) }; // convert bare text into text display components
    }
    return { type, ...restProps, ...childrenProp };
}
export function MessageObject(components) {
    if (typeof components === "string")
        components = [{ type: 10, content: components }];
    if (!Array.isArray(components))
        components = [components];
    const topLevelMessageTypes = [
        ComponentType.ActionRow,
        ComponentType.Container,
        ComponentType.File,
        ComponentType.MediaGallery,
        ComponentType.Section,
        ComponentType.Separator,
        ComponentType.TextDisplay
    ];
    const converted = convertStrings(combineStrings(components));
    return converted.filter(component => component && topLevelMessageTypes.includes(component.type));
}
export function ModalObject(custom_id, title, components) {
    if (typeof components === "string")
        components = [{ type: 10, content: components }];
    if (!Array.isArray(components))
        components = [components];
    const topLevelModalTypes = [
        ComponentType.ActionRow,
        ComponentType.Label,
        ComponentType.TextDisplay
    ];
    const converted = convertStrings(combineStrings(components));
    const modalComponents = converted.filter(component => component && topLevelModalTypes.includes(component.type));
    return { title, custom_id, components: modalComponents };
}
export const Container = (props) => MessageComponent(ComponentType.Container, props, [
    ComponentType.ActionRow,
    ComponentType.File,
    ComponentType.MediaGallery,
    ComponentType.Section,
    ComponentType.Separator,
    ComponentType.TextDisplay,
    "string"
]);
export const ActionRow = (props) => MessageComponent(ComponentType.ActionRow, props, [
    ComponentType.TextInput,
    ComponentType.Button,
    ComponentType.ChannelSelect,
    ComponentType.RoleSelect,
    ComponentType.UserSelect,
    ComponentType.MentionableSelect,
    ComponentType.StringSelect
]);
export const Button = (props) => MessageComponent(ComponentType.Button, props);
export const Thumbnail = (props) => MessageComponent(ComponentType.Thumbnail, props);
export const TextDisplay = (props) => MessageComponent(ComponentType.TextDisplay, props, ["string"]);
export const Section = (props) => MessageComponent(ComponentType.Section, props, [ComponentType.TextDisplay]);
export const Separator = (props) => MessageComponent(ComponentType.Separator, props);
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
export const Label = (props) => MessageComponent(ComponentType.Label, props, [
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
]);
export const TextInput = (props) => MessageComponent(ComponentType.TextInput, props);
// Shorthand/Convenience Elements
export const Text = TextDisplay; // Alias
export const PrimaryButton = (props) => Button({ ...props, style: ButtonStyle.Primary });
export const SecondaryButton = (props) => Button({ ...props, style: ButtonStyle.Secondary });
export const SuccessButton = (props) => Button({ ...props, style: ButtonStyle.Success });
export const DangerButton = (props) => Button({ ...props, style: ButtonStyle.Danger });
export const LinkButton = (props) => Button({ ...props, style: ButtonStyle.Link });
export const Link = LinkButton; // Alias
export const PremiumButton = (props) => Button({ ...props, style: ButtonStyle.Premium });
export const ButtonSection = (props) => {
    const { children, ...rest } = props;
    return Section({
        children,
        accessory: Button(rest)
    });
};
export const PrimaryButtonSection = (props) => ButtonSection({ ...props, style: ButtonStyle.Primary });
export const SecondaryButtonSection = (props) => ButtonSection({ ...props, style: ButtonStyle.Secondary });
export const SuccessButtonSection = (props) => ButtonSection({ ...props, style: ButtonStyle.Success });
export const DangerButtonSection = (props) => ButtonSection({ ...props, style: ButtonStyle.Danger });
export const LinkButtonSection = (props) => ButtonSection({ ...props, style: ButtonStyle.Link });
export const PremiumButtonSection = (props) => ButtonSection({ ...props, style: ButtonStyle.Premium });
export const ThumbnailSection = (props) => Section({
    children: props.children,
    accessory: Thumbnail(props)
});
export const ModalTextInput = (props) => Label({ ...props, children: TextInput({ ...props, style: TextInputStyle.Short }) });
export const ModalTextArea = (props) => Label({ ...props, children: TextInput({ ...props, style: TextInputStyle.Paragraph }) });
export const ModalCheckbox = (props) => Label({ ...props, children: Checkbox({ ...props }) });
export const ModalCheckboxGroup = (props) => Label({ ...props, children: CheckboxGroup({ ...props }) });
export const ModalRadioGroup = (props) => Label({ ...props, children: RadioGroup({ ...props }) });
export const ModalFileUpload = (props) => Label({ ...props, children: FileUpload({ ...props }) });
export const ModalRoleSelect = (props) => Label({ ...props, children: RoleSelect({ ...props }) });
export const ModalChannelSelect = (props) => Label({ ...props, children: ChannelSelect({ ...props }) });
export const ModalUserSelect = (props) => Label({ ...props, children: UserSelect({ ...props }) });
export const ModalMentionableSelect = (props) => Label({ ...props, children: MentionableSelect({ ...props }) });
export const ModalStringSelect = (props) => Label({ ...props, children: StringSelect({ ...props }) });
//# sourceMappingURL=elements.js.map