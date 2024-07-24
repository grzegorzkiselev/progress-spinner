import { ProgressSpinner } from "./components/progress-spinner/Progress-spinner.js";
import { InputNumber } from "./components/control/Input-number.js";
import { InputCheckbox } from "./components/control/Input-checkbox.js";
import { ControlsStack } from "./components/controls-stack/Controls-stack.js";

/** The order is matter! */
customElements.define(InputNumber.tag, InputNumber);
customElements.define(InputCheckbox.tag, InputCheckbox);

customElements.define(ControlsStack.tag, ControlsStack);

/** Progress spinner is depending on inputs, so it defined the last */
customElements.define(ProgressSpinner.tag, ProgressSpinner);