import { TypeGuards } from "../../utils/TypeGuards.js";
import { CustomInput } from "./Input.js";

class InputCheckbox extends CustomInput {

  get checked() {
    return this.inputElement.checked;
  }

  /** @param { HTMLInputElement & {type: "checkbox"} } inputCheckboxElement */
  constructor(inputCheckboxElement) {
    if (!TypeGuards.isInputOfTypeCheckbox(inputCheckboxElement)) {
      throw new Error(TypeGuards.notValidElementErrorMessage + inputCheckboxElement);
    }

    super(inputCheckboxElement);
  }
}

export { InputCheckbox };
