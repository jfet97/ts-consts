/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Constants,
	ConstantsWrapper,
	InferTaggedConstants,
	InferUntaggedConstants,
} from "../types/consts.js";
import { ForbidSharedKeyTypes } from "../types/utils.js";
import { Narrow } from "../types/narrowable.js";
import { TagSupertype } from "../types/tag.js";

/**
 * Create a Constants object from an array of PropertyKeys, using each element both as key and value
 *
 * @param tag - The tag used to enable nominal typing
 * @param arr - The input tuple containing the constants
 * @returns A Constants object
 */
export function constants<
	Tag extends TagSupertype,
	N extends PropertyKey,
	T extends readonly N[],
>(
	tag: Tag,
	arr: ForbidSharedKeyTypes<[...T]>,
): ConstantsWrapper<{ [I in keyof T & `${number}` as T[I]]: T[I] }, Tag>;
/**
 * Create a Constants object from a record containing arbitrary values
 *
 * @param tag - The tag used to enable nominal typing
 * @param obj - The input record containing the keys and their values
 * @returns A Constants object
 */
export function constants<
	Tag extends TagSupertype,
	T extends Record<PropertyKey, unknown>,
>(tag: Tag, obj: ForbidSharedKeyTypes<Narrow<T>>): ConstantsWrapper<T, Tag>;
export function constants(tag: PropertyKey, x: any): Constants {
	let constants = null;

	if (Array.isArray(x)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		constants = Object.freeze(Object.fromEntries(x.map(el => [el, el])));
	} else {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		constants = Object.freeze({ ...x });
	}

	return {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		tagged: constants,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		untagged: constants,
	};
}

/**
 * Create a record of tagged constants from an array of PropertyKeys, using each element both as key and value
 *
 * @param tag - The tag used to enable nominal typing
 * @param arr - The input tuple containing the constants
 * @returns A record of tagged constants
 */
export function constantsTagged<
	Tag extends TagSupertype,
	N extends PropertyKey,
	T extends readonly N[],
>(
	tag: Tag,
	arr: ForbidSharedKeyTypes<[...T]>,
): InferTaggedConstants<
	ConstantsWrapper<{ [I in keyof T & `${number}` as T[I]]: T[I] }, Tag>
>;
/**
 * Create a record of tagged constants from a record containing arbitrary values
 *
 * @param tag - The tag used to enable nominal typing
 * @param obj - The input record containing the keys and their values
 * @returns A record of tagged constants
 */
export function constantsTagged<
	Tag extends TagSupertype,
	T extends Record<PropertyKey, unknown>,
>(
	tag: Tag,
	obj: ForbidSharedKeyTypes<Narrow<T>>,
): InferTaggedConstants<ConstantsWrapper<T, Tag>>;
export function constantsTagged(tag: PropertyKey, x: any): Constants {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return constants(tag, x).tagged as any;
}

/**
 * Create a record of untagged constants from an array of PropertyKeys, using each element both as key and value
 *
 * @param arr - The input tuple containing the constants
 * @returns A record of untagged constants
 */
export function constantsUntagged<
	N extends PropertyKey,
	T extends readonly N[],
>(
	arr: ForbidSharedKeyTypes<[...T]>,
): InferUntaggedConstants<
	ConstantsWrapper<{ [I in keyof T & `${number}` as T[I]]: T[I] }, PropertyKey>
>;
/**
 * Create a record of untagged constants from a record containing arbitrary values
 *
 * @param obj - The input record containing the keys and their values
 * @returns A record of untagged constants
 */
export function constantsUntagged<T extends Record<PropertyKey, unknown>>(
	obj: ForbidSharedKeyTypes<Narrow<T>>,
): InferUntaggedConstants<ConstantsWrapper<T, PropertyKey>>;
export function constantsUntagged(x: any): Constants {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return constants(null as any, x).untagged as any;
}
