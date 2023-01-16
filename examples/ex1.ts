/* eslint-disable @typescript-eslint/no-namespace */
import {
	Elements,
	MapConstants,
	fromObject,
	fromObjectKeys,
	fromTuple,
	tag,
	untag,
} from "../src/index.js";

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

namespace fOK {
	const constants = fromObjectKeys({ a: 123, b: `ciao`, e: 420n });
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

namespace mapConstants {
	const ACTIONS = fromTuple(["SAVE", "RESET", "CANCEL"]);

	type Actions = typeof ACTIONS;

	type ActionHandlers = MapConstants<
		Actions,
		// if you either remove a key or add something extraneous
		// you'll get an error
		{
			[ACTIONS.SAVE]: (...args: any) => any;
			[ACTIONS.RESET]: (...args: any) => any;
			[ACTIONS.CANCEL]: (...args: any) => any;
		}
	>;
	// {
	//  save: (...args: any) => any;
	//  reset: (...args: any) => any;
	//  cancel: (...args: any) => any;
	// }
}
