const template = (input, label) => `
  <link rel="stylesheet" href="/components/default-theme.css">
  <link rel="stylesheet" href="/components/control/style.css">
  <slot name="theme"></slot>
  <label class="controls__control">
    ${ input }
    <span class="control__label">${ label }</span>
  </label>
`;

export const generateInputNumberHtml = ({ label, value, min, max }) => {
  return template(
    `<input class="control__input control__input--number" type="number" value="${value}" min="${min}" max="${max}">`,
    label,
  );
};

export const generateInputCheckboxHtml = ({ label }) => {
  return template(
    '<input class="control__input control__input--checkbox" type="checkbox">',
    label,
  );
};