import type { Tokenize } from "./tokenize";
import type { Parse } from "./parse";

export type JsonType<S extends string> = Parse<Tokenize<S>>;
