export type NarrowableBase = PropertyKey;
export type Narrowable = NarrowableBase | bigint | boolean;

export type Narrow<T> =
	| (T extends [] ? [] : never)
	| (T extends Narrowable ? T : never)
	| {
			// eslint-disable-next-line @typescript-eslint/ban-types
			[K in keyof T]: T[K] extends Function ? T[K] : Narrow<T[K]>;
	  };
