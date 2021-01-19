import type { Recurse } from "./recurse";

type ParseObjectCore<
  Tokens extends any[],
  Obj extends object = {}
> = Tokens extends [{ type: "}" }, ...infer Rest]
  ? [{}, Rest]
  : Tokens extends [
      { type: "string"; value: infer V },
      { type: ":" },
      ...infer Rest2
    ]
  ? ParseCore<Rest2> extends [infer Result, infer Rest3]
    ? Rest3 extends [infer Token2, ...infer Rest4]
      ? Token2 extends { type: "," }
        ? {
            __rec: ParseObjectCore<
              Rest4,
              Obj & { [_ in Extract<V, string>]: Result }
            >;
          }
        : Token2 extends { type: "}" }
        ? [Obj & { [_ in Extract<V, string>]: Result }, Rest4]
        : never
      : never
    : never
  : never;

type ParseObject<Tokens extends any[]> = Tokens extends [
  { type: "{" },
  ...infer Rest
]
  ? Recurse<ParseObjectCore<Rest>>
  : never;

type ParseArrayCore<
  Tokens extends any[],
  Arr extends any[] = []
> = Tokens extends [{ type: "]" }, ...infer Rest]
  ? [Arr, Rest]
  : ParseCore<Tokens> extends [infer Result, infer Rest2]
  ? Rest2 extends [infer Token2, ...infer Rest3]
    ? Token2 extends { type: "," }
      ? { __rec: ParseArrayCore<Rest3, [...Arr, Result]> }
      : Token2 extends { type: "]" }
      ? [[...Arr, Result], Rest3]
      : never
    : never
  : never;

type ParseArray<Tokens extends any[]> = Tokens extends [
  { type: "[" },
  ...infer Rest
]
  ? Recurse<ParseArrayCore<Rest>>
  : never;

type ParseCore<Tokens extends any[]> = Tokens extends [
  infer Token,
  ...infer Rest
]
  ? Token extends { type: "null" }
    ? [null, Rest]
    : Token extends { type: "true" }
    ? [true, Rest]
    : Token extends { type: "false" }
    ? [false, Rest]
    : Token extends { type: "string" | "number"; value: infer V }
    ? [V, Rest]
    : Token extends { type: "{" }
    ? ParseObject<Tokens>
    : Token extends { type: "[" }
    ? ParseArray<Tokens>
    : never
  : never;

export type Parse<Tokens extends any[]> = ParseCore<Tokens>[0];
