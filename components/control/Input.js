export class CustomInput extends HTMLElement {
  html; inputElement;

  constructor() {
    super();
  }

  onChange = () => {
    this.dispatchEvent(new Event("change"));
  };

  initElement() {
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");

    template.innerHTML = this.html;

    const generatedElement = template.content.cloneNode(true);

    this.inputElement = generatedElement.querySelector("input");
    this.inputElement.addEventListener("change", this.onChange);

    this.shadowRoot.append(
      generatedElement,
    );

    const themeOverride = this.shadowRoot.querySelector("[name='theme']")?.assignedNodes()[0];

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