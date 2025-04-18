/**
 * Parses a sequence of items from a byte array using a factory parser and collects the results.
 *
 * @template T The item type returned by `Fn.from()`.
 * @param byte - The source byte array to parse from.
 * @param start - The offset within `byte` where parsing begins.
 * @param lengthOf - The number of bytes to parse from the start position.
 * @param Fn - A class or factory with a static `.from(Uint8Array): T` method. Returned `T` must have a `.length` property.
 * @param option - Optional configuration for parsing behavior.
 * @returns The populated `store` (or a new one if none provided) containing parsed items.
 * @version 0.0.3
 */
export declare function parseItems<T>(
   byte: Uint8Array,
   start: number,
   lengthOf: number,
   Fn: {
     from(data: Uint8Array): T;
   },
   option?: {
     /**
      * Optional parser function applied to each parsed item.
      */
     parser?: (item: T) => void;
     /**
      * Optional collection to store results. Must be a Set, Map, or Array.
      */
     store?: Set<T> | Map<any, any> | Array<T>;
     /**
      * Function to store items in a Map store.
      * Only used if `store` is a Map.
      */
     storeset?: (store: Map<any, any>, item: T) => void;
   }
 ): Set<T> | Map<any, any> | Array<T>;
 