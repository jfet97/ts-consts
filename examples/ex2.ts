import { Elements, fromTuple } from "../src/index.js";

const ACTIONS = fromTuple(["SAVE", "RESET", "CANCEL"]);

ACTIONS.SAVE; // "SAVE"
ACTIONS.RESET; // "RESET"
ACTIONS.CANCEL; // "CANCEL"

type Actions = typeof ACTIONS;
// {
//     readonly SAVE: "SAVE";
//     readonly RESET: "RESET";
//     readonly CANCEL: "CANCEL";
// }

type ActionsElements = Elements<Actions>;
// "SAVE" | "RESET" | "CANCEL"
