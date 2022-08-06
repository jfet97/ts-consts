import {
    constants,
    InferTaggedMap,
    InferTaggedUnion,
    InferUntaggedMap,
    InferUntaggedUnion,
    isTaggedConstantOf,
    isUntaggedConstantOf,
    Narrowable,
    RemoveTag,
} from '../src/index.js';
import {
    InferUnions,
    MapFromConstants,
    MapFromTaggedConstants,
    MapFromUntaggedConstants,
} from '../src/types/consts.js';

declare let boh: Narrowable;

const uno_due_tre = constants(`unoduetre`, [`UNO`, `DUE`, `TRE`]);

type uno_due_tre_union = InferUnions<typeof uno_due_tre>;
type uno_due_tre_union_tagged = InferTaggedUnion<typeof uno_due_tre>;
type uno_due_tre_union_untagged = InferUntaggedUnion<typeof uno_due_tre>;
type uno_due_tre_tags = InferTaggedMap<typeof uno_due_tre>;
type uno_due_tre_no_tags = InferUntaggedMap<typeof uno_due_tre>;

type newType = MapFromConstants<
    typeof uno_due_tre,
    {
        [uno_due_tre.untagged.UNO]: number;
        [uno_due_tre.untagged.DUE]: boolean;
        [uno_due_tre.untagged.TRE]: string;
    }
>;

type newType2 = MapFromUntaggedConstants<
    InferUntaggedMap<typeof uno_due_tre>,
    {
        [uno_due_tre.untagged.UNO]: number;
        [uno_due_tre.untagged.DUE]: boolean;
        [uno_due_tre.untagged.TRE]: string;
    }
>;

type newType3 = MapFromTaggedConstants<
    InferTaggedMap<typeof uno_due_tre>,
    {
        [uno_due_tre.untagged.UNO]: number;
        [uno_due_tre.untagged.DUE]: boolean;
        [uno_due_tre.untagged.TRE]: string;
    }
>;

type newType3bis = MapFromTaggedConstants<
    InferTaggedMap<typeof uno_due_tre>,
    Record<RemoveTag<typeof uno_due_tre.tagged.UNO>, number> &
        Record<RemoveTag<typeof uno_due_tre.tagged.DUE>, boolean> &
        Record<RemoveTag<typeof uno_due_tre.tagged.TRE>, string>
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
