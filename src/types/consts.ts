import { RemoveTag, TagType, Tagged } from "./tag.js";
import { ShallowResolve } from "./utils.js";

type TagConstantsCandidate<
	T extends Record<PropertyKey, unknown>,
	Tag extends TagType,
> = {
	[K in keyof T]: Tagged<T[K], Tag>;
};

export type ConstantsWrapper<
	T extends Record<PropertyKey, unknown>,
	Tag extends TagType,
> = {
	readonly tagged: Readonly<TagConstantsCandidate<T, Tag>>;
	readonly untagged: Readonly<T>;
};

// super-types (MappableConstants <: Constants)
export type Constants = ConstantsWrapper<Record<PropertyKey, unknown>, TagType>;
// I can use the constants' (type) values as keys because they are assignable to PropertyKey
export type MappableConstants = ConstantsWrapper<
	Record<PropertyKey, PropertyKey>,
	TagType
>;

export type InferTaggedConstants<Cs extends Constants> = Cs["tagged"];
export type InferUntaggedConstants<Cs extends Constants> = Cs["untagged"];

export type InferUnion<
	MCs extends
		| InferTaggedConstants<Constants>
		| InferUntaggedConstants<Constants>,
> = MCs[keyof MCs];
export type InferTaggedUnion<Cs extends Constants> = InferUnion<
	InferTaggedConstants<Cs>
>;
export type InferUntaggedUnion<Cs extends Constants> = ShallowResolve<
	InferUnion<InferUntaggedConstants<Cs>>
>;
export type InferUnions<Cs extends Constants> = {
	tagged: InferTaggedUnion<Cs>;
	untagged: InferUntaggedUnion<Cs>;
};

// all and only
export type ProjectConstants<
	MCs extends MappableConstants,
	Map extends ProjectConstants<MCs, Map>,
> = ShallowResolve<{
	[K in InferUntaggedUnion<MCs> | keyof Map]: K extends keyof Map &
		InferUntaggedUnion<MCs>
		? Map[K]
		: never;
}>;

// all and only
export type ProjectTaggedConstants<
	MTCs extends InferTaggedConstants<MappableConstants>,
	Map extends ProjectTaggedConstants<MTCs, Map>,
> = ShallowResolve<{
	[K in RemoveTag<InferUnion<MTCs>> | keyof Map]: K extends keyof Map &
		RemoveTag<InferUnion<MTCs>>
		? Map[K]
		: never;
}>;

// all and only
export type ProjectUntaggedConstants<
	MUCs extends InferUntaggedConstants<MappableConstants>,
	Map extends ProjectUntaggedConstants<MUCs, Map>,
> = ShallowResolve<{
	[K in InferUnion<MUCs> | keyof Map]: K extends keyof Map & InferUnion<MUCs>
		? Map[K]
		: never;
}>;

export type UntagTaggedConstants<TCs extends InferTaggedConstants<Constants>> =
	ShallowResolve<{
		[K in keyof TCs]: RemoveTag<TCs[K]>;
	}>;
