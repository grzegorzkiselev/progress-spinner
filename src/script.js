import { InputNumberVanilla } from "./components/Input/Input-number.js";
import { InputCheckboxVanilla } from "./components/Input/Input-checkbox.js";
import { ProgressSpinnerVanilla } from "./components/progress-spinner/Progress-spinner.js";

new InputCheckboxVanilla(document.querySelector("#hide"));
new InputCheckboxVanilla(document.querySelector("#animate"));
new InputNumberVanilla(document.querySelector("#value"));
new ProgressSpinnerVanilla(document.querySelector(".progress-spinner"));