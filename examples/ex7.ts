import { fromObjectKeys } from "../src/index.js";

const ACTIONS = fromObjectKeys({
	SAVE: 0,
	RESET: 1,
	CANCEL: 2,
});
// {
//     readonly SAVE: "SAVE";
//     readonly RESET: "RESET";
//     readonly CANCEL: "CANCEL";
// }
