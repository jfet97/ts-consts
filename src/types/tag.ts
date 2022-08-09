declare const _tag: unique symbol;

export type TagType = PropertyKey;

type _Tagged<Tag extends TagType> = {
	readonly [_tag]: Tag;
};

export type Tagged<T, Tag extends TagType> = T & _Tagged<Tag>;

export type RemoveTag<T extends Tagged<unknown, TagType>> = T extends Tagged<
	infer Type,
	TagType
>
	? Type
	: never;
