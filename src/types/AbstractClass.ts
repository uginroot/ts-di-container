// eslint-disable-next-line @typescript-eslint/ban-types
export type AbstractClass<T = unknown> = Function & { prototype: T; name: string };
