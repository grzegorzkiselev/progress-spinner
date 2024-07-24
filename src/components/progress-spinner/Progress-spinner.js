import { TypeGuards } from "../../utils/TypeGuards.js";

class ProgressSpinnerVanilla {
  /** Element used as an entry point for setting attributes and classes.
   * @type {HTMLDivElement}
   */
  #controlledElement;

  /** Element used to store text for screen readers.
   * @type {SVGTextElement}
   */
  #componentDescription;

  /** Stores the selector for #componentDescription element
   * @type {string}
   */
  static #componentDescriptionSelector = "#progress-spinner__description";

  /** Updates #elementDescription content */
  #updateDescription = () => {
    this.#componentDescription.textContent = `Loading on ${ this.#value / this.#maxValue * 100}%, ${this.#isAnimated ? "animating" : "not animating" }, ${this.#isHidden ? "hidden" : "visible"}`;
  };

  /** Stores value controller attribute name @type {string} */
  static #valueControlledByAttribute = "value-controlledby";
  /** Used to store the callback for change listener on value controller */
  #valueControllerChangeCallback;
  /** Stores value css custom property name @type {string} */
  static #valueCustomPropertyName = "--progress-spinner__value";
  /** Stores max value css custom property name @type {string} */
  static #maxValueCustomPropertyName = "--progress-spinner__max-value";
  /** Stores value attribute name @type {string} */
  static #valueAttributeName = "value";
  /** Stores current value @type {number} @default 0 */
  #value = 0;
  get value() {
    return this.#value;
  }

  /** Stores value attribute name @type {string} */
  static #maxValueAttributeName = "max";
  /** Stores the maximum value @type {number} @default 100 */
  #maxValue = 100;
  get maxValue() {
    return this.#maxValue;
  }

  /** Stores animate controller attribute name @type {string} */
  static #animateControlledByAttribute = "animate-controlledby";
  /** Used to store the callback for change listener on animate controller */
  #isAnimatedControllerChangeCallback;
  /** Stores animate css custom property name @type {string} */
  static #animatedClassName = "progress-spinner--animated";
  /** Stores animate attribute name @type {string} */
  static #animateAttributeName = "isAnimated";
  /** Stores current animation state @type {boolean} @default false */
  #isAnimated = false;
  get isAnimated() {
    return this.#isAnimated;
  }

  /** Stores hide controller attribute name @type {string} */
  static #hideClassName = "progress-spinner--hidden";
  /** Used to store the callback for change listener on hide controller */
  #isHiddenControllerChangeCallback;
  /** Stores hide css custom property name @type {string} */
  static #hideControlledByAttribute = "hide-controlledby";
  /** Stores hide attribute name @type {string} */
  static #hideAttributeName = "isHidden";
  /** Stores current hide state @type {boolean} @default false */
  #isHidden = false;
  get isHidden() {
    return this.#isHidden;
  }

  /** @param {HTMLDivElement} controlledElement */
  constructor(controlledElement) {
    this.#controlledElement = controlledElement;

    if (!TypeGuards.isValidElement(this.#controlledElement, HTMLElement)) {
      throw new Error(TypeGuards.notValidElementErrorMessage + this.#controlledElement);
    }

    this.#componentDescription = this.#controlledElement.querySelector(ProgressSpinnerVanilla.#componentDescriptionSelector);

    if (!TypeGuards.isValidElement(this.#componentDescription, SVGTextElement)) {
      throw new Error(TypeGuards.notValidElementErrorMessage + this.#componentDescription);
    }

    this.#setControlledProperties();
  }

  /** Updates value @param {number} newValue */
  setValue(newValue) {
    this.#value = newValue;
    this.#controlledElement.setAttribute(ProgressSpinnerVanilla.#valueAttributeName, String(newValue));
    this.#controlledElement.style.setProperty(ProgressSpinnerVanilla.#valueCustomPropertyName, String(Math.max(Math.min(this.#maxValue, newValue), 0)));
    this.#updateDescription();
  }

  /** Updates max value @param {number} newValue */
  setMaxValue(newValue) {
    this.#controlledElement.setAttribute(ProgressSpinnerVanilla.#maxValueAttributeName, String(newValue));
    this.#controlledElement.style.setProperty(ProgressSpinnerVanilla.#maxValueCustomPropertyName, String(newValue));
    this.#maxValue = Number(newValue);
  }

  /** Updates animate state @param {boolean} newValue */
  setAnimate(newValue) {
    this.#isAnimated = newValue;
    this.#controlledElement.setAttribute(ProgressSpinnerVanilla.#animateAttributeName, String(newValue));
    this.#setBooleanState(newValue, ProgressSpinnerVanilla.#animatedClassName);
  }

  /** Updates hide state @param {boolean} newValue */
  setHide(newValue) {
    this.#isHidden = newValue;
    this.#controlledElement.setAttribute(ProgressSpinnerVanilla.#hideAttributeName, String(newValue));
    this.#setBooleanState(newValue, ProgressSpinnerVanilla.#hideClassName);
  }

  /** Adds class if true, remove if false
   * @param {boolean} isEnabled Target state
   * @param {string} className ClassName to toggle
   */
  #setBooleanState(isEnabled, className) {
    if (isEnabled) {
      this.#controlledElement.classList.add(className);
    } else {
      this.#controlledElement.classList.remove(className);
    }
  }

  /** Links existing input’s element value with value of the component
   * @param { HTMLInputElement & { type: "number" } } valueControllerElement
   * @example ```js
      const valueInput = document.querySelector("input-number");
      progressSpinner.setValueController(valueInput);
    ```
    or
    ```html
      <div class="progress-spinner" data-valuecontrolledby="<selector for controller>"
    ```
   */
  setValueController = (valueControllerElement) => {
    this.#valueControllerChangeCallback = () => {
      this.setValue(Number(valueControllerElement.value));
    };

    this.setValue(Number(valueControllerElement.value));

    valueControllerElement.addEventListener("change", this.#valueControllerChangeCallback);
  };

  removeValueController = (valueControllerElement) => {
    valueControllerElement.removeEventListener("change", this.#valueControllerChangeCallback);
    this.#valueControllerChangeCallback = null;
  };

  /** Links existing input’s element value with value of the component
   * @param { HTMLInputElement & { type: "checkbox" } } animateControllerElement
   * @example ```js
      const valueInput = document.querySelector(<selector for controller>);
      progressSpinner.setAnimateController(valueInput);
    ```
    or
    ```html
      <div class="progress-spinner" data-animatecontrolledby="<selector for controller>"
    ```
   */
  setAnimateController = (animateControllerElement) => {
    this.#setControlledByBoolean(animateControllerElement, ProgressSpinnerVanilla.#animatedClassName, ProgressSpinnerVanilla.#animateAttributeName);
  };

  removeAnimateController = (animateControllerElement) => {
    animateControllerElement.removeEventListener("change", this.#isAnimatedControllerChangeCallback);
    this.#isAnimatedControllerChangeCallback = null;
  };

  /** Links existing input’s element value with value of the component
   * @param { HTMLInputElement & { type: "checkbox" } } hideControllerElement
   * @example ```js
      const valueInput = document.querySelector(<selector for controller>);
      progressSpinner.setHideController(valueInput);
    ```
    or
    ```html
      <div class="progress-spinner" data-hidecontrolledby="<selector for controller>"
    ```
   */
  setHideController = (hideControllerElement) => {
    this.#setControlledByBoolean(hideControllerElement, ProgressSpinnerVanilla.#hideClassName, ProgressSpinnerVanilla.#hideAttributeName);
  };

  removeHideController = (hideControllerElement) => {
    hideControllerElement.removeEventListener("change", this.#isHiddenControllerChangeCallback);
    this.#isHiddenControllerChangeCallback = null;
  };

  /** Links existing checkbox element state with hide state of the component
   * @param { HTMLInputElement & { type: "checkbox" } } checkboxInputElement
   * @param { string } className ClassName to be controlled with setBooleanState
   * @param { string } property Property name to store last state
   */
  #setControlledByBoolean = (checkboxInputElement, className, property) => {
    const onChangeCallback = () => {
      this["#" + property] = checkboxInputElement.checked;
      this.#setBooleanState(checkboxInputElement.checked, className);
      this.#updateDescription();
    };

    property === ProgressSpinnerVanilla.#animateAttributeName
      ? (this.#isAnimatedControllerChangeCallback = onChangeCallback)
      : (this.#isHiddenControllerChangeCallback = onChangeCallback);

    checkboxInputElement.addEventListener("change", onChangeCallback);

    this.#setBooleanState(checkboxInputElement.checked, className);
    this.#updateDescription();
  };

  /** Links component to defined controllers or sets the default values */
  #setControlledProperties = () => {
    const valueControllerSelector = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#valueControlledByAttribute);
    const animateControllerSelector = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#animateControlledByAttribute);
    const hideControllerSelector = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#hideControlledByAttribute);

    const declaredMaxValue = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#maxValueAttributeName);
    if (declaredMaxValue) {
      this.setMaxValue(Number(declaredMaxValue));
    } else {
      this.setMaxValue(this.#maxValue);
    }


    if (valueControllerSelector) {
      const valueController = document.querySelector(valueControllerSelector);

      if (!TypeGuards.isInputOfTypeNumber(valueController)) {
        throw new Error(TypeGuards.notValidElementErrorMessage + valueController);
      }

      this.setValueController(valueController);
    } else {
      const declaredValue = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#valueAttributeName);
      declaredValue && this.setValue(Number(declaredValue));
    }

    if (animateControllerSelector) {
      const animateController = document.querySelector(animateControllerSelector);

      if (!TypeGuards.isInputOfTypeCheckbox(animateController)) {
        throw new Error(TypeGuards.notValidElementErrorMessage + animateController);
      }

      this.#setControlledByBoolean(animateController, ProgressSpinnerVanilla.#animatedClassName, ProgressSpinnerVanilla.#animateAttributeName);
    } else {
      const declaredAnimate = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#animateAttributeName);
      declaredAnimate && this.setAnimate(Boolean(declaredAnimate));
    }

    if (hideControllerSelector) {
      const hideController = document.querySelector(hideControllerSelector);

      if (!TypeGuards.isInputOfTypeCheckbox(hideController)) {
        throw new Error(TypeGuards.notValidElementErrorMessage + hideController);
      }

      this.#setControlledByBoolean(hideController, ProgressSpinnerVanilla.#hideClassName, ProgressSpinnerVanilla.#hideAttributeName);
    } else {
      const declaredHide = this.#controlledElement.getAttribute(ProgressSpinnerVanilla.#hideAttributeName);
      declaredHide && this.setAnimate(Boolean(declaredHide));
    }
  };
}

export { ProgressSpinnerVanilla };