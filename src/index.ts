export { constants, isTaggedConstantOf, isUntaggedConstantOf } from './core/index.js';

export { RemoveTag } from './types/tag.js';

export { NarrowableBase, Narrowable } from './types/narrowable.js';

export {
    InferTaggedMap,
    InferUntaggedMap,
    InferTaggedUnion,
    InferUntaggedUnion,
    InferUnion,
    MapFromConstants,
    MapFromUntaggedConstants,
} from './types/consts.js';
