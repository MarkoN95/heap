Heap
====
A binary heap data structure written in Javascript

Installation
------------

```
npm install --save @markon95/heap
```

then require it:

```
var Heap = require("@markon95/heap");
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
* [API documentation](../blob/master/docs/API.md)
