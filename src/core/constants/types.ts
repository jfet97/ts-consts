import { ShallowResolve } from "../../utils/types.js";

/**
 * The supertype of all record types containing constants
 */
export type Constants = Readonly<Record<PropertyKey, unknown>>;

/**
 * The supertype of all mappable Constants types, that is the ones which properties' types are assignable to PropertyKey
 */
export type MappableConstants = Readonly<Record<PropertyKey, PropertyKey>>;

/**
 * Infers the union of the constants inside a Constants type
 *
 * @typeParam C - A record type containing constants
 * @returns The union of the constants inside C
 */
export type Elements<C extends Constants> = C[keyof C];

/**
 * Given a constants object T containing only PropertyKeys and a type M which uses the properties' types of T as keys, forces the latter to use ALL AND ONLY those
 *
 * @typeParam T - A record type (a constants object) containing only PropertyKeys
 * @typeParam M - A projection of the first param that uses its properties' types as keys
 * @returns The M if it satisfies the requirement, otherwise a projection which uses the properties' types of the first as keys but containing never as properties's type for both extraneous properties (properties of M missing as properties' types of T) and missing ones (properties' types of T missing in M)
 *
 * @example
 * ```ts
 * MapConstants<
 *  { a: "A", b: "B" },
 *  { A: 1, B: 2 }
 * >
 * ```
 *
 * is
 * ```ts
 * { A: 1, B: 2 }
 * ```
 *
 * @example
 * ```ts
 * MapConstants<
 *  { a: "A", b: "B" },
 *  { A: 1 }
 * >
 * ```
 *
 * results in an error because "B" is missing as key into the M type
 *
 * @example
 * ```ts
 * MapConstants<
 *  { a: "A", b: "B" },
 *  { A: 1, B: 2, C: 3 }
 * >
 * ```
 *
 * results in an error because "C" is an extraneous key
 */
export type MapConstants<
	T extends MappableConstants,
	M extends MapConstants<T, M>,
> = ShallowResolve<{
	[K in Elements<T> | keyof M]: K extends keyof M & Elements<T> ? M[K] : never;
}>;
