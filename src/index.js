const { isArrayLike, sift_down, sift_up, defaultCmp, swap } = require("./internal");
const Arr = Array.prototype;

/**
* Creates a new Heap according to the arguments passed
* @constructor
* @param {(Object|Heap|Function)} other
* Can be an Array like Object of which all elements will be added to the Heap,
* another heap instance or just a custom comparator function.
* @param {Function} comparator
* If other is an Array like Object or another heap the custom comparator
* can always be passed as as second argument.
* @returns {Heap} The new heap instance
*/
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

/**
* Modifies an Array like Object in place such that it satisfies the heap property
* @param {Object} arr An Array like Object
* @param {Function} cmp An optional comparator function
* @returns {Object} The original Array like Object
*/
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

/**
* Merges two heaps into a new heap.
* @param {Heap} h1 The first heap
* @param {Heap} h2 The second heap
* @param {Function} comparator A custom comparator function
* @returns {Heap} The new merged heap
*/
Heap.merge = function(h1, h2, comparator) {
  if(h1 instanceof Heap && h2 instanceof Heap) {
    let merged_data = Arr.concat.call(h1._data, h2._data);

    return new Heap(merged_data, comparator);
  }
  else {
    throw new Error("expected arguments to be heaps");
  }
};

/**
* Returns the first element in the heap
* @returns {*} The first element in the heap
*/
Heap.prototype.peek = function() {
  if(!this.isEmpty()) {
    return this._data[0];
  }
};

/**
* Pushes a new element onto the heap
* @param {*} el The new element to be pushed
* @returns {this} The heap instance
*/
Heap.prototype.push = function(el) {
  Arr.push.call(this._data, el);

  sift_up(this._data, this._data.length - 1, this._cmp);

  return this;
};

/**
* Pops the first element from the heap
* @returns {*} The first element from the heap
*/
Heap.prototype.pop = function() {
  swap(this._data, 0, this._data.length - 1);
  let elm = Arr.pop.call(this._data);

  sift_down(this._data, 0, this._data.length, this._cmp);

  return elm;
};

/**
* Returns an array representation of the heap
* @returns {Array} The array representation of the heap
*/
Heap.prototype.toArray = function() {
  return Arr.slice.call(this._data, 0);
};

/**
* Returns the number of elements in the heap
* @returns {number} The size of the heap
*/
Heap.prototype.size = function() {
  return this._data.length;
};

/**
* Returns true if the heap is empty
* @returns {boolean} True if heap is empty. False otherwise
*/
Heap.prototype.isEmpty = function() {
  return this.size() === 0;
};

module.exports = Heap;
