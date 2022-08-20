import {
	Constants,
	ConstantsWrapper,
	InferTaggedConstants,
	InferTaggedUnion,
	InferUntaggedConstants,
	InferUntaggedUnion,
	UntagTaggedConstants,
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
 * Create a Constants object from the keys of a tagged or untagged record of constants
 *
 * @param tag - The tag to set to enable nominal typing
 * @param mcs - The input record
 * @returns A Constants object where both the keys and their values are the ones from the input record
 */
export function deriveConstants<
	Tag extends TagSupertype,
	MCs extends
		| InferTaggedConstants<Constants>
		| InferUntaggedConstants<Constants>,
>(tag: Tag, mcs: MCs): ConstantsWrapper<{ [K in keyof MCs]: K }, Tag> {
	return constants(tag, Object.keys(mcs)) as ConstantsWrapper<
		{ [K in keyof MCs]: K },
		Tag
	>;
}

/**
 * Create a record of untagged constants from the keys of a tagged or untagged record of constants
 *
 * @param mcs - The input record
 * @returns A Constants object where both the keys and their values are the ones from the input record
 */
export function deriveUntaggedConstants<
	MCs extends
		| InferTaggedConstants<Constants>
		| InferUntaggedConstants<Constants>,
>(
	mcs: MCs,
): InferUntaggedConstants<ConstantsWrapper<{ [K in keyof MCs]: K }, never>> {
	return deriveConstants(void 0 as unknown as TagSupertype, mcs).untagged;
}

/**
 * Remove the tag from the types of the constants contained into the input record of tagged constants
 *
 * @param tcs - The input record
 * @returns an untagged shallow clone of tcs
 */
export function removeTags<TCs extends InferTaggedConstants<Constants>>(
	tcs: TCs,
): UntagTaggedConstants<TCs> {
	return { ...tcs } as UntagTaggedConstants<TCs>;
}
