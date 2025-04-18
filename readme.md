---

```markdown
# `parseItems`

A utility function for parsing sequences of structured binary data 
from a `Uint8Array`, commonly used in protocol parsers like TLS.
@version 0.0.3

---

## 📦 Usage

```ts
import { parseItems } from "jsr:@tls/parser";

/**
 * Example item class with .from(Uint8Array) and .length
 */
class ExampleItem {
  constructor(data) {
    this.value = data[0];
    this.length = 1;
  }

  static from(byteArray) {
    return new ExampleItem(byteArray);
  }
}

const byte = new Uint8Array([1, 2, 3, 4, 5]);
const result = parseItems(byte, 0, byte.length, ExampleItem);

console.log(result); // [ ExampleItem { value: 1 }, ... ]
```

---

## 🧩 API

```ts
parseItems<T>(
  byte: Uint8Array,
  start: number,
  lengthOf: number,
  Fn: { from(Uint8Array): T },
  option?: {
    parser?: (item: T) => void,
    store?: Set<T> | Map<any, any> | T[],
    storeset?: (store: Map<any, any>, data: T) => void
  }
): Set<T> | Map<any, any> | T[]
```

### Parameters

| Name      | Type                              | Description |
|-----------|-----------------------------------|-------------|
| `byte`    | `Uint8Array`                      | The source binary data. |
| `start`   | `number`                          | Offset to start parsing from. |
| `lengthOf`| `number`                          | Total length of the section to parse. |
| `Fn`      | Class with static `.from()` method| Constructor-like class used to parse each item. |
| `option`  | `object` *(optional)*             | Additional configuration. |

### Option Fields

- **`parser(item)`** — Function called for each parsed item.
- **`store`** — Where parsed items will be stored. Defaults to `Set`.
- **`storeset(store, data)`** — Custom function for adding items to a `Map`.

---

## ✅ Requirements

- `Fn.from(Uint8Array): T` must return an instance with a `.length` property.
- `store` must be an instance of `Set`, `Map`, or `Array`.

---

## 🧪 Example with Map

```ts
parseItems(byte, 0, byte.length, ExampleItem, {
  store: new Map(),
  storeset(store, item) {
    store.set(item.value, item);
  }
});
```

### Donation

- [Support the project on PayPal](https://paypal.me/aiconeid)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.