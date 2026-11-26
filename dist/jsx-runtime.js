export function Fragment(props) {
    return Array.isArray(props.children)
        ? props.children
        : props.children
            ? [props.children]
            : [];
}
export function jsx(type, props, key) {
    return type(props ?? {}, key);
}
export const jsxs = jsx;
//# sourceMappingURL=jsx-runtime.js.map