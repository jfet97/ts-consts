import { Narrowable } from "./narrowable.js";

declare const _tag: unique symbol;

export type Tagged<Tag extends string> = {
	readonly [_tag]: Tag;
};

export type RemoveTag<T extends Narrowable & Tagged<string>> = T extends infer Constant & Tagged<T[typeof _tag]>
	? Constant
	: never;
