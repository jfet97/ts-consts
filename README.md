# ts-consts

[API Documentation](https://jfet97.github.io/ts-consts/)

## Why

Because enums are bad, and const enums are even worse.

## How

### Get started

The simplest way:

```ts
import { constantsUntagged, InferUnion } from "ts-consts";

const actions = constantsUntagged([
  "save",
  "reset",
  "cancel",
])

actions.save // "save"
actions.reset // "reset"
actions.cancel // "cancel"

type actions = typeof actions;
// {
//     readonly save: "save";
//     readonly reset: "reset";
//     readonly cancel: "cancel";
// }

type actions_u = InferUnion<actions>;
// "save" | "reset" | "cancel"
```

To customize keys and values:

```ts
import { constantsUntagged, InferUnion } from "ts-consts";

const ACTIONS = constantsUntagged({
  SAVE: "save",
  RESET: "reset",
  CANCEL: "cancel",
})

ACTIONS.SAVE // "save"
ACTIONS.RESET // "reset"
ACTIONS.CANCEL // "cancel"

type ACTIONS = typeof ACTIONS;
// {
//     readonly SAVE: "save";
//     readonly RESET: "reset";
//     readonly CANCEL: "cancel";
// }

type ACTIONS_u = InferUnion<ACTIONS>;
// "save" | "reset" | "cancel"
```

### Nominal typing

```ts
import { constantsTagged, InferUnion } from "ts-consts";

const ACTIONS = constantsTagged("ACTIONS", {
  SAVE: "save",
  RESET: "reset",
  CANCEL: "cancel",
})

ACTIONS.SAVE // Tagged<"save", "ACTIONS">
ACTIONS.RESET // Tagged<"reset", "ACTIONS">
ACTIONS.CANCEL // Tagged<"cancel", "ACTIONS">

type ACTIONS = typeof ACTIONS;
// {
//     readonly SAVE: Tagged<"save", "ACTIONS">;
//     readonly RESET: Tagged<"reset", "ACTIONS">;
//     readonly CANCEL: Tagged<"cancel", "ACTIONS">;
// }

type ACTIONS_u = InferUnion<ACTIONS>
// Tagged<"save", "ACTIONS"> | Tagged<"reset", "ACTIONS"> | Tagged<"cancel", "ACTIONS">


// so now the following is an error:
let a_v0: ACTIONS_u = "save" // Type '"save"' is not assignable to type 'ACTIONS_u'

// only this is allowed now:
let a_v1: ACTIONS_u = ACTIONS.SAVE;
```

### Both

```ts
import { constants, InferUnions } from "ts-consts";

const ACTIONS = constants("ACTIONS", {
  SAVE: "save",
  RESET: "reset",
  CANCEL: "cancel",
});

ACTIONS.untagged;
// {
//     readonly SAVE: "save";
//     readonly RESET: "reset";
//     readonly CANCEL: "cancel";
// }

ACTIONS.tagged;
// {
//     readonly SAVE: Tagged<"save", "ACTIONS">;
//     readonly RESET: Tagged<"reset", "ACTIONS">;
//     readonly CANCEL: Tagged<"cancel", "ACTIONS">;
// }

type ACTIONS = typeof ACTIONS;

type ACTIONS_us = InferUnions<typeof ACTIONS>;

ACTIONS_us["untagged"]
// "save" | "reset" | "cancel"

ACTIONS_us["tagged"]
// Tagged<"save", "ACTIONS"> | Tagged<"reset", "ACTIONS"> | Tagged<"cancel", "ACTIONS">
```

## Utils

### deriveUntaggedConstants

```js
import { constantsUntagged, deriveUntaggedConstants } from "ts-consts";

const ACTIONS = constantsUntagged({
  SAVE: "save",
  RESET: "reset",
  CANCEL: "cancel",
});

const ACTIONS_keys = deriveUntaggedConstants(ACTIONS);
// {
//     readonly SAVE: "SAVE";
//     readonly RESET: "RESET";
//     readonly CANCEL: "CANCEL";
// }
```

### removeTags

```ts
import { constantsTagged, removeTags } from "ts-consts";

const ACTIONS = constantsTagged("ACTIONS", {
	SAVE: "save",
	RESET: "reset",
	CANCEL: "cancel",
});

const ACTIONS_untagged = removeTags(ACTIONS);
// {
//     readonly SAVE: "save";
//     readonly RESET: "reset";
//     readonly CANCEL: "cancel";
// }
```
