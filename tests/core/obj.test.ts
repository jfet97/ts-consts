import { constants } from "../../src/core/index.js";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const fn = () => {};
const obj = { a: "test" };

const COLOURS = constants("colours", {
	red: 42,
	blue: fn,
	green: obj,
});

it("returns a constants wrapper", () => {
	expect(COLOURS).toHaveProperty("tagged");
	expect(COLOURS).toHaveProperty("untagged");
});

describe("the constants wrapper", () => {
	it("should mantain the key-values pairs from the input record (tagged)", () => {
		expect(COLOURS.tagged).toHaveProperty("red");
		expect(COLOURS.tagged).toHaveProperty("blue");
		expect(COLOURS.tagged).toHaveProperty("green");

		expect(COLOURS.tagged.red).toBe(42);
		expect(COLOURS.tagged.green).toBe(obj);
		expect(COLOURS.tagged.blue).toBe(fn);
	});

	it("should mantain the key-values pairs from the input record (untagged)", () => {
		expect(COLOURS.untagged).toHaveProperty("red");
		expect(COLOURS.untagged).toHaveProperty("green");
		expect(COLOURS.untagged).toHaveProperty("blue");

		expect(COLOURS.untagged.red).toBe(42);
		expect(COLOURS.untagged.green).toBe(obj);
		expect(COLOURS.untagged.blue).toBe(fn);
	});
});
