import {
	DigitNumber,
	FromDigitNumber,
	MakeDigitNumber,
	MulSign,
	Normalize,
	Num,
	Sign,
	ToDigitNumber,
	ToNumber,
	ToString,
} from "../defs.js";
import { MulDigits } from "./digits.js";

export type MulDigitNumbers<
	T extends DigitNumber,
	U extends DigitNumber,
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, MulDigits<Num<T>, Num<U>>>;

export type Mul<
	T extends number | bigint,
	U extends number | bigint,
> = ToNumber<
	FromDigitNumber<
		Normalize<
			MulDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
		>
	>
>;
