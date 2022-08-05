import { constants, InferTaggedUnion } from "../src/index.js";

 

const test2 = constants('boh', { a: 123, b: 'ciao', e: 420n });
type t2 = InferTaggedUnion<typeof test2>;
