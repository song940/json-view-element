declare class JSONViewElement extends HTMLElement {
    #private;
    get json(): any;
    get expanded(): boolean;
    connectedCallback(): void;
}
declare global {
    interface Window {
        JSONViewElement: typeof JSONViewElement;
    }
}
export default JSONViewElement;
