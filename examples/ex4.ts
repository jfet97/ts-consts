import { Elements, fromObject, tag } from "../src/index.js";

function pipe<const A>(a: A): A;
function pipe<const A, B>(a: A, ab: (a: A) => B): B;
function pipe<const A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
function pipe<const A, B, C, D>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
): D;
function pipe(
	a: unknown,
	ab?: Function,
	bc?: Function,
	cd?: Function
): unknown {
	switch (arguments.length) {
		case 1:
			return a;
		case 2:
			return ab!(a);
		case 3:
			return bc!(ab!(a));
		case 4:
			return cd!(bc!(ab!(a)));
		default: {
			let ret = arguments[0];
			for (let i = 1; i < arguments.length; i++) {
				ret = arguments[i](ret);
			}
			return ret;
		}
	}
}

const ACTIONS = pipe(
	{
		SAVE: "save",
		RESET: "reset",
		CANCEL: "cancel",
	},
	fromObject,
	tag("ACTIONS"),
);

ACTIONS.SAVE; // Tagged<"save", "ACTIONS">
ACTIONS.RESET; // Tagged<"reset", "ACTIONS">
ACTIONS.CANCEL; // Tagged<"cancel", "ACTIONS">

type Actions = typeof ACTIONS;
// {
//     readonly SAVE: Tagged<"save", "ACTIONS">;
//     readonly RESET: Tagged<"reset", "ACTIONS">;
//     readonly CANCEL: Tagged<"cancel", "ACTIONS">;
// }

type ActionsElements = Elements<Actions>;
// Tagged<"save", "ACTIONS"> | Tagged<"reset", "ACTIONS"> | Tagged<"cancel", "ACTIONS">


// now the following is an error:
const wrong: ActionsElements = "save"; // Type '"save"' is not assignable to type ActionsElements

// only this is allowed:
const right: ActionsElements = ACTIONS.SAVE;
