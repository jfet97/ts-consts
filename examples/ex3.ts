import { Elements, fromObject } from "../src/index.js";

const ACTIONS = fromObject({
	SAVE: "save",
	RESET: "reset",
	CANCEL: "cancel",
});

ACTIONS.SAVE; // "save"
ACTIONS.RESET; // "reset"
ACTIONS.CANCEL; // "cancel"

type Actions = typeof ACTIONS;
// {
//     readonly SAVE: "save";
//     readonly RESET: "reset";
//     readonly CANCEL: "cancel";
// }

type ActionsElements = Elements<Actions>;
// "save" | "reset" | "cancel"
