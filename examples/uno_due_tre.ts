import {
	InferTaggedConstants,
	InferTaggedUnion,
	InferUnions,
	InferUntaggedConstants,
	InferUntaggedUnion,
	ProjectConstants,
	ProjectTaggedConstants,
	ProjectUntaggedConstants,
	RemoveTag,
	constants,
	isTaggedConstantOf,
	isUntaggedConstantOf,
	removeTags,
} from "../src/index.js";

const uno_due_tre = constants(`unoduetre`, [`UNO`, `DUE`, `TRE`]);

type uno_due_tre_union = InferUnions<typeof uno_due_tre>;
type uno_due_tre_union_tagged = InferTaggedUnion<typeof uno_due_tre>;
type uno_due_tre_union_untagged = InferUntaggedUnion<typeof uno_due_tre>;
type uno_due_tre_tags = InferTaggedConstants<typeof uno_due_tre>;
type uno_due_tre_no_tags = InferUntaggedConstants<typeof uno_due_tre>;

type newType = ProjectConstants<
	typeof uno_due_tre,
	{
		[uno_due_tre.untagged.UNO]: number;
		[uno_due_tre.untagged.DUE]: boolean;
		[uno_due_tre.untagged.TRE]: string;
	}
>;

type newType2 = ProjectUntaggedConstants<
	InferUntaggedConstants<typeof uno_due_tre>,
	{
		[uno_due_tre.untagged.UNO]: number;
		[uno_due_tre.untagged.DUE]: boolean;
		[uno_due_tre.untagged.TRE]: string;
	}
>;

type newType3 = ProjectTaggedConstants<
	InferTaggedConstants<typeof uno_due_tre>,
	{
		[uno_due_tre.untagged.UNO]: number;
		[uno_due_tre.untagged.DUE]: boolean;
		[uno_due_tre.untagged.TRE]: string;
	}
>;

type newType3bis = ProjectTaggedConstants<
	InferTaggedConstants<typeof uno_due_tre>,
	Record<RemoveTag<typeof uno_due_tre.tagged.UNO>, number> &
		Record<RemoveTag<typeof uno_due_tre.tagged.DUE>, boolean> &
		Record<RemoveTag<typeof uno_due_tre.tagged.TRE>, string>
>;

const uno_due_tre_u = removeTags(uno_due_tre.tagged);
type newType3tris = ProjectTaggedConstants<
	InferTaggedConstants<typeof uno_due_tre>,
	{
		[uno_due_tre_u.UNO]: number;
		[uno_due_tre_u.DUE]: boolean;
		[uno_due_tre_u.TRE]: string;
	}
>;

declare let key: PropertyKey;

if (isUntaggedConstantOf(uno_due_tre, key)) {
	key;
	const lulu: uno_due_tre_union_untagged = key;
} else {
	// @ts-expect-error
	const lulu2: uno_due_tre_union_untagged = key;
}

if (isTaggedConstantOf(uno_due_tre, key)) {
	key;
	const lulu: uno_due_tre_union_tagged = key;
} else {
	// @ts-expect-error
	const lulu2: uno_due_tre_union_tagged = key;
}
