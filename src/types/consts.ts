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
export type MapConstants<C extends MappableConstants, M extends MapConstants<C, M>> = ShallowResolve<{
    [K in InferUntaggedUnion<C> | keyof M]: K extends keyof M & InferUntaggedUnion<C> ? M[K] : never;
}>;

// all and only
export type MapUntaggedConstants<
    C extends MappableConstants['untagged'],
    M extends MapUntaggedConstants<C, M>,
> = ShallowResolve<{ [K in InferUnion<C> | keyof M]: K extends keyof M & InferUnion<C> ? M[K] : never }>;

// all and only
export type MapTaggedConstants<
    C extends MappableConstants['tagged'],
    M extends MapTaggedConstants<C, M>,
> = ShallowResolve<{
    [K in RemoveTag<InferUnion<C>> | keyof M]: K extends keyof M & RemoveTag<InferUnion<C>> ? M[K] : never;
}>;

export type RemovedTagMap<T extends Constants['tagged']> = ShallowResolve<{
    [K in keyof T]: RemoveTag<T[K]>;
}>;
