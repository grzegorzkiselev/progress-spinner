export class CustomInput extends HTMLElement {
  inputElement;
  constructor() {
    super();
  }

  initElement() {
    this.inputElement = this.shadowRoot.querySelector("input");
    this.inputElement.addEventListener("change", this.onChange);
  }

  connectedCallback() {
    this.initElement();
  }

  onChange = () => {
    this.dispatchEvent(new Event("change"));
  };
}