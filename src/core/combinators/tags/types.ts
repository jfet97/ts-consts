import { Constants } from "../../constants/types.js";

/**
 * Private unique symbol to enable nominal typing
 * @internal
 */
declare const _tag: unique symbol;

/**
 * The supertype of tags
 */
export type TagSupertype = PropertyKey;

/**
 * Tags a type using the private unique symbol and a custom defined tag to enable nominal typing
 * @internal
 *
 * @typeParam Tag - The custom defined tag to set
 * @returns The tagged type
 */
type _Tagged<Tag extends TagSupertype> = {
	readonly [_tag]: Tag;
};

/**
 * Tags a type using a custom defined tag to enable nominal typing
 *
 * @typeParam Tag - The custom defined tag to set
 * @returns The tagged type
 */
export type Tagged<T, Tag extends TagSupertype> = T & _Tagged<Tag>;

/**
 * Sets a tag to all properties of a record type
 * @internal
 *
 * @typeParam T - The record type
 * @typeParam Tag - The tag
 * @returns The record type having its properties all tagged
 */
export type TaggedRecord<
	T extends Record<PropertyKey, unknown>,
	Tag extends TagSupertype,
> = {
	[K in keyof T]: Tagged<T[K], Tag>;
};

/**
 * Removes the tag from a tagged type
 *
 * @typeParam T - The tagged type
 * @returns The untagged type
 */
export type RemoveTag<T extends Tagged<unknown, TagSupertype>> =
	T extends Tagged<infer Type, TagSupertype> ? Type : never;

/**
 * Given a record containing tagged keys, remove the tag from all its keys
 *
 * @typeParam T - A record type containing tagged keys
 * @returns The input record type without tags
 */
export type RemoveTagFromRecord<
	T extends Record<PropertyKey, Tagged<unknown, TagSupertype>>,
> = {
	[K in keyof T]: RemoveTag<T[K]>;
};

/**
 * Checks if a type has been tagged
 *
 * @typeParam T - The type to ckeck
 * @returns true if the type T has been tagged, false otherwise
 */
export type IsTagged<T> = T extends Tagged<unknown, TagSupertype>
	? true
	: false;

/**
 * Checks if at least one element of a record is tagged
 *
 * @typeParam T - The record to ckeck
 * @returns true if there is at least one tagged key, false otherwise
 */
export type IsRecordTagged<T extends Record<PropertyKey, unknown>> =
	false extends (T[keyof T] extends infer V ? IsTagged<V> : never)
		? false
		: true;

/**
 * Supertype of all tagged constants
 */
export type TaggedConstants = {
	[K in keyof Constants]: Tagged<Constants[K], TagSupertype>;
};
