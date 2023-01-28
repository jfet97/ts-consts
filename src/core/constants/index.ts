/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, Mul } from "../../utils/index.js";
import {
	ForbidDuplicatesInRecordType,
	ForbidDuplicatesInTupleType,
	ShallowResolve,
	StringToNumber,
} from "../../utils/types/misc.js";

/**
 * Create a record of constants from a tuple of PropertyKeys, using each element both as key and value
 *
 * @param tuple - The input tuple containing the constants
 * @returns A record of constants
 */
export function fromTuple<
	const T extends ForbidDuplicatesInTupleType<T> & readonly PropertyKey[],
>(
	tuple: T,
): ShallowResolve<Readonly<{ [I in keyof T & `${number}` as T[I]]: T[I] }>> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return Object.freeze(
		Object.fromEntries((tuple as any[]).map(el => [el, el])),
	);
}

/**
 * Create a record of constants from a record containing arbitrary values
 *
 * @param object - The input record containing the keys and their values
 * @returns A record of constants
 */
export function fromObject<
	const T extends ForbidDuplicatesInRecordType<T> &
		Readonly<Record<PropertyKey, unknown>>,
>(object: T): Readonly<T> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return Object.freeze(JSON.parse(JSON.stringify(object)));
}

/**
 * Create a record of constants from the keys of a record
 *
 * @param object - The input record from which extract the keys
 * @returns A record of constants
 */
export function fromObjectKeys<const T extends object>(
	object: T,
): Readonly<{ [K in keyof T]: K }> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return fromTuple(Object.keys(object)) as any;
}

/**
 * Create a record of numeric constants from a tuple of PropertyKeys, using each element as key and an incremental counter as value
 *
 * @param tuple - The input tuple containing the keys
 * @param start - The starting value of the counter
 * @returns A record of constants
 */
export function fromTupleNumeric<
	const T extends ForbidDuplicatesInTupleType<T> & readonly PropertyKey[],
	START extends number = 0,
	STEP extends number = 1,
>(
	tuple: T,
	start: START = 0 as START,
	step: STEP = 1 as STEP,
): ShallowResolve<
	Readonly<{
		[I in keyof T & `${number}` as T[I]]: Add<
			Mul<StringToNumber<I>, STEP>,
			START
		>;
	}>
> {
	if (step === 0)
		throw new Error(`${step} is an invalid step value: it should be != 0`);
	if (!Number.isInteger(start))
		throw new Error(
			`${start} is an invalid start value: it should be an integer`,
		);
	if (!Number.isInteger(step))
		throw new Error(
			`${step} is an invalid step value: it should be an integer`,
		);

	return Object.freeze(
		Object.fromEntries(
			(tuple as any[]).map((key, i) => [key, i * step + start]),
		),
	);
}
