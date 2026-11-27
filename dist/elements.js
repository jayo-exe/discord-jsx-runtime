import { ButtonStyle, ComponentType } from "discord-api-types/v10";
const isStringArray = (value) => Array.isArray(value) && value.every(item => typeof item === "string");
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
    const filtered = normalized.filter(child => (typeof child === "string" && allowedTypes.includes("string")) || (typeof child === "object" && allowedTypes.includes(child.type)));
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
    if (type === ComponentType.TextDisplay) {
        const filtered = filterChildren(children, childrenFilter); // We know the result will be a string[] because of our requirements for TextDisplay
        childrenProp = { content: filtered[0] }; // We know that a string[] will come out of filterChildren with a single combined member
    }
    else {
        childrenProp = { components: filterChildren(children, childrenFilter, true) };
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
    return components.filter(component => topLevelMessageTypes.includes(component.type));
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
    const modalComponents = components.filter(component => topLevelModalTypes.includes(component.type));
    return { title, custom_id, components: modalComponents };
}
export const Container = (props) => MessageComponent(ComponentType.Container, props, [
    ComponentType.ActionRow,
    ComponentType.File,
    ComponentType.MediaGallery,
    ComponentType.Section,
    ComponentType.Separator,
    ComponentType.TextDisplay
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
//# sourceMappingURL=elements.js.map