/* eslint-disable @typescript-eslint/no-namespace */
import { Elements, fromObject, fromTuple, tag, untag } from "../src/index.js";

namespace fO {
	const constants = fromObject({ a: 123, b: `ciao`, e: 420n });
	type t2 = Elements<typeof constants>;

	const tagged_constants = tag("tag")(constants);

	const untagged_constants = untag(tagged_constants);

	// @ts-expect-error cannot untag something that has no tag
	const ehm = untag(untagged_constants);
	// @ts-expect-error cannot tag twice something
	const ehm2 = tag("tag2")(tagged_constants);
}

namespace fT {
	const constants = fromTuple(["ciao", "come", "stai"]);

	type t2 = Elements<typeof constants>;

	const tagged_constants = tag("tag")(constants);

	const untagged_constants = untag(tagged_constants);

	// @ts-expect-error cannot untag something that has no tag
	const ehm = untag(untagged_constants);
	// @ts-expect-error cannot tag twice something
	const ehm2 = tag("tag2")(tagged_constants);
}
