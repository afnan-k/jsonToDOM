function jsonToDOM(array) {
  return new Promise((resolve) => {
    let dom;
    if (typeof array[0] === 'string' && array[1] && array[1].constructor === Object) {
      dom = document.createElement(array[0]);

      let key;
      for (key in array[1]) {
        if (typeof array[1][key] === 'function') {
          dom.addEventListener(key.replace(/^on/, ''), array[1][key], false);
        } else {
          dom.setAttribute(key, array[1][key]);
        }
      }

      if (Array.isArray(array[2])) {
        jsonToDOM(array[2]).then(node => dom.appendChild(node));
      } else if (array[2] !== undefined) {
        dom.appendChild(document.createTextNode(array[2]));
      }
    } else {
      dom = document.createDocumentFragment();

      for (let i = 0, l = array.length; i < l; i++) {
        if (Array.isArray(array[i])) {
          jsonToDOM(array[i]).then(node => dom.appendChild(node));
        } else {
          dom.appendChild(document.createTextNode(array[i]));
        }
      }
    }

    resolve(dom);
  }).catch(e => console.error(e));
}
