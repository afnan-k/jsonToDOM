function createElement(tagName, attributes) {
  const element = document.createElement(tagName);
  for (const key in attributes) {
    if (typeof attributes[key] === 'function') {
      element.addEventListener(key.replace(/^on/, ''), attributes[key], false);
    } else if (attributes[key] !== false) {
      element.setAttribute(key, attributes[key]);
    }
  }
  return element;
}

function jsonToDOM(array) {
  if (!Array.isArray(array)) {
    return document.createTextNode(array);
  }

  if (typeof array[0] === 'string' && array[1] && array[1].constructor === Object) {
    const element = createElement(array[0], array[1]);
    if (array[2] !== undefined) {
      const node = jsonToDOM(array[2]);
      element.appendChild(node);
    }
    return element;
  }

  const dom = document.createDocumentFragment();
  for (let i = 0, l = array.length; i < l; i++) {
    if (array[i] !== undefined) {
      const node = jsonToDOM(array[i]);
      dom.appendChild(node);
    }
  }
  return dom;
}
