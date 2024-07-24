import { TypeGuards } from "../../utils/TypeGuards.js";
import { CustomInputVanilla } from "./Input.js";

class InputCheckboxVanilla extends CustomInputVanilla {

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

export { InputCheckboxVanilla };