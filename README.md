Heap
====
[![Build Status](https://travis-ci.org/MarkoN95/heap.svg?branch=master)](https://travis-ci.org/MarkoN95/heap)
[![dependencies Status](https://david-dm.org/markon95/heap/status.svg)](https://david-dm.org/markon95/heap)
[![npm version](https://badge.fury.io/js/%40markon95%2Fheap.svg)](https://badge.fury.io/js/%40markon95%2Fheap)

A binary heap data structure written in Javascript

Installation
------------

For node.js:

```
npm install --save @markon95/heap
```

then require it:

```js
var Heap = require("@markon95/heap");
```

To use the library directly in the browser, copy the `heap.js` file from the lib
directory into your project and include it in your webpage. `heap.min.js` provides
you with a minified version. The files in the lib directory are also transpiled to es5.

```html
<script type="text/javascript" src="./heap.js"></script>
<script type="text/javascript">
  var heap = new Heap(); // available as a global
</script>
```

Example usage
-------------

```js
var heap = new Heap();

heap.push(5)
  .push(2)
  .push(1)
  .push(3)
  .push(8);

var arr = heap.toArray(); // [1, 3, 2, 5, 8]
```

Documentation
-------------
* [API documentation](../master/docs/API.md)
