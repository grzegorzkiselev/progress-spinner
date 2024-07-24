import { CustomInput } from "./Input.js";

class InputNumber extends CustomInput {
  static tag = "input-number";
  min; max; initialValue; label;

  constructor() {
    super();
  }

  initElement() {
    super.initElement();

    this.min = this.getAttribute("min") ?? 0;
    this.max = this.getAttribute("max") ?? 100;
    this.initialValue = this.getAttribute("value") ?? 0;
    this.label = this.getAttribute("label") ?? "Value";
  }

  onChange = () => {
    this.inputElement.value = /[0-9]+/.test(this.inputElement.value)
      ? Math.min(Math.max(this.min, this.inputElement.value), this.max)
      : this.min;

    this.dispatchEvent(new Event("change"));
  };

  get value() {
    return this.inputElement.value;
  }
}

export { InputNumber };