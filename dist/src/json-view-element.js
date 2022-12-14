var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSONViewElement_instances, _JSONViewElement_renderRoot, _JSONViewElement_buildHTML, _JSONViewElement_buildNode;
const css = String.raw;
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css `
  :host {
    font-family: monospace;
  }
  details > * {
    padding-inline-start: 0.5rem;
  }
  details > details {
    padding-inline-start: 1rem;
  }
  details > summary {
    padding-inline-start: 0;
    display: inline-block;
    cursor: pointer;
  }
  summary::before {
    content: "+ ";
  }
  details[open] > summary::before {
    content: "- ";
  }
  details[open] > summary::after {
    content: ":";
  }
  .boolean {
    color: orange;
  }
  .string {
    color: red;
  }
  .number {
    color: hotpink;
  }
  .null {
    color: grey;
  }
`);
class JSONViewElement extends HTMLElement {
    constructor() {
        super(...arguments);
        _JSONViewElement_instances.add(this);
        _JSONViewElement_renderRoot.set(this, void 0);
    }
    get json() {
        var _a;
        const str = (_a = this.querySelector('script[type="application/json"]')) === null || _a === void 0 ? void 0 : _a.textContent;
        return JSON.parse(str || "");
    }
    get expanded() {
        return this.hasAttribute("expanded");
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _JSONViewElement_renderRoot, this.attachShadow({ mode: "open" }), "f");
        __classPrivateFieldGet(this, _JSONViewElement_renderRoot, "f").append(__classPrivateFieldGet(this, _JSONViewElement_instances, "m", _JSONViewElement_buildHTML).call(this));
        __classPrivateFieldGet(this, _JSONViewElement_renderRoot, "f").adoptedStyleSheets = [stylesheet];
    }
}
_JSONViewElement_renderRoot = new WeakMap(), _JSONViewElement_instances = new WeakSet(), _JSONViewElement_buildHTML = function _JSONViewElement_buildHTML() {
    const fragment = document.createDocumentFragment();
    try {
        for (const [key, value] of Object.entries(this.json)) {
            fragment.append(__classPrivateFieldGet(this, _JSONViewElement_instances, "m", _JSONViewElement_buildNode).call(this, key, value));
        }
    }
    catch (error) {
        const span = document.createElement("span");
        span.classList.add("error");
        span.textContent = error.message;
        return span;
    }
    return fragment;
}, _JSONViewElement_buildNode = function _JSONViewElement_buildNode(key, value) {
    const details = document.createElement("details");
    details.open = this.expanded;
    const summary = document.createElement("summary");
    summary.textContent = key;
    details.append(summary);
    if (value && Array.isArray(value)) {
        const span = document.createElement("span");
        span.textContent = "[]";
        details.append(span);
        for (const item of Object.entries(value)) {
            details.append(__classPrivateFieldGet(this, _JSONViewElement_instances, "m", _JSONViewElement_buildNode).call(this, ...item));
        }
    }
    else if (value && typeof value === "object") {
        const span = document.createElement("span");
        span.textContent = "{}";
        details.append(span);
        for (const item of Object.entries(value)) {
            details.append(__classPrivateFieldGet(this, _JSONViewElement_instances, "m", _JSONViewElement_buildNode).call(this, ...item));
        }
    }
    else if (typeof value === "string") {
        const span = document.createElement("span");
        span.classList.add(typeof value);
        span.textContent = `"${value}"`;
        details.append(span);
        details.open = true;
    }
    else if (!value ||
        typeof value === "boolean" ||
        typeof value === "number") {
        const span = document.createElement("span");
        span.classList.add(value === null ? "null" : typeof value);
        span.textContent = `${value}`;
        details.append(span);
        details.open = true;
    }
    return details;
};
export default JSONViewElement;
if (!window.customElements.get("json-view")) {
    window.JSONViewElement = JSONViewElement;
    window.customElements.define("json-view", JSONViewElement);
}
