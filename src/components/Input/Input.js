import { TypeGuards } from "../../utils/TypeGuards.js";

class CustomInputVanilla {
  /** @type {HTMLInputElement} */
  inputElement;

  /** @param {HTMLInputElement} inputElement */
  constructor(inputElement) {
    if (!TypeGuards.isValidElement(inputElement, HTMLInputElement)){
      throw new Error(TypeGuards.notValidElementErrorMessage + inputElement);
    }

    this.inputElement = inputElement;
  }
}

export { CustomInputVanilla };