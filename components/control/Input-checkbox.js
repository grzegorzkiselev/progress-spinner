import { generateInputCheckboxHtml } from "./html-content.js";
import { CustomInput } from "./Input.js";

class InputCheckbox extends CustomInput {
  static tag = "input-checkbox";

  static #generateHtml(properties) {
    return generateInputCheckboxHtml(properties);
  }

  get checked() {
    return this.inputElement.checked;
  }

  constructor() {
    super();

    this.html = InputCheckbox.#generateHtml({
      label: this.getAttribute("label") || "Switch",
    });
  }
}

export { InputCheckbox };