# jsonToDOM

```javascript
let json = [
  'div', { class: 'hello' }, [
    'Hello World!',
    ['a', { href: 'example.com' }, 'Click me']
  ]
];

jsonToDOM(json).then(dom => document.body.appendChild(dom));
```
