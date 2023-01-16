/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ForbidDuplicatesInRecordType,
	ForbidDuplicatesInTupleType,
	ShallowResolve,
} from "../../utils/types.js";

/**
 * Create a record of constants from an array of PropertyKeys, using each element both as key and value
 *
 * @param tuple - The input tuple containing the constants
 * @returns A record of constants
 */
export function fromTuple<const T extends ForbidDuplicatesInTupleType<T>>(
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
export function fromObject<const T extends ForbidDuplicatesInRecordType<T>>(
	object: T,
): Readonly<T> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return Object.freeze(JSON.parse(JSON.stringify(object)));
}

/**
 * Create a record of constants from the keys of a record
 *
 * @param object - The input record from which extract the keys
 * @returns A record of constants
 */
export function fromObjectKeys<T extends object>(
	object: T,
): Readonly<{ [K in keyof T]: K }> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return fromTuple(Object.keys(object)) as any;
}
