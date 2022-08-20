import {
	Constants,
	ConstantsWrapper,
	InferTaggedConstants,
	InferUntaggedConstants,
} from "../types/consts.js";
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
	T extends readonly PropertyKey[] | [],
>(
	tag: Tag,
	arr: Narrow<T>,
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
>(tag: Tag, obj: Narrow<T>): ConstantsWrapper<T, Tag>;
export function constants(tag: PropertyKey, x: unknown[] | object): Constants {
	let constants = null;

	if (Array.isArray(x)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		constants = Object.freeze(Object.fromEntries(x.map(el => [el, el])));
	} else {
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
	T extends readonly PropertyKey[] | [],
>(
	tag: Tag,
	arr: Narrow<T>,
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
>(tag: Tag, obj: Narrow<T>): InferTaggedConstants<ConstantsWrapper<T, Tag>>;
export function constantsTagged(
	tag: PropertyKey,
	x: unknown[] | object,
): Constants {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return constants(tag, x as any).tagged as any;
}

/**
 * Create a record of untagged constants from an array of PropertyKeys, using each element both as key and value
 *
 * @param arr - The input tuple containing the constants
 * @returns A record of untagged constants
 */
export function constantsUntagged<T extends readonly PropertyKey[] | []>(
	arr: Narrow<T>,
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
	obj: Narrow<T>,
): InferUntaggedConstants<ConstantsWrapper<T, PropertyKey>>;
export function constantsUntagged(x: unknown[] | object): Constants {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return constants(null as any, x as any).tagged as any;
}
