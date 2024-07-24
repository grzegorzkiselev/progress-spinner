export const progressSpinnerHtml = `
<link rel="stylesheet" href="/components/default-theme.css">
<link rel="stylesheet" href="/components/progress-spinner/style.css">
<slot name="theme"></slot>
<div class="progress__circle">
  <svg class="progress__range"
    role="image"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    aria-describedby="range-descripion"
  >
    <title>Loading state</title>
    <text id="range-descripion" class="visually-hidden">Loading on %</text>
    <circle cx="50%" cy="50%" r="50%" fill="none">
  </svg>
</div>
`;