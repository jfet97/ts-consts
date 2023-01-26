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
export type IsUnion<T, U extends T = T> = (
	T extends infer _ ? ([U] extends [T] ? true : false) : never
) extends true
	? false
	: true;

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
 * Signal an error if two distinct index share the same type
 *
 * @typeParam T - The tuple type to check
 * @internal
 */
export type ForbidDuplicatesInTupleType<T> = {
	[I in keyof T]: keyof {
		[J in keyof T & `${number}` as Equal<T[I], T[J]> extends true
			? J
			: never]: J;
	};
} extends infer U
	? {
			[K in keyof U]: IsUnion<U[K]> extends true
				? `value at index ${K & `${number}`} is duplicated`
				: never;
			// 'readonly any[]' helps to avoid a stupid circular constraint
			// and it ensures we can index W with number
	  } extends infer W extends readonly any[]
		? IsNever<W[number]> extends true
			? T
			: W[number]
		: never
	: never;

/**
 * Signal an error if two distinct keys share the same type
 *
 * @typeParam T - The object type to check
 * @internal
 */
export type ForbidDuplicatesInRecordType<T> = {
	[I in keyof T]: keyof {
		[J in keyof T as Equal<T[I], T[J]> extends true ? J : never]: J;
	};
} extends infer U
	? {
			[K in keyof U]: IsUnion<U[K]> extends true
				? `key '${K & (string | number | bigint)}' has duplicated value`
				: never;
	  } extends infer W
		? IsNever<W[keyof W]> extends true
			? // to avoid a stupid circular constraint
			  { [K in keyof T]: T[K] }
			: W[keyof W]
		: never
	: never;

/**
 * Convert a number N into a tuple of length N
 *
 * @typeParam N - The number
 * @internal
 */
export type ToTuple<
	N extends number,
	R extends 0[] = [],
> = R["length"] extends N ? R : ToTuple<N, [...R, 0]>;

/**
 * Sum two numbers
 *
 * @typeParam N - First operand
 * @typeParam M - Second operand
 * @internal
 */
export type Sum<N extends number, M extends number = 0> = Cast<
	[...ToTuple<N>, ...ToTuple<M>]["length"],
	number
>;

/**
 * Subtract two numbers
 *
 * @typeParam N - First operand
 * @typeParam M - Second operand
 * @internal
 */
export type Sub<N extends number, M extends number> = ToTuple<N> extends [
	...infer R,
	...ToTuple<M>,
]
	? R["length"]
	: never;

/**
 * Multiply two numbers
 *
 * @typeParam N - First operand
 * @typeParam M - Second operand
 * @internal
 */
export type Mul<
	N extends number,
	M extends number,
	R extends number = 0,
> = M extends 0 ? R : Mul<N, Sub<M, 1>, Sum<R, N>>;

/**
 * Convert a numeric string into a number
 *
 * @typeParam S - The numeric string
 * @internal
 */
export type StringToNumber<S> = S extends `${infer N extends number}`
	? N
	: never;
