class ProgressSpinner extends HTMLElement {
  static tag = "progress-spinner";

  constructor() {
    super();
  }

  controlledElement;
  elementDescription;
  #updateDescription = () => {
    this.elementDescription.textContent = `Loading on ${ this.value / this.maxRange * 100}%, ${this.isAnimated ? "animating" : "not animating" }, ${this.isHidden ? "hidden" : "visible"}`;
  };

  static #valueControlledByAttribute = "data-value-controlledby";
  static #valueCustomPropertyName = "--progress-spinner__value";
  static #maxValueCustomPropertyName = "--progress-spinner__max-value";

  static #animateControlledByAttribute = "data-animate-controlledby";
  static #animatedClassName = "progress__circle--animated";
  static #animateAttributeName = "isAnimated";
  isAnimated;

  static #hideClassName = "progress__circle--hidden";
  static #hideControlledByAttribute = "data-hide-controlledby";
  static #hideAttributeName = "isAnimated";
  isHidden;

  initElement() {
    this.controlledElement = this.shadowRoot.querySelector(".progress__circle");
    this.elementDescription = this.controlledElement.querySelector("#range-descripion");

    this.#setControlledProperties();
  }

  setValue(newValue) {
    this.value = newValue;
    this.setAttribute("value", newValue);
    this.controlledElement.style.setProperty(ProgressSpinner.#valueCustomPropertyName, Math.max(Math.min(this.maxRange, newValue), 0));
    this.#updateDescription();
  }

  setMaxValue(newValue) {
    this.setAttribute("max", newValue);
    this.maxRange = newValue;
    this.controlledElement.style.setProperty(ProgressSpinner.#maxValueCustomPropertyName, newValue);
  }

  setAnimate(newValue) {
    this.isAnimated = newValue;
    this.setAttribute(ProgressSpinner.#animateAttributeName, newValue);
    this.#setBooleanState(newValue, ProgressSpinner.#animatedClassName);
  }

  setHide(newValue) {
    this.isHidden = newValue;
    this.setAttribute(ProgressSpinner.#hideAttributeName, newValue);
    this.#setBooleanState(newValue, ProgressSpinner.#hideClassName);
  }

  #setBooleanState(isEnabled, className) {
    if (isEnabled) {
      this.controlledElement.classList.add(className);
    } else {
      this.controlledElement.classList.remove(className);
    }
  }

  setValueController = (valueControllerElement) => {
    const onControlledElementValueChange = () => {
      this.setValue(valueControllerElement.value);
    };

    this.setValue(valueControllerElement.value);

    valueControllerElement.addEventListener("change", onControlledElementValueChange);
  };

  setAnimateController = (animateControllerElement) => {
    this.#setControlledByBoolean(animateControllerElement, ProgressSpinner.#animatedClassName, ProgressSpinner.#animateAttributeName);
  };

  setHideController = (hideControllerElement) => {
    this.#setControlledByBoolean(hideControllerElement, ProgressSpinner.#hideClassName, ProgressSpinner.#hideAttributeName);
  };

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

  #setControlledProperties = () => {
    const valueControlledBySelector = this.getAttribute(ProgressSpinner.#valueControlledByAttribute);
    const animateControlSelector = this.getAttribute(ProgressSpinner.#animateControlledByAttribute);
    const hideControlSelector = this.getAttribute(ProgressSpinner.#hideControlledByAttribute);

    this.setMaxValue(
      this.getAttribute("max") || 100,
    );

    if (valueControlledBySelector) {
      const valueControl = document.querySelector(valueControlledBySelector);
      this.setValueController(valueControl);
    } else {
      const initialValue = this.getAttribute("value");
      this.setValue(initialValue ?? 0);
    }

    if (animateControlSelector) {
      const switchElement = document.querySelector(animateControlSelector);
      this.#setControlledByBoolean(switchElement, ProgressSpinner.#animatedClassName, "isAnimated");
    } else {
      this.setAnimate(this.getAttribute("animate") ?? false);
    }

    if (hideControlSelector) {
      const switchElement = document.querySelector(hideControlSelector);
      this.#setControlledByBoolean(switchElement, ProgressSpinner.#hideClassName, "isHidden");
    } else {
      this.setAnimate(this.getAttribute("hide") ?? false);
    }
  };

  connectedCallback() {
    this.initElement();
  }
}

export { ProgressSpinner };