import { constants } from "../../src/core/index.js";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const fn = () => {};
const obj = { a: "test" };

const MISC = constants("misc", {
	red: 42,
	blue: fn,
	green: obj,
});

it("returns a constants wrapper", () => {
	expect(MISC).toHaveProperty("tagged");
	expect(MISC).toHaveProperty("untagged");
});

describe("the constants wrapper", () => {
	it("should have the declared values both as keys and values (tagged)", () => {
		expect(MISC.tagged).toHaveProperty("red");
		expect(MISC.tagged).toHaveProperty("blue");
		expect(MISC.tagged).toHaveProperty("green");

		expect(MISC.tagged.red).toBe(42);
		expect(MISC.tagged.green).toBe(obj);
		expect(MISC.tagged.blue).toBe(fn);
	});

	it("should have the declared values both as keys and values (untagged)", () => {
		expect(MISC.untagged).toHaveProperty("red");
		expect(MISC.untagged).toHaveProperty("green");
		expect(MISC.untagged).toHaveProperty("blue");

		expect(MISC.untagged.red).toBe(42);
		expect(MISC.untagged.green).toBe(obj);
		expect(MISC.untagged.blue).toBe(fn);
	});
});
