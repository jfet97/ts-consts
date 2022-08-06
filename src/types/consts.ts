import { Narrowable, NarrowableBase } from './narrowable.js';
import { RemoveTag, Tagged } from './tag.js';
import { ShallowResolve } from './utils.js';

export type GetConstants<T extends Record<PropertyKey, Narrowable>, Tag extends string> = {
    readonly tagged: Readonly<{ [K in keyof T]: T[K] & Tagged<Tag> }>;
    readonly untagged: Readonly<T>;
};

// super-types (MappableConstants <: Constants)
export type Constants = GetConstants<Record<PropertyKey, Narrowable>, string>;
export type MappableConstants = GetConstants<Record<PropertyKey, NarrowableBase>, string>;

export type InferTaggedMap<T extends Constants> = T['tagged'];
export type InferUntaggedMap<T extends Constants> = T['untagged'];

export type InferUnion<T extends Constants['tagged'] | Constants['untagged']> = T[keyof T];
export type InferTaggedUnion<T extends Constants> = InferUnion<InferTaggedMap<T>>;
export type InferUntaggedUnion<T extends Constants> = ShallowResolve<InferUnion<InferUntaggedMap<T>>>;
export type InferUnions<T extends Constants> = {
    tagged: InferTaggedUnion<T>;
    untagged: InferUntaggedUnion<T>;
};

// all and only
export type MapFromConstants<
    C extends MappableConstants,
    M extends Record<InferUntaggedUnion<C>, unknown>,
> = Record<InferUntaggedUnion<C>, never> extends M ? ShallowResolve<M> : never;

// all and only
export type MapFromUntaggedConstants<
    C extends MappableConstants['untagged'],
    M extends Record<InferUnion<C>, unknown>,
> = Record<InferUnion<C>, never> extends M ? ShallowResolve<M> : never;

// all and only
export type MapFromTaggedConstants<
    C extends MappableConstants['tagged'],
    M extends Record<RemoveTag<InferUnion<C>>, unknown>,
> = Record<RemoveTag<InferUnion<C>>, never> extends M ? ShallowResolve<M> : never;
