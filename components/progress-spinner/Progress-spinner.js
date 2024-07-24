import { InputCheckbox } from "../control/Input-checkbox.js";
import { InputNumber } from "../control/Input-number.js";
import { progressSpinnerHtml } from "./html-content.js";

/**
 * Represents a progress-spinner
 * @class
 */
class ProgressSpinner extends HTMLElement {
  /** Used to specify a custom element tag @type {string} */
  static tag = "progress-spinner";

  /** @returns {string}  Inner html created by predefined template */
  static #generateHtml() {
    return progressSpinnerHtml;
  }

  constructor() {
    super();
  }

  /** Element used as entry point to set attributes and classes @type {HTMLDivElement} */
  #controlledElement;
  /** Element used to store text for screenreaders @type {SVGTextElement} */
  #elementDescription;
  /** Updates #elementDescription content @returns {void} */
  #updateDescription = () => {
    this.#elementDescription.textContent = `Loading on ${ this.value / this.maxValue * 100}%, ${this.isAnimated ? "animating" : "not animating" }, ${this.isHidden ? "hidden" : "visible"}`;
  };

  /** Stores value controller attribute name @type {string} */
  static #valueControlledByAttribute = "data-value-controlledby";
  /** Stores value css custom property name @type {string} */
  static #valueCustomPropertyName = "--progress-spinner__value";
  /** Stores max value css custom property name @type {string} */
  static #maxValueCustomPropertyName = "--progress-spinner__max-value";
  /** Stores value attribute name @type {string} */
  static #valueAttributeName = "value";
  /** Stores current value @type {number} */
  value;
  /** Stores the maximum value @type {number} */
  maxValue;

  /** Stores animate controller attribute name @type {string} */
  static #animateControlledByAttribute = "data-animate-controlledby";
  /** Stores animate css custom property name @type {string} */
  static #animatedClassName = "progress__circle--animated";
  /** Stores animate attribute name @type {string} */
  static #animateAttributeName = "isAnimated";
  /** Stores current animation state @type {boolean} */
  isAnimated;

  /** Stores hide controller attribute name @type {string} */
  static #hideClassName = "progress__circle--hidden";
  /** Stores hide css custom property name @type {string} */
  static #hideControlledByAttribute = "data-hide-controlledby";
  /** Stores hide attribute name @type {string} */
  static #hideAttributeName = "isAnimated";
  /** Stores current hide state @type {boolean} */
  isHidden;

  /** Checks if input’s type is number
   * @param {any} element
   * @returns {element is HTMLInputElement & {type: "number"}}
   */
  static #ifInputNumber(element) {
    return (
      element instanceof HTMLInputElement && element.type === "number"
      || element instanceof InputNumber
    );
  }
  static #numberTypeErrorMessage = "You can link value only with inputs of type number";

  /** Checks if input’s type is checkbox
   * @param {any} element
   * @returns {element is HTMLInputElement & {type: "checkbox"}}
   */
  static #ifInputCheckbox(element) {
    return (
      element instanceof HTMLInputElement && element.type === "checkbox"
      || element instanceof InputCheckbox
    );
  }
  static #booleanTypeErrorMessage = "You can link boolean value only with the inputs of type checkbox";

  /** Initialize element callback called when element connected @returns {void} */
  #initElement() {
    this.attachShadow({ mode: "open" });

    /** @type {ShadowRoot} */
    this.shadowRoot;

    const template = document.createElement("template");
    template.innerHTML = ProgressSpinner.#generateHtml();

    const generatedElement = /** @type {HTMLElement} */(template.content.cloneNode(true));
    this.#controlledElement = /** @type {HTMLDivElement} */(generatedElement.querySelector(".progress__circle"));
    this.#elementDescription = /** @type {SVGTextElement} */(this.#controlledElement.querySelector("#range-descripion"));

    this.#setControlledProperties();

    this.shadowRoot.appendChild(
      generatedElement,
    );

    const themeOverride = /** @type {HTMLSlotElement} */(this.shadowRoot.querySelector("[name='theme']"))?.assignedNodes()[0];

    themeOverride && this.shadowRoot.append(
      themeOverride,
    );
  }

  /** Updates value @param {number} newValue @returns {void} */
  setValue(newValue) {
    this.value = newValue;
    this.setAttribute(ProgressSpinner.#valueAttributeName, String(newValue));
    this.#controlledElement.style.setProperty(ProgressSpinner.#valueCustomPropertyName, String(Math.max(Math.min(this.maxValue, newValue), 0)));
    this.#updateDescription();
  }

  /** Updates max value @param {number} newValue @returns {void} */
  setMaxValue(newValue) {
    this.setAttribute("max", String(newValue));
    this.#controlledElement.style.setProperty(ProgressSpinner.#maxValueCustomPropertyName, String(newValue));
    this.maxValue = Number(newValue);
  }

  /** Updates animate state @param {boolean} newValue @returns {void} */
  setAnimate(newValue) {
    this.isAnimated = newValue;
    this.setAttribute(ProgressSpinner.#animateAttributeName, String(newValue));
    this.#setBooleanState(newValue, ProgressSpinner.#animatedClassName);
  }

  /** Updates hide state @param {boolean} newValue @returns {void} */
  setHide(newValue) {
    this.isHidden = newValue;
    this.setAttribute(ProgressSpinner.#hideAttributeName, String(newValue));
    this.#setBooleanState(newValue, ProgressSpinner.#hideClassName);
  }

  /** Adds class if true, remove if false
   * @param {boolean} isEnabled Target state
   * @param {string} className ClassName to toggle
   * @returns {void} */
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
   */
  setValueController = (valueControllerElement) => {
    const onControlledElementValueChange = () => {
      this.setValue(Number(valueControllerElement.value));
    };

    this.setValue(Number(valueControllerElement.value));

    valueControllerElement.addEventListener("change", onControlledElementValueChange);
  };

  /** Links existing checkbox element state with animate state of the component
   * @param { HTMLInputElement & { type: "checkbox" } } animateControllerElement
   * @example ```js
      const switchInput = document.querySelector("input-checkbox");
      progressSpinner.setValueController(switchInput);
    ```
   */
  setAnimateController = (animateControllerElement) => {
    this.#setControlledByBoolean(animateControllerElement, ProgressSpinner.#animatedClassName, ProgressSpinner.#animateAttributeName);
  };

  /** Links existing checkbox element state with hide state of the component
   * @param { HTMLInputElement & { type: "checkbox" } } hideControllerElement
   */
  setHideController = (hideControllerElement) => {
    this.#setControlledByBoolean(hideControllerElement, ProgressSpinner.#hideClassName, ProgressSpinner.#hideAttributeName);
  };

  /** Links existing checkbox element state with hide state of the component
   * @param { HTMLInputElement & { type: "checkbox" } } switchElement
   * @param { string } className ClassName to be controlled with setBooleanState
   * @param { string } property Property name to store last state
   */
  #setControlledByBoolean = (switchElement, className, property) => {
    const onControlledElementValueChange = () => {
      this[property] = switchElement.checked;
      this.#setBooleanState(switchElement.checked, className);
      this.#updateDescription();
    };

    switchElement.addEventListener("change", onControlledElementValueChange);

    this.#setBooleanState(switchElement.checked, className);
    this.#updateDescription();
  };

  /** Links component to defined controllers of sets the default values @returns {void} */
  #setControlledProperties = () => {
    const valueControlledBySelector = this.getAttribute(ProgressSpinner.#valueControlledByAttribute);
    const animateControlSelector = this.getAttribute(ProgressSpinner.#animateControlledByAttribute);
    const hideControlSelector = this.getAttribute(ProgressSpinner.#hideControlledByAttribute);

    this.setMaxValue(
      Number(this.getAttribute("max")) || 100,
    );

    if (valueControlledBySelector) {
      const valueControl = document.querySelector(valueControlledBySelector);

      if (!ProgressSpinner.#ifInputNumber(valueControl)) {
        throw new Error(ProgressSpinner.#numberTypeErrorMessage);
      }

      this.setValueController(valueControl);
    } else {
      const initialValue = this.getAttribute(ProgressSpinner.#valueAttributeName);
      this.setValue(Number(initialValue));
    }

    if (animateControlSelector) {
      const switchElement = document.querySelector(animateControlSelector);

      if (!ProgressSpinner.#ifInputCheckbox(switchElement)) {
        throw new Error(ProgressSpinner.#booleanTypeErrorMessage);
      }

      this.#setControlledByBoolean(switchElement, ProgressSpinner.#animatedClassName, ProgressSpinner.#animateAttributeName);
    } else {
      this.setAnimate(Boolean(this.getAttribute(ProgressSpinner.#animateAttributeName)));
    }

    if (hideControlSelector) {
      const switchElement = document.querySelector(hideControlSelector);

      if (!ProgressSpinner.#ifInputCheckbox(switchElement)) {
        throw new Error(ProgressSpinner.#booleanTypeErrorMessage);
      }

      this.#setControlledByBoolean(switchElement, ProgressSpinner.#hideClassName, ProgressSpinner.#hideAttributeName);
    } else {
      this.setAnimate(Boolean(this.getAttribute("hide")));
    }
  };

  connectedCallback() {
    this.#initElement();
  }
}

export { ProgressSpinner };