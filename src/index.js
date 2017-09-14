const { isArrayLike, sift_down, sift_up, defaultCmp, swap } = require("./internal");
const Arr = Array.prototype;

const Heap = function Heap(other, comparator) {
  if(!(this instanceof Heap)) {
    return new Heap(other, comparator);
  }

  this._cmp = defaultCmp;
  this._data = [];

  if(other instanceof Heap) {
    this._cmp = other._cmp;
    this._data = Arr.slice.call(other._data, 0);
  }
  else if(isArrayLike(other)) {
    this._data = Arr.slice.call(other, 0);

    if(typeof comparator === "function") {
      this._cmp = comparator;
    }

    Heap.heapify(this._data, this._cmp);
  }
  else if(typeof other === "function") {
    this._cmp = other;
  }
};

Heap.heapify = function(arr, cmp = defaultCmp) {
  if(!isArrayLike(arr)) {
    throw new Error("argument to heapify must be array like object");
  }

  if(typeof cmp !== "function") {
    throw new Error("custom comparator must be a function");
  }

  let len = arr.length;
  let idx = len;

  while(idx-- !== 0) {
    sift_down(arr, idx, len, cmp);
  }

  return arr;
};

Heap.merge = function(h1, h2, comparator) {
  if(h1 instanceof Heap && h2 instanceof Heap) {
    let merged_data = Arr.concat.call(h1._data, h2._data);

    return new Heap(merged_data, comparator);
  }
};

Heap.prototype.peek = function() {
  if(!this.isEmpty()) {
    return this._data[0];
  }
};

Heap.prototype.push = function(el) {
  Arr.push.call(this._data, el);

  sift_up(this._data, this._data.length - 1, this._cmp);

  return this;
};

Heap.prototype.pop = function() {
  swap(this._data, 0, this._data.length - 1);
  let elm = Arr.pop.call(this._data);

  sift_down(this._data, 0, this._data.length, this._cmp);

  return elm;
};

Heap.prototype.toArray = function() {
  return Arr.slice.call(this._data, 0);
};

Heap.prototype.size = function() {
  return this._data.length;
};

Heap.prototype.isEmpty = function() {
  return this.size() === 0;
};

module.exports = Heap;
