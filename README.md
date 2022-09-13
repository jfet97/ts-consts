# ts-consts

[API Documentation](https://jfet97.github.io/ts-consts/)

## Why

Because enums are bad, and const enums are even worse.

## How

The simplest way:

```ts
import { constantsUntagged, InferUnion } from "ts-consts";

const actions = constantsUntagged([
  "save",
  "reset",
  "cancel"
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

type actions_u = InferUnion<actions>
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

type ACTIONS_u = InferUnion<ACTIONS>
// "save" | "reset" | "cancel"
```
