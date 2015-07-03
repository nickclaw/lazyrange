lazyrange
---------

## Example

```javascript

import range from 'lazyrange';

// for-of loops
for (let i of range(5)) {
    // 0, 1, 2, 3, 4
}

// array-like iteration
range(5, 10).each(function(i) {
    // 5, 6, 7, 8, 9
});
```

## API

### Creation

```javascript
import range from 'lazyrange';

let foo = range(0, 5);
let bar = new range.Range(5, 0, -1);
```

#### new Range(end) -> Range
Creates a range starting at 0 and ending at `end` using a step of `1`.

#### new Range(start, end, [step]) -> Range
Creates a range from `start` to `end` using a `step` that defaults to `1`,

#### range( ... ) -> Range
Shortcut method to return a new instance of a range.

------

### Methods

#### Range.prototype.toArray() -> Array
Evaluates the range into an array.
```javascript
let arr = range(5).toArray();
// [0, 1, 2, 3, 4]
```

#### Range.prototype.map(callback) -> Array
Maps the range to an array.
```javascript
var arr = range(5).map((value, index) => Math.pow(value, 2));
// [0, 1, 4, 9, 16]
```

#### Range.prototype.reduce(callback, memo) -> *
Reduces the range to a value.
```javascript
var val = range(5).reduce((memo, value, index) => memo + value, 0);
// 10
```

#### Range.prototype.each(callback) | Range.prototype.forEach(callback)
Iterates over each value in the range.
```javascript
range(5).each(function(value, index) {
    console.log(value);
});
```

#### for-of
Lazily iterate over each value in the range.
```
for (let i of range(5)) {

}
```
