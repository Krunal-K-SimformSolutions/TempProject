import { compact, isArray, isEmpty, isObject, transform } from 'lodash';

/**
 * If the argument is an array, return a new array with all the falsy values removed, otherwise return
 * the argument.
 * @param {any} o - the array to clean
 * @returns {any} - the cleaned array.
 */
function cleanArray(o: any) {
  return isArray(o) ? compact(o) : o;
}

/**
 * It recursively removes all `undefined` and `null` values from an object
 * @param {Record<string, any>} o - the object to clean
 * @returns {Record<string, any>} a new object with all the undefined or null values removed.
 */
export function cleanUndefOrNull(o: Record<string, any>) {
  return transform(o, (r, v, k) => {
    let isObjectBool: boolean = isObject(v);
    let val = isObjectBool ? cleanArray(cleanUndefOrNull(v)) : v;
    let keep = isObjectBool ? !isEmpty(val) : Boolean(val);

    if (keep) {
      // @ts-ignore
      r[k] = val;
    }
  });
}
