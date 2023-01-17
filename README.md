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

### Numeric

Use the primitive `fromTupleNumeric` to create a numeric set of constants. By default it starts from `0` and the increment is `1`:

```ts
import { fromTupleNumeric } from "ts-consts";

const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"]);
/*
{
  readonly UP: 0;
  readonly DOWN: 1;
  readonly LEFT: 2;
  readonly RIGHT: 3;
}
*/
```

You can set the starting value:
```ts
import { fromTupleNumeric } from "ts-consts";

const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 3);
/*
{
  readonly UP: 3;
  readonly DOWN: 4;
  readonly LEFT: 5;
  readonly RIGHT: 6;
}
*/
```

You can set the increment value:
```ts
import { fromTupleNumeric } from "ts-consts";

const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 0, 10);
/*
{
  readonly UP: 0;
  readonly DOWN: 10;
  readonly LEFT: 20;
  readonly RIGHT: 30;
}
*/
```

You can set both:
```ts
import { fromTupleNumeric } from "ts-consts";

const DIRECTIONS = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 5, 10);
/*
{
  readonly UP: 5;
  readonly DOWN: 15;
  readonly LEFT: 25;
  readonly RIGHT: 35;
}
*/
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

### Duplicate values

This library won't let you have different keys with the same value. This invariant is enforced at compile time for the `fromObject` and `fromTuple` built-ins. Other primitives have chekcs at runtime. The developer experience of the current solution is effective but not the best at the moment.

```ts
import { fromObject, fromTuple } from "ts-consts";

/*
Argument of type '{ SAVE: number; RESET: number; CANCEL: number; }' is not assignable to parameter of type
'"key 'RESET' has duplicated value" | "key 'CANCEL' has duplicated value"'.
*/
const ACTIONS = fromObject({
  SAVE: 0,
  RESET: 1,
  CANCEL: 1,
});

/*
Argument of type 'string[]' is not assignable to parameter of type
'("value at index 0 is duplicated" | "value at index 2 is duplicated") & ...'.
*/
const DIRECTIONS = fromTuple([
  "UP",
  "DOWN",
  "UP"
]);
```

## Utils

### fromObjectKeys

From the keys of an object.

```ts
import { fromObjectKeys } from "ts-consts";

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
```

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