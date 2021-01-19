import type { Recurse } from "./recurse";

type MakeTupleByLengthCore<
  Length,
  Tuple extends never[] = []
> = Tuple["length"] extends Length
  ? Tuple
  : { __rec: MakeTupleByLengthCore<Length, [...Tuple, never]> };

type MakeTupleByLength<Length> = Extract<
  Recurse<MakeTupleByLengthCore<Length>>,
  never[]
>;

type DecrementTupleLength<A extends never[]> = A extends [
  infer _,
  ...infer Rest
]
  ? Extract<Rest, never[]>
  : never;

type AddTupleLength<A extends never[], B extends never[]> = [
  ...A,
  ...B
]["length"];

type MulTupleLengthCore<
  A extends never[],
  B extends never[],
  Result extends never[] = []
> = B["length"] extends 0
  ? Result["length"]
  : {
      __rec: MulTupleLengthCore<A, DecrementTupleLength<B>, [...Result, ...A]>;
    };

type MulTupleLength<A extends never[], B extends never[]> = Recurse<
  MulTupleLengthCore<A, B>
>;

export type Add<A, B> = AddTupleLength<
  MakeTupleByLength<A>,
  MakeTupleByLength<B>
>;

export type Mul<A, B> = MulTupleLength<
  MakeTupleByLength<A>,
  MakeTupleByLength<B>
>;
