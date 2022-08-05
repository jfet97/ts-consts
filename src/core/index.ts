import { GetConstants, Constants, InferUntaggedUnion, InferTaggedUnion } from '../types/consts.js';
import { Narrowable, NarrowableBase } from '../types/narrowable.js';
import { Tagged } from '../types/tag.js';

export function constants<Els extends NarrowableBase, T extends Els[] | [], Tag extends string>(
    tag: Tag,
    arr: T,
): GetConstants<{ [I in keyof T & `${number}` as T[I]]: T[I] }, Tag>;
export function constants<Els extends Narrowable, T extends Record<PropertyKey, Els>, Tag extends string>(
    tag: Tag,
    obj: T,
): GetConstants<T, Tag>;
export function constants(x: any[] | object): Constants {
    let constants = null;

    if (Array.isArray(x)) {
        constants = Object.freeze(Object.fromEntries(x.map((el) => [el, el])));
    } else {
        constants = Object.freeze({ ...x });
    }

    return {
        tagged: constants,
        untagged: constants,
    };
}

export function isUntaggedConstantOf<C extends Constants>(
    constants: C,
    constant: Narrowable,
): constant is InferUntaggedUnion<C> {
    return Object.values(constants.untagged).includes(constant);
}

export function isTaggedConstantOf<C extends Constants>(
    constants: C,
    constant: Narrowable,
): constant is InferTaggedUnion<C> {
    return Object.values(constants.tagged).includes(constant as Narrowable & Tagged<string>);
}
