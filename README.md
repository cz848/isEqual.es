# isEqual

Super lightweight, super short, zero dependency, unfathomably deep comparison function — includes ES6 new types.

**Supports:** Array · ArrayBuffer · Object · Boolean · Number · String · Date · RegExp · Error · Function · Map · Set · Symbol · Class · BigInt · Typed array

Objects are compared by their own, not inherited, enumerable properties.

## Install

```bash
npm install isequal.es
```

Ships an ESM source (`index.js`) and a minified UMD bundle (`index.min.js`, global `isEqual`).

## API

### `isEqual(a: any, b: any): boolean`

Returns `true` if the two values are deeply equal, otherwise `false`.

```javascript
import isEqual from 'isequal.es';

isEqual(1, 1);                                   // true
isEqual('1', 1);                                 // false
isEqual(NaN, NaN);                               // true
isEqual(0, -0);                                  // false
isEqual({}, {});                                 // true
isEqual({}, []);                                 // false
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 });         // true
isEqual(new RegExp('1'), new RegExp('1'));       // true
isEqual(new Date('2020-8-9'), new Date('2020-8-9')); // true
isEqual(new Error('x'), new Error('x'));         // true
isEqual(new Set(['a', 'b']), new Set(['a', 'b'])); // true
isEqual(
  new Map([['a', [1, 2]], ['b', 2]]),
  new Map([['b', 2], ['a', [1, 2]]]),
);                                               // true
```

## Semantics

- **Primitives** compared with `Object.is`: `NaN === NaN` is `true`; `0 === -0` is `false`.
- **Constructors must match**: `{}` and `[]` are not equal; a real `Map` is never equal to an object exposing `Map`-like methods.
- **`Map`/`Set` are order-independent but class-sensitive**: insertion order is ignored; a `Map` never equals a subclass instance (`MyMap`) with identical entries. `Map` keys and `Set` members are matched by reference, while `Map` values are deep-compared.
- **Recursive**: collection entries may themselves be objects, arrays, or other `Map`/`Set` instances.
- **Custom `valueOf`/`toString`**: `Date`, `RegExp`, `Error`, and objects overriding these methods are compared by their result.
- **`undefined` keys are significant**: `{}` and `{ foo: undefined }` are not equal.

## Implementation

1. If either value is not an object or function, compare with `Object.is`.
2. If constructors differ, return `false`.
3. Resolve type via `Object.prototype.toString`:
   - `Array` / `ArrayBuffer` — length and element-wise recursion.
   - `Map` / `Set` — size and entry-wise recursion.
   - Otherwise — use overridden `valueOf`/`toString` if present, else compare own enumerable keys recursively.

## Develop

```bash
npm run build   # rollup UMD bundle
npm run lint    # eslint . --ext js
npm test        # jest (watch mode)
```

MIT © Tyler Chao — <https://github.com/cz848/isequal.es>
