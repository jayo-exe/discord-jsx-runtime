export function Fragment(props) {
    if (props.if === false)
        return [];
    return Array.isArray(props.children)
        ? props.children
        : props.children
            ? [props.children]
            : [];
}
export function jsx(type, props) {
    if (type === "br")
        return "\n";
    return type(props ?? {});
}
export const jsxs = jsx;
//# sourceMappingURL=jsx-runtime.js.map