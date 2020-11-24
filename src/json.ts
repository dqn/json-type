import type { Tokenize } from "./tokenize";
import type { Parse } from "./parse";

type Clean<O> = { [K in keyof O]: O[K] };

export type JsonType<S extends string> = Clean<Parse<Tokenize<S>>>;
