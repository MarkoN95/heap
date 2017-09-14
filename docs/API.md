<a name="Heap"></a>

## Heap
**Kind**: global class  

* [Heap](#Heap)
    * [new Heap(other, comparator)](#new_Heap_new)
    * _instance_
        * [.peek()](#Heap+peek) ⇒ <code>\*</code>
        * [.push(el)](#Heap+push) ⇒ <code>this</code>
        * [.pop()](#Heap+pop) ⇒ <code>\*</code>
        * [.toArray()](#Heap+toArray) ⇒ <code>Array</code>
        * [.size()](#Heap+size) ⇒ <code>number</code>
        * [.isEmpty()](#Heap+isEmpty) ⇒ <code>boolean</code>
    * _static_
        * [.heapify(arr, cmp)](#Heap.heapify) ⇒ <code>Object</code>
        * [.merge(h1, h2, comparator)](#Heap.merge) ⇒ [<code>Heap</code>](#Heap)

<a name="new_Heap_new"></a>

### new Heap(other, comparator)
Creates a new Heap according to the arguments passed

**Returns**: [<code>Heap</code>](#Heap) - The new heap instance  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Object</code> \| [<code>Heap</code>](#Heap) \| <code>function</code> | Can be an Array like Object of which all elements will be added to the Heap, another heap instance or just a custom comparator function. |
| comparator | <code>function</code> | If other is an Array like Object or another heap the custom comparator can always be passed as as second argument. |

<a name="Heap+peek"></a>

### heap.peek() ⇒ <code>\*</code>
Returns the first element in the heap

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>\*</code> - The first element in the heap  
<a name="Heap+push"></a>

### heap.push(el) ⇒ <code>this</code>
Pushes a new element onto the heap

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>this</code> - The heap instance  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>\*</code> | The new element to be pushed |

<a name="Heap+pop"></a>

### heap.pop() ⇒ <code>\*</code>
Pops the first element from the heap

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>\*</code> - The first element from the heap  
<a name="Heap+toArray"></a>

### heap.toArray() ⇒ <code>Array</code>
Returns an array representation of the heap

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>Array</code> - The array representation of the heap  
<a name="Heap+size"></a>

### heap.size() ⇒ <code>number</code>
Returns the number of elements in the heap

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>number</code> - The size of the heap  
<a name="Heap+isEmpty"></a>

### heap.isEmpty() ⇒ <code>boolean</code>
Returns true if the heap is empty

**Kind**: instance method of [<code>Heap</code>](#Heap)  
**Returns**: <code>boolean</code> - True if heap is empty. False otherwise  
<a name="Heap.heapify"></a>

### Heap.heapify(arr, cmp) ⇒ <code>Object</code>
Modifies an Array like Object in place such that it satisfies the heap property

**Kind**: static method of [<code>Heap</code>](#Heap)  
**Returns**: <code>Object</code> - The original Array like Object  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Object</code> | An Array like Object |
| cmp | <code>function</code> | An optional comparator function |

<a name="Heap.merge"></a>

### Heap.merge(h1, h2, comparator) ⇒ [<code>Heap</code>](#Heap)
Merges two heaps into a new heap.

**Kind**: static method of [<code>Heap</code>](#Heap)  
**Returns**: [<code>Heap</code>](#Heap) - The new merged heap  

| Param | Type | Description |
| --- | --- | --- |
| h1 | [<code>Heap</code>](#Heap) | The first heap |
| h2 | [<code>Heap</code>](#Heap) | The second heap |
| comparator | <code>function</code> | A custom comparator function |

