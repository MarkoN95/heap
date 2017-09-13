const isArrayLike = function isArrayLike(o) { // https://stackoverflow.com/a/24048615
  return(
    Array.isArray(o) ||
    !!o &&
    typeof o === "object" &&
    o.hasOwnProperty("length") &&
    typeof o.length === "number" &&
    (o.length === 0 ||
    (o.length > 0 && (o.length - 1) in o))
  );
};

const swap = function swap(coll, idx_a, idx_b) {
  if(!isArrayLike(coll)) {
    throw new Error("collection must be array like");
  }
  if(idx_a < 0 || idx_a >= coll.length || idx_b < 0 || idx_b >= coll.length) {
    throw new Error("index out of bounds");
  }

  var temp = coll[idx_a];
  coll[idx_a] = coll[idx_b];
  coll[idx_b] = temp;

  return coll;
};

const isComparable = function isComparable(v) {
  return typeof v === "number" || typeof v === "string";
};

const defaultCmp = function(a, b) {
  let a_ok = isComparable(a);
  let b_ok = isComparable(b);

  if(!a_ok && b_ok) { return 1; }
  if(a_ok && !b_ok) { return -1; }
  if(!a_ok && !b_ok) { return 0; }

  if(typeof a === "number" && typeof b === "number") {
    return a < b ? -1 : (a > b ? 1 : 0);
  }

  if(typeof a === "string" && typeof b === "string") {
    let a_code, b_code;

    for(let i = 0; i < Math.min(a.length, b.length); i++) {
      a_code = a.charCodeAt(i);
      b_code = b.charCodeAt(i);

      if(a_code < b_code) { return -1; }
      if(a_code > b_code) { return 1; }
    }

    return a.length < b.length ? -1 : (a.length > b.length ? 1 : 0);
  }

  throw new Error("defaultCmp only compares numbers and strings");
};

const sift_down = function sift_down(coll, idx, heap_size, cmp) {
  let lChild = 2 * idx + 1;
  let rChild = lChild + 1;
  let smallerChild;

  if(rChild >= coll.length) {
    smallerChild = lChild;
  }

  if(lChild >= coll.length) {
    return;
  }

  if(rChild < coll.length) {
    smallerChild = cmp(coll[lChild], coll[rChild]) <= -1 ? lChild : rChild;
  }

  if(cmp(coll[smallerChild], coll[idx]) <= -1) {
    swap(coll, idx, smallerChild);
    sift_down(coll, smallerChild, heap_size, cmp);
  }
};

module.exports = {
  isArrayLike,
  swap,
  defaultCmp,
  sift_down
};
