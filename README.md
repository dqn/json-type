# json-type

[![CI](https://github.com/dqn/json-type/workflows/CI/badge.svg)](https://github.com/dqn/json-type/actions)
[![npm version](https://img.shields.io/npm/v/@dqn/json-type.svg)](https://www.npmjs.com/package/@dqn/json-type)

Generate type from JSON string.

## Installation

Using npm:

```bash
$ npm install @dqn/json-type
```

Using yarn:

```bash
$ yarn add @dqn/json-type
```

## Example

```ts
import type { JsonType } from "@dqn/json-type";

type Obj = JsonType<'{ "foo": "aaa", "bar": 12, "piyo": { "nyaa": [null, true] } }'>;
// type Obj = {
//   foo: "aaa";
//   bar: 12;
//   piyo: {
//     nyaa: [null, true];
//   };
// };
```

## License

MIT
