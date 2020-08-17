/*!
 * Check if two parameters are equal
 * Author: Tyler.Chao
 * github: https://github.com/cz848/dateio
 */

/**
 * @param  a  {Any}  The first parameter to compare
 * @param  b  {Any}  The second parameter to compare
 * @return {Boolean}  Returns true if they're equal
 */

const isObject = o => o !== null && (typeof o === 'object' || typeof o === 'function');

const getType = o => toString.call(o).replace(/\[object (.+)\]/, '$1').toLowerCase();

export default function isEqual(a, b) {
  // If someone are not object or function, use Object.is
  if (!isObject(a) || !isObject(b)) return Object.is(a, b);
  // If the two objects are not the same constructor, return false
  if (a.constructor !== b.constructor) return false;
  // Get the value type
  const type = getType(a);
  if (type !== getType(b)) return false;

  let keys;

  switch (type) {
    case 'array':
    case 'arraybuffer':
      if (a.length !== b.length) return false;
      // Compare every values
      if (a.some((value, i) => !isEqual(value, b[i]))) return false;
      return true;
    case 'set':
    case 'map':
      if (a.size !== b.size) return false;
      if ([...a.entries()].some(([k, v]) => !b.has(k) || (type === 'map' && !isEqual(v, b.get(k))))) return false;
      return true;
    case 'regexp':
      return a.source === b.source && a.flags === b.flags;
    default:
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

      // Compare other object
      keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length) return false;

      // Compare properties and values
      if (keys.some(key => !hasOwnProperty.call(b, key) || !isEqual(a[key], b[key]))) return false;
  }

  // If nothing failed, return true
  return true;
}
