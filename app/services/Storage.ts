import { isEmpty } from 'lodash';
import { create, MMKVLoader } from 'react-native-mmkv-storage';

/**
 * A wrapper around the MMKV class that provides a simple interface for storing and retrieving
 * data.
 */
export const storage = new MMKVLoader()
  .withEncryption()
  .encryptWithCustomKey('samplethunk', true)
  .withPersistedDefaultValues()
  .initialize();

if (__DEV__) {
  const mmkvFlipper = require('rn-mmkv-storage-flipper').default;
  mmkvFlipper(storage);
}

export const useStorage = create(storage);

/**
 * A type that can be stored in localStorage.
 * @typedef {boolean | string | number | object} StorageStringType
 */
export type StorageStringType = boolean | string | number | object;

/**
 * "Get a value from storage, and if it doesn't exist, return the default value."
 * The function is generic, so you can pass in a string, number, boolean, or object as the default
 * value
 * @param {string} key - The key to store the value under.
 * @param {T} defaultValue - The default value to return if the key doesn't exist.
 * @returns {T} The return type is T, which is a generic type.
 */
export function getStorageString<T extends StorageStringType>(key: string, defaultValue: T): T {
  const value = storage.getString(key) ?? '';
  if (isEmpty(value)) {
    return defaultValue;
  } else if (typeof defaultValue === 'boolean') {
    return Boolean(value) as T;
  } else if (typeof defaultValue === 'string') {
    return String(value) as T;
  } else if (typeof defaultValue === 'number') {
    return Number(value) as T;
  }
  return JSON.parse(value);
}

/**
 * "This function sets a value in the local storage, and it accepts a string, boolean,
 * number, or object as the value."
 *
 * The first line of the function is a type guard. It checks to see if the value is a boolean, string,
 * or number. If it is, then the value is assigned to the value variable. If it isn't, then the value
 * is converted to a string and assigned to the value variable
 * @param {string} key - The key to store the value under.
 * @param {T} newValue - The new value to set.
 * @returns None
 */
export function setStorageString<T extends StorageStringType>(key: string, newValue: T): void {
  let value: string;
  if (
    typeof newValue === 'boolean' ||
    typeof newValue === 'string' ||
    typeof newValue === 'number'
  ) {
    value = newValue as string;
  } else {
    value = JSON.stringify(newValue);
  }
  storage.setString(key, value);
}
