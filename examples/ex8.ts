import { fromObject, fromTuple } from "../src/index.js";

const ACTIONS = fromObject({
	SAVE: 0,
	RESET: 1,
	CANCEL: 1,
});

const DIRECTIONS = fromTuple(["UP", "DOWN", "UP"]);
