import {
	Constants,
	ConstantsWrapper,
	InferTaggedConstants,
	InferTaggedUnion,
	InferUntaggedConstants,
	InferUntaggedUnion,
	UntagTaggedConstants,
} from "../types/consts.js";
import { Narrow, NarrowableBase } from "../types/narrowable.js";
import { TagType } from "../types/tag.js";

export function constants<
	Tag extends TagType,
	NBElements extends NarrowableBase,
	T extends NBElements[] | [],
>(
	tag: Tag,
	arr: T,
): ConstantsWrapper<{ [I in keyof T & `${number}` as T[I]]: T[I] }, Tag>;
export function constants<
	Tag extends TagType,
	T extends Record<PropertyKey, unknown>,
>(tag: Tag, obj: Narrow<T>): ConstantsWrapper<T, Tag>;
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

export function deriveConstants<
	Tag extends TagType,
	MCs extends
		| InferTaggedConstants<Constants>
		| InferUntaggedConstants<Constants>,
>(tag: Tag, mcs: MCs): ConstantsWrapper<{ [K in keyof MCs]: K }, Tag> {
	return constants(tag, Object.keys(mcs)) as ConstantsWrapper<
		{ [K in keyof MCs]: K },
		Tag
	>;
}

export function deriveUntaggedConstants<
	MCs extends
		| InferTaggedConstants<Constants>
		| InferUntaggedConstants<Constants>,
>(
	mucs: MCs,
): InferUntaggedConstants<ConstantsWrapper<{ [K in keyof MCs]: K }, never>> {
	return deriveConstants(void 0 as unknown as TagType, mucs).untagged;
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

export function removeTags<TCs extends InferTaggedConstants<Constants>>(
	tcs: TCs,
): UntagTaggedConstants<TCs> {
	return { ...tcs } as UntagTaggedConstants<TCs>;
}
