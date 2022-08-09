declare const _tag: unique symbol;

type Tagged<Tag extends string> = {
	readonly [_tag]: Tag;
};

export type Brandify<T, Tag extends string> = T & Tagged<Tag>;

export type RemoveTag<T extends Brandify<unknown, string>> = T extends Brandify<
	infer Type,
	string
>
	? Type
	: never;
