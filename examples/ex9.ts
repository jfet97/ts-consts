import { fromTupleNumeric } from "../src/index.js";

const DIRECTIONS1 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"]);
/*
{
  readonly UP: 0;
  readonly DOWN: 1;
  readonly LEFT: 2;
  readonly RIGHT: 3;
}
*/

const DIRECTIONS2 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 3);
/*
{
  readonly UP: 3;
  readonly DOWN: 4;
  readonly LEFT: 5;
  readonly RIGHT: 6;
}
*/

const DIRECTIONS3 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 0, 10);
/*
{
  readonly UP: 0;
  readonly DOWN: 10;
  readonly LEFT: 20;
  readonly RIGHT: 30;
}
*/

const DIRECTIONS4 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 5, 10);
/*
{
  readonly UP: 5;
  readonly DOWN: 15;
  readonly LEFT: 25;
  readonly RIGHT: 35;
}
*/

const DIRECTIONS5 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], -5);
/*
{
  readonly UP: -5;
  readonly DOWN: -4;
  readonly LEFT: -3;
  readonly RIGHT: -2;
}
*/

const DIRECTIONS6 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], -20, 10);
/*
{
  readonly UP: -20;
  readonly DOWN: -10;
  readonly LEFT: 0;
  readonly RIGHT: 10;
}
*/

const DIRECTIONS7 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], -20, -10);
/*
{
  readonly UP: -20;
  readonly DOWN: -30;
  readonly LEFT: -40;
  readonly RIGHT: -50;
}
*/

const DIRECTIONS8 = fromTupleNumeric(["UP", "DOWN", "LEFT", "RIGHT"], 20, -10);
/*
{
  readonly UP: 20;
  readonly DOWN: 10;
  readonly LEFT: 0;
  readonly RIGHT: -10;
}
*/
