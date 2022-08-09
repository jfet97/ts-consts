import {
	InferTaggedUnion,
	constants,
	constantsFromKeyofMap,
	untaggedMapFromKeyofMap,
} from "../src/index.js";

const test2 = constants(`boh`, { a: 123, b: `ciao`, e: 420n });
type t2 = InferTaggedUnion<typeof test2>;

const k1 = constantsFromKeyofMap("tag1", test2.tagged);
k1.tagged;
k1.untagged;

const k2 = constantsFromKeyofMap("tag2", test2.tagged);
k2.tagged;
k2.untagged;

const k3 = untaggedMapFromKeyofMap(test2.untagged);
k3.a;

const k4 = untaggedMapFromKeyofMap(test2.tagged);
k4.a;
