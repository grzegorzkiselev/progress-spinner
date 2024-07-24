import { CustomInput } from "./Input.js";

class InputCheckbox extends CustomInput {
  static tag = "input-checkbox";

  constructor() {
    super();
  }

  get checked() {
    return this.inputElement.checked;
  }
}

export { InputCheckbox };