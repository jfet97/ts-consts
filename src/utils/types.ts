/**
 * Safe cast of a type into another
 *
 * @typeParam X - The type to cast
 * @typeParam Y - The target type
 * @internal
 */
export type Cast<X, Y> = X extends Y ? X : Y;

/**
 * Forces TypeScript to compute the first level of the input type
 *
 * @typeParam T - The type to compute
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ShallowResolve<T> = T extends Function
	? T
	: { [K in keyof T]: T[K] };

/**
 * Forces TypeScript to compute all the levels of the input type
 *
 * @typeParam T - The type to compute
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Resolve<T> = T extends Function
	? T
	: { [K in keyof T]: Resolve<T[K]> };

/**
 * Index T with K even if K is not assignable to keyof T
 *
 * @typeParam T - The type to index in
 * @typeParam K - The type to use as index
 * @internal
 */
export type OptionalLookup<T, K> = Resolve<T[K & keyof T]>;

/**
 * Check if a type is a union
 *
 * @typeParam T - The type to check
 * @internal
 */
export type IsUnion<T, U extends T = T> = T extends infer _
	? [U] extends [T]
		? false
		: true
	: false;

/**
 * Check if a type is never
 *
 * @typeParam T - The type to check
 * @internal
 */
export type IsNever<T> = [T] extends [never] ? true : false;

type _Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
	? 1
	: 2
	? true
	: false;

/**
 * Check equality between types
 *
 * @typeParam X - The first operand
 * @typeParam Y - The second operand
 * @internal
 */
export type Equal<X, Y> = _Equal<Resolve<X>, Resolve<Y>>;

/**
 * Signal an error if two distinct keys share the same type
 *
 * @typeParam T - The object type to check
 * @internal
 */
export type ForbidSharedKeyTypes<T> = {
	[K in keyof T]: OptionalLookup<
		{
			// this is not homomorphic, so I have to manually filter out non-numeric properties from tuples
			[P in keyof T &
				// collect all the properties containing a value of the same type
				(T extends readonly unknown[] ? `${number}` : PropertyKey) as Equal<
				T[P],
				T[K]
			> extends true
				? P
				: never]: P;
		},
		keyof T
	>;
} extends infer U
	? OptionalLookup<
			{
				// this is not homomorphic, so I have to manually filter out non-numeric properties from tuples
				[K in keyof U &
					// maintain just properties containing unions as types, to "generate an error"
					(T extends readonly unknown[] ? `${number}` : PropertyKey) as IsUnion<
					U[K]
				> extends true
					? K
					: never]: T extends readonly unknown[]
					? `value at index ${K & `${number}`} is duplicated`
					: `key '${K & (string | number | bigint)}' has duplicated value`;
			},
			keyof U
	  > extends infer W
		? IsNever<W> extends true
			? T
			: W
		: never
	: never;
