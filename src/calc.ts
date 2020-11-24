type MakeArray<L extends number, A extends any[] = []> = A["length"] extends L
  ? A
  : MakeArray<L, [...A, never]>;

type DecreaseArray<A extends any[]> = A extends [infer _, ...infer Rest]
  ? Rest
  : never;

type AddArrayLength<A extends any[], B extends any[]> = [...A, ...B]["length"];

type SubArrayLength<A extends any[], B extends any[]> = B["length"] extends 0
  ? A["length"]
  : SubArrayLength<DecreaseArray<A>, DecreaseArray<B>>;

type MulArrayLength<
  A extends any[],
  B extends any[],
  R extends any[] = []
> = B["length"] extends 0
  ? R["length"]
  : MulArrayLength<A, DecreaseArray<B>, [...R, ...A]>;

type DivArrayLength<
  A extends any[],
  B extends any[],
  Result extends any[] = [],
  BOrig extends any[] = B
> = B["length"] extends 0
  ? DivArrayLength<A, BOrig, [...Result, never], BOrig>
  : A["length"] extends 0
  ? Result["length"]
  : DivArrayLength<DecreaseArray<A>, DecreaseArray<B>, Result, BOrig>;

export type Add<A extends number, B extends number> = Extract<
  AddArrayLength<MakeArray<A>, MakeArray<B>>,
  number
>;

export type Sub<A extends number, B extends number> = Extract<
  SubArrayLength<MakeArray<A>, MakeArray<B>>,
  number
>;

export type Mul<A extends number, B extends number> = Extract<
  MulArrayLength<MakeArray<A>, MakeArray<B>>,
  number
>;

export type Div<A extends number, B extends number> = Extract<
  DivArrayLength<MakeArray<A>, MakeArray<B>>,
  number
>;
