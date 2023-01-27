/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IsRecordTagged,
	RemoveTagFromRecord,
	TagSupertype,
	TaggedConstants,
	TaggedRecord,
} from "./types.js";
import { Constants } from "../../constants/types.js";
import { ShallowResolve } from "../../../utils/types/misc.js";

/**
 * Add a tag to a record of constants
 *
 * @param tag - The tag to set
 * @param consts - The record
 * @returns The record with the tag applied to its keys
 */
export function tag<Tag extends TagSupertype>(tag: Tag) {
	return <T extends Constants>(
		consts: IsRecordTagged<T> extends true
			? `cannot add another tag to an already tagged record`
			: T,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	): ShallowResolve<Readonly<TaggedRecord<T, Tag>>> => consts as any;
}

/**
 * Remove a tag from a record of tagged constants
 *
 * @param consts - The record from which remove the tag
 * @returns The record without the tag
 */
export function untag<T extends TaggedConstants>(
	consts: T,
): ShallowResolve<Readonly<RemoveTagFromRecord<T>>> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return consts as any;
}
