import { constants } from "../../src/core/index.js";

const EXERCISES = constants("exercises", [
	"PROGRAMMING_EXERCISE",
	"MULTIPLE_CHOICE",
	"FREE_TEXT",
]);

it("returns a constants wrapper", () => {
	expect(EXERCISES).toHaveProperty("tagged");
	expect(EXERCISES).toHaveProperty("untagged");
});

describe("the constants wrapper", () => {
	it("should have the declared values both as keys and values (tagged)", () => {
		expect(EXERCISES.tagged).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES.tagged).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES.tagged).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.tagged.PROGRAMMING_EXERCISE).toBe("PROGRAMMING_EXERCISE");
		expect(EXERCISES.tagged.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.tagged.FREE_TEXT).toBe("FREE_TEXT");
	});

	it("should have the declared values both as keys and values (untagged)", () => {
		expect(EXERCISES.untagged).toHaveProperty("PROGRAMMING_EXERCISE");
		expect(EXERCISES.untagged).toHaveProperty("MULTIPLE_CHOICE");
		expect(EXERCISES.untagged).toHaveProperty("FREE_TEXT");

		expect(EXERCISES.untagged.PROGRAMMING_EXERCISE).toBe(
			"PROGRAMMING_EXERCISE",
		);
		expect(EXERCISES.untagged.MULTIPLE_CHOICE).toBe("MULTIPLE_CHOICE");
		expect(EXERCISES.untagged.FREE_TEXT).toBe("FREE_TEXT");
	});
});
