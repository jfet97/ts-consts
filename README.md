# ts-consts

[API Documentation](https://jfet97.github.io/ts-consts/)

## Why

Because enums are bad, and const enums are even worse.

## How

### Get started

The simplest way:

```ts
import { fromTuple, Elements } from "ts-consts";

const ACTIONS = fromTuple([
  "SAVE",
  "RESET",
  "CANCEL",
])

ACTIONS.SAVE // "SAVE"
ACTIONS.RESET // "RESET"
ACTIONS.CANCEL // "CANCEL"

type Actions = typeof ACTIONS;
// {
//     readonly SAVE: "SAVE";
//     readonly RESET: "RESET";
//     readonly CANCEL: "CANCEL";
// }

type ActionsElements = Elements<Actions>;
// "SAVE" | "RESET" | "CANCEL"
```

To customize keys and values:

```ts
import { fromObject, Elements } from "ts-consts";

const ACTIONS = fromObject({
  SAVE: "save",
  RESET: "reset",
  CANCEL: "cancel",
})

ACTIONS.SAVE // "save"
ACTIONS.RESET // "reset"
ACTIONS.CANCEL // "cancel"

type Actions = typeof ACTIONS;
// {
//     readonly SAVE: "save";
//     readonly RESET: "reset";
//     readonly CANCEL: "cancel";
// }

type ActionsElements = Elements<Actions>;
// "save" | "reset" | "cancel"
```

### Nominal typing

```ts
import { Elements, fromObject, tag } from "ts-consts";

// a 'pipe' like the one in the ex4.ts example
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
```

## Utils

### untag

```ts
import { Elements, fromObject, tag, untag } from "ts-consts";

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
```

### MapConstants

`MapConstants` helps us to create a type that is safely indexable only by a record of constants.

Given a record type containing only untagged `PropertyKeys`, as the `ACTIONS` type below, and a type which uses the properties' types of the first as keys, it forces the latter to use __ALL AND ONLY__ these properties.

```ts
import { MapConstants, fromTuple } from "ts-consts";

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
```