import {
	constants,
	InferTaggedMap,
	InferTaggedUnion,
	InferUnions,
	InferUntaggedMap,
	InferUntaggedUnion,
	isTaggedConstantOf,
	isUntaggedConstantOf,
	MapConstants,
	MapTaggedConstants,
	MapUntaggedConstants,
	Narrowable,
	RemoveTag,
	removeTags,
} from "../src/index.js";

declare let boh: Narrowable;

const uno_due_tre = constants(`unoduetre`, [`UNO`, `DUE`, `TRE`]);

type uno_due_tre_union = InferUnions<typeof uno_due_tre>;
type uno_due_tre_union_tagged = InferTaggedUnion<typeof uno_due_tre>;
type uno_due_tre_union_untagged = InferUntaggedUnion<typeof uno_due_tre>;
type uno_due_tre_tags = InferTaggedMap<typeof uno_due_tre>;
type uno_due_tre_no_tags = InferUntaggedMap<typeof uno_due_tre>;

type newType = MapConstants<
	typeof uno_due_tre,
	{
		[uno_due_tre.untagged.UNO]: number;
		[uno_due_tre.untagged.DUE]: boolean;
		[uno_due_tre.untagged.TRE]: string;
	}
>;

type newType2 = MapUntaggedConstants<
	InferUntaggedMap<typeof uno_due_tre>,
	{
		[uno_due_tre.untagged.UNO]: number;
		[uno_due_tre.untagged.DUE]: boolean;
		[uno_due_tre.untagged.TRE]: string;
	}
>;

type newType3 = MapTaggedConstants<
	InferTaggedMap<typeof uno_due_tre>,
	{
		[uno_due_tre.untagged.UNO]: number;
		[uno_due_tre.untagged.DUE]: boolean;
		[uno_due_tre.untagged.TRE]: string;
	}
>;

type newType3bis = MapTaggedConstants<
	InferTaggedMap<typeof uno_due_tre>,
	Record<RemoveTag<typeof uno_due_tre.tagged.UNO>, number> &
		Record<RemoveTag<typeof uno_due_tre.tagged.DUE>, boolean> &
		Record<RemoveTag<typeof uno_due_tre.tagged.TRE>, string>
>;

const uno_due_tre_u = removeTags(uno_due_tre.tagged);
type newType3tris = MapTaggedConstants<
	InferTaggedMap<typeof uno_due_tre>,
	{
		[uno_due_tre_u.UNO]: number;
		[uno_due_tre_u.DUE]: boolean;
		[uno_due_tre_u.TRE]: string;
	}
>;

if (isUntaggedConstantOf(uno_due_tre, boh)) {
	boh;
	const lulu: uno_due_tre_union_untagged = boh;
} else {
	// @ts-expect-error
	const lulu2: uno_due_tre_union_untagged = boh;
}

if (isTaggedConstantOf(uno_due_tre, boh)) {
	boh;
	const lulu: uno_due_tre_union_tagged = boh;
} else {
	// @ts-expect-error
	const lulu2: uno_due_tre_union_tagged = boh;
}
