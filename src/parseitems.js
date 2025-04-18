/**
 * Parses a sequence of items from a byte array, starting at a given offset.
 *
 * @template T
 * @param {Uint8Array} byte - The source byte array.
 * @param {number} start - The starting offset within the byte array.
 * @param {number} lengthOf - The total number of bytes to read from `start`.
 * @param {{ from(data: Uint8Array): T, length?: number }} Fn - A class or factory with a `.from()` method that returns an item. The returned item must have a `.length` property.
 * @param {object} [option] - Optional configuration.
 * @param {(item: T) => void} [option.parser] - Optional parser callback for each item.
 * @param {Set<T> | Map<any, any> | Array<T>} [option.store] - A collection to store parsed items. Defaults to `new Set()`.
 * @param {(store: Map<any, any>, item: T) => void} [option.storeset] - A function to set item in a `Map` store. Defaults to `(store, data) => store.set(data.key, data.value)`.
 *
 * @returns {Set<T> | Map<any, any> | Array<T>} The store containing parsed items.
 * @throws {TypeError} If `store` is not a Set, Map, or Array.
 */
export function parseItems(byte, start, lengthOf, Fn, option = {}) {
   const {
      parser = null,
      store = new Set(),
      storeset = (store, data) => { store.set(data.key, data.value) }
   } = option;

   if (!(store instanceof Set || store instanceof Map || Array.isArray(store))) {
      throw new TypeError("store must be an instance of Set, Map, or Array.");
   }

   let offset = start;

   while (offset < start + lengthOf && offset < byte.length) {
      const item = Fn.from(byte.subarray(offset));
      offset += item.length;

      if (parser) parser(item);

      if (store instanceof Set) {
         store.add(item);
      } else if (store instanceof Map) {
         storeset(store, item);
      } else {
         store.push(item);
      }
   }

   return store;
}
