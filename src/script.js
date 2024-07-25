import { InputNumber } from "./components/Input/Input-number.js";
import { InputCheckbox } from "./components/Input/Input-checkbox.js";
import { ProgressSpinner } from "./components/Progress-spinner/Progress-spinner.js";

new InputCheckbox(document.querySelector("#hide"));
new InputCheckbox(document.querySelector("#animate"));
new InputNumber(document.querySelector("#value"));
new ProgressSpinner(document.querySelector(".progress-spinner"));
