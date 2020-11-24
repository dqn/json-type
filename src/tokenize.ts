import { Add, Mul } from "./calc";

type ReadStringLiteralCore<
  S,
  L extends string = ""
> = S extends `"${infer Rest}`
  ? [L, Rest]
  : S extends `${infer H}${infer Rest}`
  ? ReadStringLiteralCore<Rest, `${L}${H}`>
  : never;

type ReadStringLiteral<S> = S extends `"${infer Rest}`
  ? ReadStringLiteralCore<Rest>
  : never;

type ReadNumberLiteral<S, L extends number = 0> = S extends `0${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 0>>
  : S extends `1${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 1>>
  : S extends `2${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 2>>
  : S extends `3${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 3>>
  : S extends `4${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 4>>
  : S extends `5${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 5>>
  : S extends `6${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 6>>
  : S extends `7${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 7>>
  : S extends `8${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 8>>
  : S extends `9${infer Rest}`
  ? ReadNumberLiteral<Rest, Add<Mul<L, 10>, 9>>
  : [L, S];

type TokenizeString<S, Tokens extends any[]> = ReadStringLiteral<S> extends [
  infer Literal,
  infer Rest,
]
  ? TokenizeCore<Rest, [...Tokens, Literal]>
  : never;

type TokenizeNumber<S, Tokens extends any[]> = ReadNumberLiteral<S> extends [
  infer Literal,
  infer Rest,
]
  ? TokenizeCore<Rest, [...Tokens, Literal]>
  : never;

type TokenizeCore<S, Tokens extends any[] = []> = S extends ` ${infer Rest}`
  ? TokenizeCore<Rest, Tokens>
  : S extends `\n${infer Rest}`
  ? TokenizeCore<Rest, Tokens>
  : S extends `{${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, "{"]>
  : S extends `}${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, "}"]>
  : S extends `[${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, "["]>
  : S extends `]${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, "]"]>
  : S extends `:${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, ":"]>
  : S extends `,${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, ","]>
  : S extends `null${infer Rest}`
  ? TokenizeCore<Rest, [...Tokens, "null"]>
  : S extends `"${infer _}`
  ? TokenizeString<S, Tokens>
  : S extends `1${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `2${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `3${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `4${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `5${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `6${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `7${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `8${infer _}`
  ? TokenizeNumber<S, Tokens>
  : S extends `9${infer _}`
  ? TokenizeNumber<S, Tokens>
  : Tokens;

export type Tokenize<S extends string> = TokenizeCore<S>;
