/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * constants
 */

import {
	fromObject,
	fromObjectKeys,
	fromTuple,
	fromTupleNumeric,
} from "../../src/index.js";

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

describe(fromTupleNumeric, () => {
	it("should extract the keys from the input tuple", () => {
		const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"]);

		expect(DIRECTIONS).toHaveProperty("UP");
		expect(DIRECTIONS).toHaveProperty("DOWN");
		expect(DIRECTIONS).toHaveProperty("LEFT");
		expect(DIRECTIONS).toHaveProperty("RIGHT");
	});

	it("should automatically increase by 1 the values starting from 0", () => {
		const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"]);

		expect(DIRECTIONS.UP).toBe(0);
		expect(DIRECTIONS.DOWN).toBe(1);
		expect(DIRECTIONS.LEFT).toBe(2);
		expect(DIRECTIONS.RIGHT).toBe(3);
	});

	it("should automatically increase by 1 the values starting from 3", () => {
		const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 3);

		expect(DIRECTIONS.UP).toBe(3);
		expect(DIRECTIONS.DOWN).toBe(4);
		expect(DIRECTIONS.LEFT).toBe(5);
		expect(DIRECTIONS.RIGHT).toBe(6);
	});

	it("should automatically increase by 10 the values starting from 0", () => {
		const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 0, 10);

		expect(DIRECTIONS.UP).toBe(0);
		expect(DIRECTIONS.DOWN).toBe(10);
		expect(DIRECTIONS.LEFT).toBe(20);
		expect(DIRECTIONS.RIGHT).toBe(30);
	});

	it("should automatically increase by 10 the values starting from 10", () => {
		const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 5, 10);

		expect(DIRECTIONS.UP).toBe(5);
		expect(DIRECTIONS.DOWN).toBe(15);
		expect(DIRECTIONS.LEFT).toBe(25);
		expect(DIRECTIONS.RIGHT).toBe(35);
	});

	it("should throw because start is < 0", () => {
		expect(() =>
			fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], -2),
		).toThrowError("-2 is an invalid start value: it should be >= 0");
	});

	it("should throw because start is not an integer", () => {
		expect(() =>
			fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 1.5),
		).toThrowError("1.5 is an invalid start value: it should be an integer");
	});

	it("should throw because step is < 1", () => {
		expect(() =>
			fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 0, 0),
		).toThrowError("0 is an invalid step value: it should be >= 1");
	});

	it("should throw because step is not an integer", () => {
		expect(() =>
			fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 0, 1.5),
		).toThrowError("1.5 is an invalid step value: it should be an integer");
	});
});
