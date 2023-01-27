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
import { AddDigits } from "./digits.js";
import { CompareDigits } from "../compare.js";
import { SubDigits } from "../subtraction/digits.js";

type AddDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = Sign<T> extends Sign<U>
	? MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>
	: CompareDigits<Num<T>, Num<U>> extends 1
	? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
	: MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>;

export type Add<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			AddDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;
