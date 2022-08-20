import {
	constants,
	deriveConstants,
	deriveUntaggedConstants,
	removeTags,
} from "../../src/core/index.js";

import { expectType } from "tsd";

const MISC = constants("misc", {
	a: 1,
	b: 2,
	c: 3,
});

const CONSTS_tagged = deriveConstants("derived", MISC.untagged);
const CONSTS_untagged = deriveUntaggedConstants(MISC.untagged);

describe("deriveConstants", () => {
	it("should return a constants wrapper", () => {
		expect(CONSTS_tagged).toHaveProperty("tagged");
		expect(CONSTS_tagged).toHaveProperty("untagged");
	});

	it("should return a constants wrapper that should have the keys of the input record both as keys and values", () => {
		expect(CONSTS_tagged.tagged).toHaveProperty("a");
		expect(CONSTS_tagged.tagged).toHaveProperty("b");
		expect(CONSTS_tagged.tagged).toHaveProperty("c");

		expect(CONSTS_tagged.tagged.a).toBe("a");
		expect(CONSTS_tagged.tagged.b).toBe("b");
		expect(CONSTS_tagged.tagged.c).toBe("c");
	});
});

describe("deriveUntaggedConstants", () => {
	it("should return a record that should have the keys of the input record both as keys and values", () => {
		expect(CONSTS_untagged).toHaveProperty("a");
		expect(CONSTS_untagged).toHaveProperty("b");
		expect(CONSTS_untagged).toHaveProperty("c");

		expect(CONSTS_untagged.a).toBe("a");
		expect(CONSTS_untagged.b).toBe("b");
		expect(CONSTS_untagged.c).toBe("c");
	});
});

describe("removeTags", () => {
	it("should only remove tags from the input record of tagged constants", () => {
		const tagsRemoved = removeTags(MISC.tagged);

		expect(tagsRemoved).toEqual(MISC.tagged);
		expectType<typeof MISC.untagged>(tagsRemoved);
	});
});
