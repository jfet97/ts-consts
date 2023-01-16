/**
 * constants
 */

import { fromObject, fromObjectKeys, fromTuple } from "../../src/index.js";

describe(fromTuple, () => {
	const EXERCISES = fromTuple([
		"PROGRAMMING_EXERCISE",
		"MULTIPLE_CHOICE",
		"FREE_TEXT",
	]);

	it("should have the input values both as keys and values", () => {
		expect(EXERCISES).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.PROGRAMMING_EXERCISE).toBe("PROGRAMMING_EXERCISE");
		expect(EXERCISES.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.FREE_TEXT).toBe("FREE_TEXT");
	});
});

describe(fromObject, () => {
	const EXERCISES = fromObject({
		PROGRAMMING_EXERCISE: 0,
		MULTIPLE_CHOICE: 1,
		FREE_TEXT: 2,
	});

	it("should be the same as the input object", () => {
		expect(EXERCISES).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.PROGRAMMING_EXERCISE).toBe(0);
		expect(EXERCISES.MULTIPLE_CHOICE).toBe(1);
		expect(EXERCISES.FREE_TEXT).toBe(2);
	});
});

describe(fromObjectKeys, () => {
	const EXERCISES = fromObjectKeys({
		PROGRAMMING_EXERCISE: 0,
		MULTIPLE_CHOICE: 1,
		FREE_TEXT: 2,
	});

	it("should extract the keys from the input object", () => {
		expect(EXERCISES).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.PROGRAMMING_EXERCISE).toBe("PROGRAMMING_EXERCISE");
		expect(EXERCISES.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.FREE_TEXT).toBe("FREE_TEXT");
	});
});
