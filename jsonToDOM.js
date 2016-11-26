function jsonToDOM(args) {
  return new Promise((resolve) => {
    const createElement = (tagName, attributes) => {
      let key;
      const element = document.createElement(tagName);

      for (key in attributes) {
        if (typeof attributes[key] === 'function') {
          element.addEventListener(key.replace(/^on/, ''), attributes[key], false);
        } else {
          element.setAttribute(key, attributes[key]);
        }
      }

      return element;
    };

    const generateDOM = (array) => {
      if (!Array.isArray(array)) {
        return document.createTextNode(array);
      }

      if (typeof array[0] === 'string' && array[1] && array[1].constructor === Object) {
        const element = createElement(array[0], array[1]);
        if (array[2] !== undefined) {
          const node = generateDOM(array[2]);
          element.appendChild(node);
        }
        return element;
      }

      const dom = document.createDocumentFragment();
      for (let i = 0, l = array.length; i < l; i++) {
        if (array[i] !== undefined) {
          const node = generateDOM(array[i]);
          dom.appendChild(node);
        }
      }
      return dom;
    };

    resolve(generateDOM(args));
  }, e => console.error(e));
}
