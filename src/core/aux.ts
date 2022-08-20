import {
	Constants,
	ConstantsWrapper,
	InferTaggedConstants,
	InferUntaggedConstants,
	UntagTaggedConstants,
} from "../types/consts.js";
import { TagSupertype } from "../types/tag.js";
import { constants } from "./constants.js";

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
