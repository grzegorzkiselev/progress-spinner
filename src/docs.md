# Progress Spinner

It is a component to show current loading status in your app.

## Getting started

### HTML Api

Insert this tag into your page to get minimal working component.

```html
<div class="progress-spinner">
  <link rel="stylesheet" href="./components/Progress-spinner/style.css">
  <script type="module" src="./components/Progress-spinner/script.js" defer></script>
  <svg class="progress-spinner__arc"
    role="image"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    aria-describedby="progress-spinner__description"
  >
    <title>Loading state</title>
    <text id="progress-spinner__description" class="visually-hidden">Uninitialized</text>
    <circle cx="50%" cy="50%" r="50%" fill="none">
  </svg>
</div>
```

#### Declare default properties

You can easily set default properties right into html element using `value` and `max` attributes.
- The `value` is used to set initial progress.
- The `max` is used to set value, when arc will be closed.

```html
    <div 
      class="progress-spinner"
 +    value="50"
 +    max="200"
    >
      <link rel="stylesheet" href="./components/Progress-spinner/style.css">
      <script type="module" src="./components/p
      Progress-spinner/script.js" defer></script>
      <svg class="progress-spinner__arc"
        role="image"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-describedby="progress-spinner__description"
      >
        <title>Loading state</title>
        <text id="progress-spinner__description" class="visually-hidden">Uninitialized</text>
        <circle cx="50%" cy="50%" r="50%" fill="none">
      </svg>
    </div>
```

#### Link with existing inputs in HTML

You can link progress, animate and hide state with existing input elements. For this use `value-controlledby`, `animate-controlledby` and `hide-controlledby` respectively.

```html
    <div 
      class="progress-spinner"
      value="50"
      max="200"
 +    value-controlledby="<selector for the input with type of number>"
 +    animate-controlledby="<selector for the input with type of checkbox>"
 +    hide-controlledby="<selector for the input with type of checkbox>"
    >
      <link rel="stylesheet" href="./components/Progress-spinner/style.css">
      <script type="module" src="./components/Progress-spinner/script.js" defer></script>
      <svg class="progress-spinner__arc"
        role="image"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-describedby="progress-spinner__description"
      >
        <title>Loading state</title>
        <text id="progress-spinner__description" class="visually-hidden">Uninitialized</text>
        <circle cx="50%" cy="50%" r="50%" fill="none">
      </svg>
    </div>
```

#### Link with existing inputs in JS

You can link progress, animate and hide state with existing input elements. For this use `value-controlledby`, `animate-controlledby` and `hide-controlledby` respectively.

### JavaScript Api

If you want to get access to the component from JavaScript, you don’t need this import inside html.

```html
    <div class="progress-spinner">
      <link rel="stylesheet" href="./components/Progress-spinner/style.css">
 −    <script type="module" src="./components/Progress-spinner/script.js" defer></script>
      <svg class="progress-spinner__arc"
        role="image"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-describedby="progress-spinner__description"
      >
        <title>Loading state</title>
        <text id="progress-spinner__description" class="visually-hidden">Uninitialized</text>
        <circle cx="50%" cy="50%" r="50%" fill="none">
      </svg>
    </div>
```

```js
 +  import { ProgressInput } from "./components/control/Input-checkbox.js";
 +  const progressInput = new ProgressInput(document.querySelector(".progress-spinner"));
```

#### Update properties directly

To set value, animate or hide, use `setValue`, `setAnimate` and `setHide` respectively.

```js
    import { ProgressInput } from "./components/control/Input-checkbox.js";
    const progressInput = new ProgressInput(document.querySelector(".progress-spinner"));

 +  progressInput.setValue(20);
 +  progressInput.setAnimate(true);
 +  progressInput.setHide(true);
```

#### Link properties with existing elements

Just like we declared controllers inside html, we can attach them from JavaScript.

```js
    import { ProgressInput } from "./components/control/Input-checkbox.js";
    const progressInput = new ProgressInput(document.querySelector(".progress-spinner"));

 −  progressInput.setValue(20);
 −  progressInput.setAnimate(true);
 −  progressInput.setHide(true);

 +  progressInput.setValueController(<selector for the input with type of number>);
 +  progressInput.setAnimateController(<selector for the input with type of checkbox>);
 +  progressInput.setHideController(<selector for the input with type of checkbox>);
```

To detach them, use `remove*` methods.

```js
    import { ProgressInput } from "./components/control/Input-checkbox.js";
    const progressInput = new ProgressInput(document.querySelector(".progress-spinner"));

    progressInput.setValueController(<selector for the input with type of number>);
    progressInput.setAnimateController(<selector for the input with type of checkbox>);
    progressInput.setHideController(<selector for the input with type of checkbox>);

 +  progressInput.removeValueController(<selector for the input with type of number>);
 +  progressInput.removeAnimateController(<selector for the input with type of checkbox>);
 +  progressInput.removeHideController(<selector for the input with type of checkbox>);
```
