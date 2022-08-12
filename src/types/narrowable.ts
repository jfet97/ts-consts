/**
 * Narrowable types are the ones that can be directly narrowed when inferred
 * @internal
 */
export type Narrowable = PropertyKey | bigint | boolean;

/**
 * Narrows a generic type that could contain narrowable types
 * @internal
 *
 * @typeParam T - The type to be narrowed
 * @returns The narrowed type
 */
export type Narrow<T> =
	| (T extends readonly [] ? readonly [] : never)
	| (T extends [] ? [] : never)
	| (T extends Narrowable ? T : never)
	| {
			// eslint-disable-next-line @typescript-eslint/ban-types
			[K in keyof T]: T[K] extends Function ? T[K] : Narrow<T[K]>;
	  };
