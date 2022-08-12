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
 * Removes the tag from a tagged type
 *
 * @typeParam T - The tagged type
 * @returns The untagged type
 */
export type RemoveTag<T extends Tagged<unknown, TagSupertype>> =
	T extends Tagged<infer Type, TagSupertype> ? Type : never;
