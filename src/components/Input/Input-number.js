import { TypeGuards } from "../../utils/TypeGuards.js";
import { CustomInput } from "./Input.js";

class InputNumber extends CustomInput {
  /** @type {string} Stores value attribute name */
  static #valueAttributeName = "value";

  /** @type {string} Stores minimum value attribute name */
  static #minValueAttributeName = "min";
  /** Minimal value @type {number} @default 0 */
  min = 0;

  /** Stores maximum value attribute name @type {string} */
  static #maxValueAttributeName = "max";
  /** Maximum value @type {number} @default 100 */
  max = 100;

  /** @param {number} newValue */
  set value(newValue) {
    this.inputElement.setAttribute(InputNumber.#valueAttributeName, String(newValue));
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

    const definedMin = this.inputElement.getAttribute(InputNumber.#minValueAttributeName);
    definedMin && (this.min = Number(definedMin));

    const definedMax = this.inputElement.getAttribute(InputNumber.#maxValueAttributeName);
    definedMax && (this.max = Number(definedMax));

    const definedValue = this.inputElement.getAttribute(InputNumber.#valueAttributeName);
    definedValue && (this.value = Number(definedValue));

    this.inputElement.addEventListener("change", this.onChange);
  }

  onChange = () => {
    this.value = /[0-9]+/.test(this.inputElement.value)
      ? Math.min(Math.max(this.min, this.value), this.max)
      : this.min;
  };
}

export { InputNumber };
