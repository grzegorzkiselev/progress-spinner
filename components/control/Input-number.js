import { generateInputNumberHtml } from "./html-content.js";
import { CustomInput } from "./Input.js";

class InputNumber extends CustomInput {
  static tag = "input-number";
  min; max;

  static #generateHtml(properties) {
    return generateInputNumberHtml(properties);
  }

  get value() {
    return this.inputElement.value;
  }

  constructor() {
    super();

    this.min = this.getAttribute("min") ?? 0;
    this.max = this.getAttribute("max") ?? 100;

    this.initialValue = this.getAttribute("value") ?? 0;
    this.label = this.getAttribute("label") ?? "Value";

    this.html = InputNumber.#generateHtml({
      label: this.label,
      min: this.min,
      max: this.max,
      value: this.initialValue,
    });
  }

  onChange = () => {
    this.inputElement.value = /[0-9]+/.test(this.inputElement.value)
      ? Math.min(Math.max(this.min, this.inputElement.value), this.max)
      : this.min;

    this.setAttribute("value", String(this.inputElement.value));

    this.dispatchEvent(new Event("change"));
  };
}

export { InputNumber };