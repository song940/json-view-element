declare class TreeViewElement extends HTMLElement {
    connectedCallback(): void;
}
declare global {
    interface Window {
        TreeViewElement: typeof TreeViewElement;
    }
}
export default TreeViewElement;
