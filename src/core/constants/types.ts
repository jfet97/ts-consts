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
export type Elements<C extends Constants> = ShallowResolve<C[keyof C]>;
