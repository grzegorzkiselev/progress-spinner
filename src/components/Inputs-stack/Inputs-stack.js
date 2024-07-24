import { controlsStackHtml } from "./html-content.js";

class ControlsStack extends HTMLElement {
  static tag = "controls-stack";

  static #generateHtml() {
    return controlsStackHtml;
  }

  constructor() {
    super();
  }

  initElement() {
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = ControlsStack.#generateHtml();

    const generatedElement = template.content.cloneNode(true);

    this.shadowRoot.appendChild(
      generatedElement,
    );

    const themeOverride = this.shadowRoot.querySelector("[name='theme']").assignedNodes()[0];

    if (themeOverride) {
      this.shadowRoot.append(
        themeOverride,
      );
    }
  }

  connectedCallback() {
    this.initElement();
  }
}

export { ControlsStack };