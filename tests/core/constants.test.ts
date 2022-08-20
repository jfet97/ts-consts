import {
	constants,
	constantsTagged,
	constantsUntagged,
} from "../../src/core/index.js";

/**
 * constants
 */

describe(constants, () => {
	const EXERCISES = constants("exercises", [
		"PROGRAMMING_EXERCISE",
		"MULTIPLE_CHOICE",
		"FREE_TEXT",
	]);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const fn = () => {};
	const obj = { a: "test" };

	const COLOURS = constants("colours", {
		red: 42,
		blue: fn,
		green: obj,
	});

	it("returns a constants wrapper", () => {
		expect(EXERCISES).toHaveProperty("tagged");
		expect(EXERCISES).toHaveProperty("untagged");
	});

	it("returns a constants wrapper", () => {
		expect(COLOURS).toHaveProperty("tagged");
		expect(COLOURS).toHaveProperty("untagged");
	});

	it("should have the input values both as keys and values (tagged)", () => {
		expect(EXERCISES.tagged).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES.tagged).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES.tagged).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.tagged.PROGRAMMING_EXERCISE).toBe("PROGRAMMING_EXERCISE");
		expect(EXERCISES.tagged.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.tagged.FREE_TEXT).toBe("FREE_TEXT");
	});

	it("should have the input values both as keys and values (untagged)", () => {
		expect(EXERCISES.untagged).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES.untagged).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES.untagged).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.untagged.PROGRAMMING_EXERCISE).toBe(
			"PROGRAMMING_EXERCISE",
		);
		expect(EXERCISES.untagged.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.untagged.FREE_TEXT).toBe("FREE_TEXT");
	});

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

/**
 * constantsTagged
 */

describe(constantsTagged, () => {
	const EXERCISES = constantsTagged("exercises", [
		"PROGRAMMING_EXERCISE",
		"MULTIPLE_CHOICE",
		"FREE_TEXT",
	]);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const fn = () => {};
	const obj = { a: "test" };

	const COLOURS = constantsTagged("colours", {
		red: 42,
		blue: fn,
		green: obj,
	});

	it("should have the input values both as keys and values (tagged)", () => {
		expect(EXERCISES).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.PROGRAMMING_EXERCISE).toBe("PROGRAMMING_EXERCISE");
		expect(EXERCISES.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.FREE_TEXT).toBe("FREE_TEXT");
	});

	it("should mantain the key-values pairs from the input record (tagged)", () => {
		expect(COLOURS).toHaveProperty("red");
		expect(COLOURS).toHaveProperty("blue");
		expect(COLOURS).toHaveProperty("green");

		expect(COLOURS.red).toBe(42);
		expect(COLOURS.green).toBe(obj);
		expect(COLOURS.blue).toBe(fn);
	});
});

/**
 * constantsUntagged
 */

describe(constantsUntagged, () => {
	const EXERCISES = constantsUntagged([
		"PROGRAMMING_EXERCISE",
		"MULTIPLE_CHOICE",
		"FREE_TEXT",
	]);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const fn = () => {};
	const obj = { a: "test" };

	const COLOURS = constantsUntagged({
		red: 42,
		blue: fn,
		green: obj,
	});

	it("should have the input values both as keys and values (untagged)", () => {
		expect(EXERCISES).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.PROGRAMMING_EXERCISE).toBe("PROGRAMMING_EXERCISE");
		expect(EXERCISES.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.FREE_TEXT).toBe("FREE_TEXT");
	});

	it("should mantain the key-values pairs from the input record (untagged)", () => {
		expect(COLOURS).toHaveProperty("red");
		expect(COLOURS).toHaveProperty("blue");
		expect(COLOURS).toHaveProperty("green");

		expect(COLOURS.red).toBe(42);
		expect(COLOURS.green).toBe(obj);
		expect(COLOURS.blue).toBe(fn);
	});
});
