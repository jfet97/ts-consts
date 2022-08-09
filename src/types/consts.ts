import { Brandify, RemoveTag } from "./tag.js";
import { ShallowResolve } from "./utils.js";

export type GetConstants<
	T extends Record<PropertyKey, unknown>,
	Tag extends string,
> = {
	readonly tagged: Readonly<{ [K in keyof T]: Brandify<T[K], Tag> }>;
	readonly untagged: Readonly<T>;
};

// super-types (MappableConstants <: Constants)
export type Constants = GetConstants<Record<PropertyKey, unknown>, string>;
// I can use the constants' (type) values as keys because they are assignable to PropertyKey
export type MappableConstants = GetConstants<
	Record<PropertyKey, PropertyKey>,
	string
>;

export type InferTaggedMap<Cs extends Constants> = Cs["tagged"];
export type InferUntaggedMap<Cs extends Constants> = Cs["untagged"];

export type InferUnion<
	MCs extends InferTaggedMap<Constants> | InferUntaggedMap<Constants>,
> = MCs[keyof MCs];
export type InferTaggedUnion<Cs extends Constants> = InferUnion<
	InferTaggedMap<Cs>
>;
export type InferUntaggedUnion<Cs extends Constants> = ShallowResolve<
	InferUnion<InferUntaggedMap<Cs>>
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
export type ProjectTaggedMap<
	MTCs extends InferTaggedMap<MappableConstants>,
	Map extends ProjectTaggedMap<MTCs, Map>,
> = ShallowResolve<{
	[K in RemoveTag<InferUnion<MTCs>> | keyof Map]: K extends keyof Map &
		RemoveTag<InferUnion<MTCs>>
		? Map[K]
		: never;
}>;

// all and only
export type ProjectUntaggedMap<
	MUCs extends InferUntaggedMap<MappableConstants>,
	Map extends ProjectUntaggedMap<MUCs, Map>,
> = ShallowResolve<{
	[K in InferUnion<MUCs> | keyof Map]: K extends keyof Map & InferUnion<MUCs>
		? Map[K]
		: never;
}>;

export type UntagTaggedMap<TCs extends InferTaggedMap<Constants>> =
	ShallowResolve<{
		[K in keyof TCs]: RemoveTag<TCs[K]>;
	}>;
