/**
 * Forces TypeScript to compute the first level of whatever type
 *
 * @typeParam T - The type to compute
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ShallowResolve<T> = T extends Function
	? T
	: { [K in keyof T]: T[K] };
