const assert = require("assert");
const Heap = require("../src/index");
const { isArrayLike, swap, defaultCmp } = require("../src/internal");

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

function heapFromArrayLike(cmp) {
  let data = [6, 5, 4, 3, 2, 1];
  let f = function() {
    return arguments;
  };

  let heap1 = new Heap(data, cmp);
  let heap2 = new Heap(f(...data), cmp);

  assert.strictEqual(heap1.size(), heap2.size());

  for(let i = 0; i < heap1.size(); i++) {
    assert.strictEqual(heap1.pop(), heap2.pop());
  }
}

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
  });
});

describe("Constructor", function() {
  it("should make an empty heap with no arguments", function() {
    let heap = new Heap();
    assert.ok(heap instanceof Heap);
  });

  it("should accept a custom comparator function", function() {
    let comparator = function(a, b) {
      return a.value - b.value;
    };

    let heap = new Heap(comparator);

    assert.strictEqual(heap._cmp, comparator);
  });

  it("should make a heap from an array like object", function() {
    heapFromArrayLike();
  });

  it("should make a heap from an array like object with a custom comparator", function() {
    heapFromArrayLike(function(a, b) {
      return a - b;
    });
  });

  it("should make a heap from another heap", function() {
    let firstHeap = new Heap([3,2,1]);
    let nextHeap = new Heap(firstHeap);

    assert.strictEqual(firstHeap.size(), nextHeap.size());

    for(let i = 0; i < 2; i++) {
      assert.strictEqual(firstHeap.pop(), nextHeap.pop());
    }
  });

});

describe("Static methods", function() {
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

    it("should work on an empty array", function() {
      assert.deepEqual(Heap.heapify([]), []);
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
    it("should merge two heaps into a new one", function() {
      let heap1 = new Heap([36, 39, 2, 82, 24, 14]);
      let heap2 = new Heap([4, 9, 5, 8 ,3, 1, 11]);

      let heap = Heap.merge(heap1, heap2);

      hasHeapProperty(heap, defaultCmp);
    });

    it("should throw for non Heap arguments", function() {
      assert.throws(Heap.merge.bind({}, []));
    });
  });
});

describe("Instance methods", function() {
  describe("peek", function() {
    it("should return undefined on an empty heap", function() {
      assert.strictEqual((new Heap()).peek(), undefined);
    });

    it("should return the first element in a nonempt heap", function() {
      let heap = new Heap([3, 2, 1, 5, 8]);
      assert.strictEqual(heap.peek(), 1);
    });
  });

  describe("push", function() {
    it("should add a new element to the heap", function() {
      let heap = new Heap();
      heap.push(3)
      .push(2)
      .push(1)
      .push(5)
      .push(8);

      hasHeapProperty(heap._data, defaultCmp);
    });
  });

  describe("pop", function() {
    it("should remove the first heap element", function() {
      let data = [3, 2, 1, 5, 8];
      let heap = new Heap(data);
      let arr = [];

      while(!heap.isEmpty()) {
        arr.push(heap.pop());
      }

      assert.deepEqual(arr, data.sort());
    });
  });

  describe("toArray", function() {
    it("should return an array representation of the heap", function() {
      let data = [6, 11, 15, 3, 2, 9];
      let heap = new Heap(data);
      let heap_arr = heap.toArray();

      assert.ok(Array.isArray(heap_arr));
    });
  });

  describe("size", function() {
    it("should return the heap size", function() {
      let heap = new Heap([1, 6, 3, 9, 2]);
      assert.strictEqual(heap.size(), 5);
    });
  });

  describe("isEmpty", function() {
    it("should return true if the heap is empty", function() {
      assert.strictEqual((new Heap()).isEmpty(), true);
    });
    it("should return false if heap is not empty", function() {
      assert.strictEqual((new Heap([1])).isEmpty(), false);
    });
  });
});
