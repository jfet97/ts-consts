import {
    constants,
    InferTaggedMap,
    InferTaggedUnion,
    InferUnion,
    InferUntaggedMap,
    InferUntaggedUnion,
    isTaggedConstantOf,
    isUntaggedConstantOf,
    Narrowable,
} from '../src/index.js';
import { InferUnions, MapFromConstants, MapFromUntaggedConstants } from '../src/types/consts.js';

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
    typeof uno_due_tre.untagged,
    {
        [uno_due_tre.untagged.UNO]: number;
        [uno_due_tre.untagged.DUE]: boolean;
        [uno_due_tre.untagged.TRE]: string;
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
