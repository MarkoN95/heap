const { isArrayLike, sift_down, defaultCmp } = require("./internal");

const Heap = function Heap() {

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

Heap.merge = function() {

};

Heap.prototype.peek = function() {

};

Heap.prototype.push = function() {

};

Heap.prototype.pop = function() {

};

Heap.prototype.size = function() {

};

Heap.prototype.isEmpty = function() {

};

module.exports = Heap;
