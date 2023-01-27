import {
	DigitNumber,
	FromDigitNumber,
	InvertSign,
	MakeDigitNumber,
	Normalize,
	Num,
	Sign,
	ToDigitNumber,
	ToNumber,
	ToString,
} from "../defs.js";
import { AddDigits } from "../addition/digits.js";
import { CompareDigits } from "../compare.js";
import { SubDigits } from "./digits.js";

type SubDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = Sign<T> extends Sign<U>
	? CompareDigits<Num<T>, Num<U>> extends 1
		? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
		: MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>
	: MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>;

export type Sub<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			SubDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;
