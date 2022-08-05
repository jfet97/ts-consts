import { Narrowable, NarrowableBase } from './narrowable.js';
import { Tagged } from './tag.js';
import { ShallowResolve } from './utils.js';

export type GetConstants<T extends Record<PropertyKey, Narrowable>, Tag extends string> = {
    readonly tagged: Readonly<{ [K in keyof T]: T[K] & Tagged<Tag> }>;
    readonly untagged: Readonly<T>;
};

// super-types (MappableConstants <: Constants)
export type Constants = GetConstants<Record<PropertyKey, Narrowable>, string>;
export type MappableConstants = GetConstants<Record<PropertyKey, NarrowableBase>, string>;

export type InferUnion<T extends Constants['tagged'] | Constants['untagged']> = T[keyof T];
export type InferTaggedMap<T extends Constants> = T['tagged'];
export type InferUntaggedMap<T extends Constants> = T['untagged'];
export type InferTaggedUnion<T extends Constants, TM = InferTaggedMap<T>> = TM[keyof TM];
export type InferUntaggedUnion<T extends Constants, UM = InferUntaggedMap<T>> = ShallowResolve<UM[keyof UM]>;
export type InferUnions<T extends Constants> = {
    tagged: InferTaggedUnion<T>;
    untagged: InferUntaggedUnion<T>;
};

export type MapFromConstants<
    C extends MappableConstants,
    M extends Record<InferUntaggedUnion<C>, unknown>,
> = ShallowResolve<M>;

export type MapFromUntaggedConstants<
    C extends MappableConstants["untagged"],
    M extends Record<InferUnion<C>, unknown>,
> = ShallowResolve<M>;
