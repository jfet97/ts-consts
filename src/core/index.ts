import {
	Constants,
	GetConstants,
	InferTaggedMap,
	InferTaggedUnion,
	InferUntaggedMap,
	InferUntaggedUnion,
	UntagTaggedMap,
} from "../types/consts.js";
import { Narrow, NarrowableBase } from "../types/narrowable.js";

export function constants<
	Tag extends string,
	NBElements extends NarrowableBase,
	T extends NBElements[] | [],
>(
	tag: Tag,
	arr: T,
): GetConstants<{ [I in keyof T & `${number}` as T[I]]: T[I] }, Tag>;
export function constants<
	Tag extends string,
	T extends Record<PropertyKey, unknown>,
>(tag: Tag, obj: Narrow<T>): GetConstants<T, Tag>;
export function constants(x: unknown[] | object): Constants {
	let constants = null;

	if (Array.isArray(x)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		constants = Object.freeze(Object.fromEntries(x.map(el => [el, el])));
	} else {
		constants = Object.freeze({ ...x });
	}

	return {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		tagged: constants,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		untagged: constants,
	};
}

export function constantsFromKeyofMap<
	Tag extends string,
	MCs extends InferTaggedMap<Constants> | InferUntaggedMap<Constants>,
>(tag: Tag, mcs: MCs): GetConstants<{ [K in keyof MCs]: K }, Tag> {
	return constants(tag, Object.keys(mcs)) as GetConstants<
		{ [K in keyof MCs]: K },
		Tag
	>;
}

export function untaggedMapFromKeyofMap<
	MCs extends InferTaggedMap<Constants> | InferUntaggedMap<Constants>,
>(mucs: MCs): InferUntaggedMap<GetConstants<{ [K in keyof MCs]: K }, never>> {
	return constantsFromKeyofMap(void 0 as unknown as string, mucs).untagged;
}

export function isUntaggedConstantOf<Cs extends Constants>(
	constants: Cs,
	constant: unknown,
): constant is InferUntaggedUnion<Cs> {
	return Object.values(constants.untagged).includes(constant);
}

export function isTaggedConstantOf<Cs extends Constants>(
	constants: Cs,
	constant: unknown,
): constant is InferTaggedUnion<Cs> {
	return (Object.values(constants.tagged) as unknown[]).includes(constant);
}

export function removeTags<TCs extends Constants["tagged"]>(
	tcs: TCs,
): UntagTaggedMap<TCs> {
	return { ...tcs } as UntagTaggedMap<TCs>;
}
