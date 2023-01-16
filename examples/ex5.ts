import { Elements, fromObject, tag, untag } from "../src/index.js";

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
  untag
);

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