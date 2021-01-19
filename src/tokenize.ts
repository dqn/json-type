import type { Add, Mul } from "./calc";
import type { Recurse } from "./recurse";

type ReadNumberLiteralCore<S, L> = S extends `0${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 0>> }
  : S extends `1${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 1>> }
  : S extends `2${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 2>> }
  : S extends `3${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 3>> }
  : S extends `4${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 4>> }
  : S extends `5${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 5>> }
  : S extends `6${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 6>> }
  : S extends `7${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 7>> }
  : S extends `8${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 8>> }
  : S extends `9${infer Rest}`
  ? { __rec: ReadNumberLiteralCore<Rest, Add<Mul<L, 10>, 9>> }
  : [L, S];

type ReadNumberLiteral<S, L extends number = 0> = Recurse<
  ReadNumberLiteralCore<S, L>
>;

type TokenizeCore<S, Tokens extends any[] = []> = S extends ` ${infer Rest}`
  ? { __rec: TokenizeCore<Rest, Tokens> }
  : S extends `\n${infer Rest}`
  ? { __rec: TokenizeCore<Rest, Tokens> }
  : S extends `{${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "{" }]> }
  : S extends `}${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "}" }]> }
  : S extends `[${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "[" }]> }
  : S extends `]${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "]" }]> }
  : S extends `:${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: ":" }]> }
  : S extends `,${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "," }]> }
  : S extends `true${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "true" }]> }
  : S extends `false${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "false" }]> }
  : S extends `null${infer Rest}`
  ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "null" }]> }
  : S extends `"${string}`
  ? S extends `"${infer Str}"${infer Rest}`
    ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "string"; value: Str }]> }
    : never
  : S extends `${"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}${string}`
  ? ReadNumberLiteral<S> extends [infer Num, infer Rest]
    ? { __rec: TokenizeCore<Rest, [...Tokens, { type: "number"; value: Num }]> }
    : never
  : Tokens;

export type Tokenize<S extends string> = Recurse<TokenizeCore<S>>;
