# isEqual

　　超轻量、超短小、零依赖，深不可测的任意值比较函数！支持到ES6新类型。
　　Super lightweight, super short, zero dependence, unfathomable comparison function, includes ES6 new types.

　　Supports types：Array, ArrayBuffer, Object, Boolean, Number, String, Date object, RegExp object, Error object, Function, Map, Set, Symbol, Class, BigInt and Typed array. Objects are compared by their own, not inherited, enumerable properties.

## Install

```javascript
npm install isequal.es
```

## Use

### `isEqual(a: Any, b: Any)`

Returns true or false

```javascript
isEqual(1, 1) // true
isEqual('1', 1) // false
isEqual(0, '') // false
isEqual(NaN, NaN) // true
isEqual(0, -0) // false

isEqual({}, {}) // true
isEqual({}, []) // false
isEqual({a: 1, b: 2}, {a:1, b:2}) // true
isEqual({a: 1, b: 2, c: 3}, {a:1, b:2, c: 4}) // false
isEqual(new RegExp(1), new RegExp(1)) // true
isEqual(new Date('2020-8-9'), new Date('2020-8-9')) // true
isEqual(new Error('some error message'), new Error('some error message')) // true
isEqual(new Set(['a', 'b']), new Set(['a', 'b'])) // true
isEqual(new Map([['a', 1], ['b', 2], [new Map(), 3]]), new Map([['b', 2], ['a', 1], [new Map(), 3]])) // true
```
