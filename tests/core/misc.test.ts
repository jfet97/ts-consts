import {
	constants,
	deriveConstants,
	deriveUntaggedConstants,
} from "../../src/core/index.js";

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
