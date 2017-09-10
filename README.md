# jsonToDOM

```javascript
let json = [
  'div', { class: 'hello' }, [
    'Hello World!',
    ['a', { href: 'example.com' }, 'Click me']
  ]
];

let dom = jsonToDOM(json);
document.body.appendChild(dom);
```
