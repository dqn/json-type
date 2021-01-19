import type { JsonType } from "./../src";

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Expect<T extends true> = T;

type Result1 = JsonType<`null`>;
type Test1 = Expect<Equals<Result1, null>>;

type Result2 = JsonType<`true`>;
type Test2 = Expect<Equals<Result2, true>>;

type Result3 = JsonType<`false`>;
type Test3 = Expect<Equals<Result3, false>>;

type Result4 = JsonType<`"foo"`>;
type Test4 = Expect<Equals<Result4, "foo">>;

type Result5 = JsonType<`23`>;
type Test5 = Expect<Equals<Result5, 23>>;

type Result6 = JsonType<`[]`>;
type Test6 = Expect<Equals<Result6, []>>;

type Result7 = JsonType<`{}`>;
type Test7 = Expect<Equals<Result7, {}>>;

type Result8 = JsonType<`[1, 2, null, "foo", true]`>;
type Test8 = Expect<Equals<Result8, [1, 2, null, "foo", true]>>;

type Result9 = JsonType<`{"foo": "bar", "hoge": false, "fuga": 6}`>;
type Test9 = Expect<
  Equals<Result9, { foo: "bar" } & { hoge: false } & { fuga: 6 }>
>;

type Result10 = JsonType<`{ "foo": "bar", "baz": { "hoge": { "fuga": [1, 3], "piyo": 2 } } }`>;
type Test10 = Expect<
  Equals<
    Result10,
    { foo: "bar" } & { baz: { hoge: { fuga: [1, 3] } & { piyo: 2 } } }
  >
>;

type Result11 = JsonType<`[true, false, null, {"foo": [[]]}, [[null, false], 2]]`>;
type Test11 = Expect<
  Equals<Result11, [true, false, null, { foo: [[]] }, [[null, false], 2]]>
>;
