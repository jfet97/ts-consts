import {
    Narrowable,
    constants,
    InferUnion,
    InferTaggedUnion,
    InferUntaggedUnion,
    InferTaggedMap,
    InferUntaggedMap,
    MapConstants,
    isUntaggedConstantOf,
    isTaggedConstantOf,
} from '../src/index.js';
import { InferUnions } from '../src/types/consts.js';

declare let boh: Narrowable;

const uno_due_tre = constants('unoduetre', ['UNO', 'DUE', 'TRE']);

type uno_due_tre_union = InferUnions<typeof uno_due_tre>;
type uno_due_tre_union_tagged = InferTaggedUnion<typeof uno_due_tre>;
type uno_due_tre_union_untagged = InferUntaggedUnion<typeof uno_due_tre>;
type uno_due_tre_tags = InferTaggedMap<typeof uno_due_tre>;
type uno_due_tre_no_tags = InferUntaggedMap<typeof uno_due_tre>;

type newType = MapConstants<
    typeof uno_due_tre,
    Record<typeof uno_due_tre.untagged.UNO, number> &
        Record<typeof uno_due_tre.untagged.DUE, boolean> &
        Record<typeof uno_due_tre.untagged.TRE, string>
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
