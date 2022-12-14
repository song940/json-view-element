class TreeViewElement extends HTMLElement {
    connectedCallback() {
        document.write(``);
    }
}
export default TreeViewElement;
if (!window.customElements.get("tree-view")) {
    window.TreeViewElement = TreeViewElement;
    window.customElements.define("tree-view", TreeViewElement);
}
