class TypeGuards {
  /** Checks if input’s type is number
   * @param {any} element
   * @param {any} type
   * @returns {element is type}
   */
  static isValidElement(element, type) {
    return (
      element instanceof type
    );
  }
  static notValidElementErrorMessage = "Type error with ";

  /** Utility method to create type guards for input elements
   * @param {any} element
   * @param {string} inputType
   * @returns {element is HTMLInputElement & {type: inputType} }
   */
  static #isInputOfType(element, inputType) {
    return (
      element instanceof HTMLInputElement
      && element.type === inputType
    );
  }

  /** Checks if input’s type is number
   * @param {any} element
   * @returns {element is HTMLInputElement & {type: "number"}}
   */
  static isInputOfTypeNumber(element) {
    return TypeGuards.#isInputOfType(element, "number");
  }
  /** Checks if input’s type is checkbox
   * @param {any} element
   * @returns {element is HTMLInputElement & {type: "checkbox"}}
   */
  static isInputOfTypeCheckbox(element) {
    return TypeGuards.#isInputOfType(element, "checkbox");
  }
}

export { TypeGuards };