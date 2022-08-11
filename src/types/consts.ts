import { RemoveTag, TagType, Tagged } from "./tag.js";
import { ShallowResolve } from "./utils.js";

/**
 * Sets a tag to all properties of a record type
 * @internal
 *
 * @typeParam T - The record type
 * @typeParam Tag - The tag
 * @returns The record type having its properties all tagged
 */
type TagConstantsCandidate<
	T extends Record<PropertyKey, unknown>,
	Tag extends TagType,
> = {
	[K in keyof T]: Tagged<T[K], Tag>;
};

/**
 * Transforms a record type into a Constants
 *
 * @typeParam T - The record type
 * @typeParam Tag - The tag
 * @returns A Constants object type with two keys: tagged and untagged. The former key contains the original record type but tagged and set as read-only, the latter just contains the original record type set as read-only
 */
export type ConstantsWrapper<
	T extends Record<PropertyKey, unknown>,
	Tag extends TagType,
> = {
	readonly tagged: Readonly<TagConstantsCandidate<T, Tag>>;
	readonly untagged: Readonly<T>;
};

/**
 * The supertype of all Constants types
 */
export type Constants = ConstantsWrapper<Record<PropertyKey, unknown>, TagType>;
/**
 * The supertype of all mappable Constants types, that is the ones which properties' types are assignable to PropertyKey
 */
export type MappableConstants = ConstantsWrapper<
	Record<PropertyKey, PropertyKey>,
	TagType
>;

/**
 * Extracts the tagged constants from a Constants type
 *
 * @typeParam Cs - The Constants type
 * @returns The tagged constants type
 */
export type InferTaggedConstants<Cs extends Constants> = Cs["tagged"];
/**
 * Extracts the untagged constants from a Constants type
 *
 * @typeParam Cs - The Constants type
 * @returns The untagged constants type
 */
export type InferUntaggedConstants<Cs extends Constants> = Cs["untagged"];

/**
 * Infers the union from both tagged and untagged constants
 *
 * @typeParam MCs - A record type containing tagged or untagged constants
 * @returns The union of the input record type
 */
export type InferUnion<
	MCs extends
		| InferTaggedConstants<Constants>
		| InferUntaggedConstants<Constants>,
> = MCs[keyof MCs];
/**
 * Infers the union of tagged constants
 *
 * @typeParam Cs - A Constants type
 * @returns The union of the tagged constants contained into the input type
 */
export type InferTaggedUnion<Cs extends Constants> = InferUnion<
	InferTaggedConstants<Cs>
>;
/**
 * Infers the union of untagged constants
 *
 * @typeParam Cs - A Constants type
 * @returns The union of the untagged constants contained into the input type
 */
export type InferUntaggedUnion<Cs extends Constants> = ShallowResolve<
	InferUnion<InferUntaggedConstants<Cs>>
>;
/**
 * Infers two unions from a Constants type: the one containing tagged constants and the one containing untagged constants
 *
 * @typeParam Cs - A Constants type
 * @returns Both unions
 */
export type InferUnions<Cs extends Constants> = {
	tagged: InferTaggedUnion<Cs>;
	untagged: InferUntaggedUnion<Cs>;
};

/**
 * Given a MappableConstants type and a type which uses the untagged constants' types of the first as keys,
 * forces the latter to use ALL AND ONLY the untagged constants' types of the first as keys
 *
 * @typeParam MCs - A MappableConstants type
 * @typeParam Map - A projection of the first param that uses its untagged constants' types as keys
 * @returns The Map if it satisfies the requirement, otherwise a projection which uses the untagged constants' types of the first as keys but containing never as constansts's type for both extraneous properties (properties of Map missing as constants' types of MCs) and missing ones (constants' types of MCs missing in Map)
 *
 * @example
 * ```ts
 * ProjectConstants<
 *  ConstantsWrapper<{ a: "A", b: "B" }, "tag">,
 *  { A: 1, B: 2 }
 * >
 * ```
 *
 * is
 * ```ts
 * { A: 1, B: 2 }
 * ```
 *
 * @example
 * ```ts
 * ProjectConstants<
 *  ConstantsWrapper<{ a: "A", b: "B" }, "tag">,
 *  { A: 1 }
 * >
 * ```
 *
 * results in an error because "B" is missing as key into the Map type
 *
 * @example
 * ```ts
 * ProjectConstants<
 *  ConstantsWrapper<{ a: "A", b: "B" }, "tag">,
 *  { A: 1, B: 2, C: 3 }
 * >
 * ```
 *
 * results in an error because "C" is an extraneous key
 */
export type ProjectConstants<
	MCs extends MappableConstants,
	Map extends ProjectConstants<MCs, Map>,
> = ShallowResolve<{
	[K in InferUntaggedUnion<MCs> | keyof Map]: K extends keyof Map &
		InferUntaggedUnion<MCs>
		? Map[K]
		: never;
}>;

/**
 * Given a record type containing only tagged PropertyKeys and a type which uses the untagged properties' types of the first as keys, forces the latter to use ALL AND ONLY the untagged properties' types of the first as keys
 *
 * @typeParam MTCs - A record type containing only tagged PropertyKeys
 * @typeParam Map - A projection of the first param that uses its untagged properties' types as keys
 * @returns The Map if it satisfies the requirement, otherwise a projection which uses the untagged properties' types of the first as keys but containing never as properties's type for both extraneous properties (properties of Map missing as properties' types of MTCs) and missing ones (properties' types of MTCs missing in Map)
 *
 * @example
 * ```ts
 * ProjectTaggedConstants<
 *  InferTaggedConstants<ConstantsWrapper<{ a: "A", b: "B" }, "tag">>,
 *  { A: 1, B: 2 }
 * >
 * ```
 *
 * is
 * ```ts
 * { A: 1, B: 2 }
 * ```
 *
 * @example
 * ```ts
 * ProjectTaggedConstants<
 *  InferTaggedConstants<ConstantsWrapper<{ a: "A", b: "B" }, "tag">>,
 *  { A: 1 }
 * >
 * ```
 *
 * results in an error because "B" is missing as key into the Map type
 *
 * @example
 * ```ts
 * ProjectTaggedConstants<
 *  InferTaggedConstants<ConstantsWrapper<{ a: "A", b: "B" }, "tag">>,
 *  { A: 1, B: 2, C: 3 }
 * >
 * ```
 *
 * results in an error because "C" is an extraneous key
 */
export type ProjectTaggedConstants<
	MTCs extends InferTaggedConstants<MappableConstants>,
	Map extends ProjectTaggedConstants<MTCs, Map>,
> = ShallowResolve<{
	[K in RemoveTag<InferUnion<MTCs>> | keyof Map]: K extends keyof Map &
		RemoveTag<InferUnion<MTCs>>
		? Map[K]
		: never;
}>;

/**
 * Given a record type containing only untagged PropertyKeys and a type which uses the properties' types of the first as keys, forces the latter to use ALL AND ONLY the properties' types of the first as keys
 *
 * @typeParam MUCs - A record type containing only untagged PropertyKeys
 * @typeParam Map - A projection of the first param that uses its properties' types as keys
 * @returns The Map if it satisfies the requirement, otherwise a projection which uses the properties' types of the first as keys but containing never as properties's type for both extraneous properties (properties of Map missing as properties' types of MUCs) and missing ones (properties' types of MUCs missing in Map)
 *
 * @example
 * ```ts
 * ProjectUntaggedConstants<
 *  InferUntaggedConstants<ConstantsWrapper<{ a: "A", b: "B" }, "tag">>,
 *  { A: 1, B: 2 }
 * >
 * ```
 *
 * is
 * ```ts
 * { A: 1, B: 2 }
 * ```
 *
 * @example
 * ```ts
 * ProjectUntaggedConstants<
 *  InferUntaggedConstants<ConstantsWrapper<{ a: "A", b: "B" }, "tag">>,
 *  { A: 1 }
 * >
 * ```
 *
 * results in an error because "B" is missing as key into the Map type
 *
 * @example
 * ```ts
 * ProjectUntaggedConstants<
 *  InferUntaggedConstants<ConstantsWrapper<{ a: "A", b: "B" }, "tag">>,
 *  { A: 1, B: 2, C: 3 }
 * >
 * ```
 *
 * results in an error because "C" is an extraneous key
 */
export type ProjectUntaggedConstants<
	MUCs extends InferUntaggedConstants<MappableConstants>,
	Map extends ProjectUntaggedConstants<MUCs, Map>,
> = ShallowResolve<{
	[K in InferUnion<MUCs> | keyof Map]: K extends keyof Map & InferUnion<MUCs>
		? Map[K]
		: never;
}>;

/**
 * Given a record containing tagged constants, remove the tag from all its properties
 *
 * @typeParam TCs - A record type containing tagged contants
 * @returns The input record type without tags
 */
export type UntagTaggedConstants<TCs extends InferTaggedConstants<Constants>> =
	ShallowResolve<{
		[K in keyof TCs]: RemoveTag<TCs[K]>;
	}>;
