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

// map to array
function square(n) { return Math.pow(n, 2); }
range(6, 0, -2).map(square); // [36, 16, 4]

// reduce range
function sum(total, n) { return total + n; }
range(4, -1, -1).reduce(sum, 0); // 10

```
