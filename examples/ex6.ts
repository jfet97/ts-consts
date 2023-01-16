import { MapConstants, fromTuple } from "../src/index.js";

const ACTIONS = fromTuple(["SAVE", "RESET", "CANCEL"]);

type Actions = typeof ACTIONS;

type ActionHandlers = MapConstants<
	Actions,
	// if you either remove a key or add something extraneous
	// you'll get an error
	{
		[ACTIONS.SAVE]: (...args: any) => any;
		[ACTIONS.RESET]: (...args: any) => any;
		[ACTIONS.CANCEL]: (...args: any) => any;
	}
>;
// {
//  save: (...args: any) => any;
//  reset: (...args: any) => any;
//  cancel: (...args: any) => any;
// }


declare const ahs: ActionHandlers;

// safely use of ACTIONS members as keys
ahs[ACTIONS.SAVE];
ahs[ACTIONS.RESET];
ahs[ACTIONS.CANCEL];