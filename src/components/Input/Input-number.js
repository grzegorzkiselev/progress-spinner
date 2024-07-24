import { TypeGuards } from "../../utils/TypeGuards.js";
import { CustomInputVanilla } from "./Input.js";

class InputNumberVanilla extends CustomInputVanilla {
  /** @type {string} Stores value attribute name */
  static #valueAttributeName = "value";

  /** @type {string} Stores minimum value attribute name */
  static #minValueAttributeName = "min";
  /** @type {number} Minimal value */
  min = 0;

  /** @type {string} Stores maximum value attribute name */
  static #maxValueAttributeName = "max";
  /** @type {number} Maximum value */
  max = 100;

  /** @param {number} newValue */
  set value(newValue) {
    this.inputElement.setAttribute(InputNumberVanilla.#valueAttributeName, String(newValue));
    this.inputElement.value = String(newValue);
  }

  get value() {
    return Number(this.inputElement.value);
  }

  /** @param {HTMLInputElement & {type: "number"}} inputNumberElement */
  constructor(inputNumberElement) {
    if (!TypeGuards.isInputOfTypeNumber(inputNumberElement)) {
      throw new Error(TypeGuards.notValidElementErrorMessage + inputNumberElement);
    }

    super(inputNumberElement);

    const definedMin = this.inputElement.getAttribute(InputNumberVanilla.#minValueAttributeName);
    definedMin && (this.min = Number(definedMin));

    const definedMax = this.inputElement.getAttribute(InputNumberVanilla.#maxValueAttributeName);
    definedMax && (this.max = Number(definedMax));

    const definedValue = this.inputElement.getAttribute(InputNumberVanilla.#valueAttributeName);
    definedValue && (this.value = Number(definedValue));

    this.inputElement.addEventListener("change", this.onChange);
  }

  onChange = () => {
    this.value = /[0-9]+/.test(this.inputElement.value)
      ? Math.min(Math.max(this.min, this.value), this.max)
      : this.min;
  };
}

export { InputNumberVanilla };