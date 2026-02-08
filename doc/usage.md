# Installation

- [1. Copy files into your website](#1-copy-files-into-your-website)
- [2. Include the files in your web pages](#2-include-the-files-in-your-web-pages)
- [3. Initialization](#3-initialization)
    - [Add the `glitcher` CSS class](#add-the-glitcher-css-class)
    - [Use your own selector](#use-your-own-selector)
- [4. Script parameters (optional)](#4-script-parameters-optional)
    - [`adaptiveSizes`](#adaptivesizes)
    - [`delay`](#delay)
        - [`autoMax`](#automax)
        - [`max`](#max)
        - [`min`](#min)

## 1. Copy files into your website

Copy the files from the `/dist` directory into your website. Make sure you know the correct URLs to access these files.

## 2. Include the files in your web pages

Insert the following code **before the closing `</head>` tag**, using the correct paths from the previous step:

```html
<script src="assets/js/glitcher.js"></script>
<link rel="stylesheet" href="assets/css/glitcher.css">
```

> Make sure the file paths match your project structure.

## 3. Initialisation

There are two ways to initialize the script:

1. Add the `glitcher` CSS class to `<img>`, `<div>` or `<picture>` elements.
2. Use your own CSS selector to target elements.

### Way 1. Add the `glitcher` CSS class

Add the `glitcher` class to any `<img>`, `<div>` or `<picture>` element you want to apply the effect to.

If you use a `<div>`, make sure it has a background image defined via the `background-image` CSS property (inline or in a stylesheet).

Examples:

```html
<img class="glitcher" src="image.jpg">
```
or

```html
<picture class="glitcher">
    <source media="all" srcset="image.jpg, image@2x.jpg 2x">
    <img src="image.jpg" alt="" title="">
</picture>
```

or

```html
<div class="glitcher" style="background-image: url('image.jpg')"></div>
```

or

```css
.div_with_glitcher_class {
    background-image: url('image.jpg');
}
```

### Way 2. Use your own selector

You can use a custom CSS selector instead of the default `.glitcher` class.
This requires basic knowledge of CSS selectors.

1. Open the `glitcher.js` file and find the following code:

  ```javascript
  // Custom images selector
  init(".glitcher", {
    /**
     * Custom CSS styles
     * width: "100%",
     * height: auto,
     * maxWidth: 512px,
     * minHeight: 512px
     */
  });
  ```

`.glitcher` is the selector you can replace with your own.
You can also initialize multiple selectors for different image groups.

  ```javascript
  // Custom images selector
  init("#header-full-screen-image", {
    /**
     * Custom CSS styles
     */
  });

  init(".sport-price-card img", {
    /**
     * Custom CSS styles
     */
  });
  ```
2. Replace `.glitcher` with your own CSS selector.
3. You may need to add additional styles for transformed elements. This can be done inside the Custom CSS styles object.

  ```javascript
  // Custom images selector
  init("#header-full-screen-image", {
    /* Custom CSS styles */
    width: "100%",
    height: 95vh,
    minHeight: 512px
  });

  init(".sport-price-card img", {
    /* Custom CSS styles */
    width: "100%",
    height: auto,
    aspectRatio: 1.62 / 1
  });
  ```

### ⚠️ Important note about custom selectors and CSS

When you use a custom CSS selector instead of the default `.glitcher`, you must also update the selector in the CSS file (`glitcher.css`), because the styles are bound to the `.glitcher` class by default.

You have two options:

1. **Update the selector in CSS**

Replace `.glitcher` with your custom selector in `glitcher.scss` and [rebuild](build.md) the project.

```html
/* Default */
.glitcher {
  /* styles */
}

/* Custom selector example */
#header-full-screen-image {
  /* styles */
}
```

2. **Keep the `.glitcher` class (recommended)**

To avoid changing the CSS file, you can keep the glitcher class on the element and use your custom selector only in JavaScript.

```html
<img
  id="header-full-screen-image"
  class="glitcher"
  src="image.jpg"
>
```

```javascript
init("#header-full-screen-image", {
  /* custom options */
});
```

This approach allows you to:
- Use custom selectors in JavaScript
- Keep default styles untouched
- Avoid maintaining a modified CSS file

✅ Recommended for most cases

For more available style properties, see: https://www.w3schools.com/jsref/dom_obj_style.asp

## 4. Script parameters (optional)

The script provides several optional parameters that allow you to fine-tune the animation behavior.

### `adaptiveSizes`

Enables (true) or disables (false) adaptive image sizing.
- When enabled, the final image keeps the original aspect ratio and adapts to the container.
- When disabled, the image uses fixed width and height based on the original element.

### `delay`

Controls the animation start delay. Each glitch element receives a random delay within the specified range.

#### `autoMax`

Automatically calculates the maximum delay based on the number of glitch elements.

- `true` — adaptive maximum delay
- `false` — use a fixed `max` value

#### `max`

Maximum delay (in seconds) before the animation starts.

#### `min`

Minimum delay (in seconds) before the animation starts.
