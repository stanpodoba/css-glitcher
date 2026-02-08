(() => {

  // Glitcher elements CSS selector name
  const elemSelector = ".glitcher";

  const customCss = {
    /**
     * Custom CSS styles
     * width: "100%",
     * height: auto,
     * maxWidth: 512px,
     * minHeight: 512px
     */
  };

  /**
   * Set `true` if you need to make images adaptive
   * or `false` to make fixed images sizes
   * based on size before applying the glitch effect
   */
  let adaptiveSizes = true;

  // Images animation delay
  let delay = {

    /**
     * Turn ON/OFF to calculate maximum amount of delay
     * equal amount of glitch elements
     */
    autoMax: false,

    // Maximum amount of delay for start animation
    max: 10,

    // Minimum amount of delay for start animation
    min: 1
  };

  window.addEventListener("load", () => {

    // Custom images selector
    init(elemSelector, customCss);
  });

  function init(imagesSelector, styles) {

    let glitchedElement;
    let index = 0;
    let $sourceImages;

    // Get all Glitcher blocks
    if (!imagesSelector) {
      return;
    }

    $sourceImages = document.querySelectorAll(imagesSelector);

    if (!$sourceImages || $sourceImages.length === 0) {
      return;
    }

    // Makes maximum amount of delay equal amount of glitch elements
    if (delay.autoMax) {
      delay.max = delay.min + $sourceImages.length - 1;
    }

    // Set CSS styles for Glitcher elements
    while (index < $sourceImages.length) {
      glitchedElement = imgToGlitch($sourceImages[index], index, styles);

      if (glitchedElement) {
        $sourceImages[index].replaceWith(glitchedElement);
      }

      index = index + 1;
    }
  }

  function imgToGlitch($image, index, styles) {

    let imageUrl;
    let newElement;
    let ratio;
    let imageSize = {
      height: 0,
      width: 0
    };

    if (!$image || !(index === 0 || index > 0)) {
      return;
    }

    // Get background url of current element
    imageUrl = getImageUrl($image);

    // If Glitch element hasn't background url - skips this element
    if (!imageUrl) {
      return;
    }

    // Get image size
    imageSize = {
      height: Math.round($image.offsetHeight),
      width: Math.round($image.offsetWidth)
    };

    newElement = document.createElement("DIV");

    // Replace image to Glitcher block
    if ($image.tagName !== "DIV") {
      newElement.classList.add("glitcher", "glitcher-item");
      newElement.classList.add("glitcher-item-" + index);

      newElement.style.backgroundImage = imageUrl;

      if (adaptiveSizes) {
        ratio = getAspectRatio(imageSize.width, imageSize.height);
        newElement.style.aspectRatio = ratio;
      } else {
        newElement.style.width = imageSize.width + "px";
        newElement.style.height = imageSize.height + "px";
      }
    }

    // Copy all CSS classes from source element, preserving added classes
    if ($image.classList && $image.classList.length) {
      $image.classList.forEach(function(c) { newElement.classList.add(c); });
    }

    applyStylesToElement(newElement, styles);

    return generateGlitcherParts(newElement, imageUrl);
  }

  function generateGlitcherParts(imgElement, imageUrl) {
    let frameElement;
    let picElement;
    let glitcherHtml;
    let j = 0;
    let k = 0;

    // Random animation delay in seconds
    let randomDelay = randomTime(delay.min, delay.max);

    // Generates needed html for Glitcher
    while (j < 10) {
      frameElement = document.createElement("DIV");
      frameElement.classList.add("frame");

      while (k < 2) {
        picElement = document.createElement("DIV");
        picElement.style.backgroundImage = imageUrl;
        picElement.style.animationDelay = randomDelay + "s";

        frameElement.append(picElement);

        k = k + 1;
      }

      k = 0;

      glitcherHtml = document.createElement("DIV");
      glitcherHtml.classList.add("part", "part_" + j);
      glitcherHtml.style.animationDelay = randomDelay + "s";

      glitcherHtml.append(frameElement);
      imgElement.append(glitcherHtml);

      j = j + 1;
    }

    return imgElement;
  }

  // Return DIV, IMG or PICTURE background URL
  function getImageUrl($obj) {
    let $img;
    let url;

    if ($obj.tagName === "DIV") {
      url = $obj.style.backgroundImage || window.getComputedStyle($obj).backgroundImage;
      if (url && url !== "none") {
        return url.replace(/"/g, "");
      }
    }

    if ($obj.tagName === "IMG") {
      url = $obj.getAttribute("src");
      if (url) {
        return "url(" + url + ")";
      }
    }

    if ($obj.tagName === "PICTURE") {
      $img = $obj.querySelector("img");
      if (!$img) {
        return;
      }
      url = $img.getAttribute("src");
      if (url) {
        return "url(" + url + ")";
      }
    }
  }

  // Apply all custom styles
  function applyStylesToElement(element, styles) {
    if (!styles) {
      return;
    }

    if (Array.isArray(styles)) {
      for (let i = 0; i < styles.length; i = i + 1) {
        element.style[i] = styles[i];
      }
      return;
    }

    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        try {
          element.style[key] = styles[key];
        } catch (e) {
          // ignore invalid style keys
        }
      }
    }
  }

  // Generates random number from 'min' to 'max'
  function randomTime(min, max) {
    if (!min || !max) {
      return 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Return aspect ratio of width and height
  function getAspectRatio(width, height) {
    if (!width || !height) {
      return "inherit";
    }
    return "1 / " + (height / width);
  }
})();