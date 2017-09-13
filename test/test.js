const assert = require("assert");
const Heap = require("../src/index");
const { isArrayLike, swap, defaultCmp } = require("../src/internal");

describe("Internals", function() {

  describe("isArrayLike", function() {
    it("should recognize array like objects", function() {
      assert.ok(isArrayLike([]));
      assert.ok(isArrayLike((function() { return arguments; })(1, 2, 3)));
      assert.ok(isArrayLike({ 0: "a", 1: "b", 2: "c", length: 3 }));
    });

    describe("not array like arguments", function() {
      [{}, "foobar", 2, null, undefined, true, false].forEach(function(item) {
        it("should return false", function() {
          assert.strictEqual(isArrayLike(item), false);
        });
      });
    });
  });

  describe("swap", function() {
    it("should swap two elements from an array like object", function() {
      var array = [1, 2, 3];
      swap(array, 0, 2);

      assert.deepEqual([3, 2, 1], array);
    });

    it("should throw if coll is not array like", function() {
      assert.throws(swap.bind(null, "foobar", 0, 2));
    });

    describe("indices out of bound", function() {
      [[-1, 0], [0, 4], [0, -1], [4, 0]].forEach(function(pair) {
        it("should throw", function() {
          assert.throws(swap.bind(null, [1, 2, 3], pair[0], pair[1]));
        });
      });
    });
  });

  describe("defaultCmp", function() {
    it("should compare numbers by size", function() {
      assert.strictEqual(defaultCmp(3, 5), -1);
      assert.strictEqual(defaultCmp(5, 3), 1);
      assert.strictEqual(defaultCmp(7, 7), 0);
    });

    it("should compare strings lexicographically", function() {
      assert.strictEqual(defaultCmp("bar", "foo"), -1);
      assert.strictEqual(defaultCmp("foo", "bar"), 1);
      assert.strictEqual(defaultCmp("foo", "foo"), 0);
      assert.strictEqual(defaultCmp("long", "longer"), -1);
      assert.strictEqual(defaultCmp("longer", "long"), 1);
    });

    it("should regard the only comparable value as preferable", function() {
      assert.strictEqual(defaultCmp(null, 7), 1);
      assert.strictEqual(defaultCmp(7, undefined), -1);
      assert.strictEqual(defaultCmp(true, false), 0);
    });
  });
});

describe("Static methods", function() {

  function hasHeapProperty(array, cmp) {
    let lChild, rChild, parent;
    for(let i = 0; i < (array.length - 1) / 2; i++) {
      parent = array[i];

      if(2*i + 1 < array.length) {
        lChild = array[2*i + 1];
        assert.ok(cmp(parent, lChild) <= -1);
      }
      if(2*i + 2 < array.length) {
        rChild = array[2*i + 2];
        assert.ok(cmp(parent, rChild) <= -1);
      }
    }
  }

  describe("heapify", function() {
    it("should arange the array elements s.t they satisfy the heap property", function() {
      const array = [5, 19, 39, 6, 11, 13, 25, 1];

      Heap.heapify(array);

      hasHeapProperty(array, defaultCmp);
    });

    it("should create a heap with a custom comparator function", function() {
      const array = [{ value: 5 }, { value: 39 }, { value: 3 }, { value: 0 }, { value: 16 }];
      const comparator = (a, b) => a.value - b.value;

      Heap.heapify(array, comparator);

      hasHeapProperty(array, comparator);
    });

    it("should throw if custom comparator is not a function", function() {
      const array = [5, 19, 39, 6, 11, 13, 25, 1];
      const comparator = {};

      assert.throws(Heap.heapify.bind(null, array, comparator));
    });

    describe("not array like arguments", function() {
      [{}, "foobar", 2, null, undefined, true, false].forEach(function(item) {
        it("should throw", function() {
          assert.throws(Heap.heapify.bind(null, item));
        });
      });
    });
  });

  describe("merge", function() {

  });
});

describe("Instance methods", function() {
  describe("peek", function() {

  });

  describe("push", function() {

  });

  describe("pop", function() {

  });

  describe("size", function() {

  });

  describe("isEmpty", function() {

  });
});
