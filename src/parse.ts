type ParseObjectCore<
  Tokens extends any[],
  Obj extends object = {}
> = Tokens extends [infer Head, ...infer Rest]
  ? Head extends { type: "}" }
    ? [Obj, Rest]
    : Tokens extends [
        { type: "string"; value: infer V },
        { type: ":" },
        ...infer Rest
      ]
    ? ParseCore<Rest> extends [infer Result, infer RestRest]
      ? RestRest extends [infer RestRestHead, ...infer RestRestRest]
        ? RestRestHead extends { type: "," }
          ? ParseObjectCore<
              RestRestRest,
              Obj & { [_ in Extract<V, string>]: Result }
            >
          : RestRestHead extends { type: "}" }
          ? [Obj & { [_ in Extract<V, string>]: Result }, RestRestRest]
          : never
        : never
      : never
    : never
  : never;

type ParseObject<Tokens extends any[]> = Tokens extends [
  { type: "{" },
  ...infer Rest
]
  ? ParseObjectCore<Rest>
  : never;

type ParseArrayCore<
  Tokens extends any[],
  Arr extends any[] = []
> = Tokens extends [infer Head, ...infer Rest]
  ? Head extends { type: "]" }
    ? [Arr, Rest]
    : ParseCore<Tokens> extends [infer Result, infer Rest]
    ? Rest extends [infer RestHead, ...infer RestRest]
      ? RestHead extends { type: "," }
        ? ParseArrayCore<RestRest, [...Arr, Result]>
        : RestHead extends { type: "]" }
        ? [[...Arr, Result], RestRest]
        : never
      : never
    : never
  : never;

type ParseArray<Tokens extends any[]> = Tokens extends [
  { type: "[" },
  ...infer Rest
]
  ? ParseArrayCore<Rest>
  : never;

type ParseCore<Tokens extends any[]> = Tokens extends [
  infer Head,
  ...infer Rest
]
  ? Head extends { type: "null" }
    ? [null, Rest]
    : Head extends { type: "true" }
    ? [true, Rest]
    : Head extends { type: "false" }
    ? [false, Rest]
    : Head extends { type: "string" | "number"; value: infer V }
    ? [V, Rest]
    : Head extends { type: "{" }
    ? ParseObject<Tokens>
    : Head extends { type: "[" }
    ? ParseArray<Tokens>
    : never
  : never;

export type Parse<Tokens extends any[]> = ParseCore<Tokens>[0];
