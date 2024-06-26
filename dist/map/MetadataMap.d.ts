import { Key } from "../types/Key";
import { Metadata } from "../types/Metadata";
import { AbstractClass } from "../types/AbstractClass";
import { ClassConstructor } from "../types/ClassConstructor";
export declare class MetadataMap extends Map {
    set<T>(key: AbstractClass<T> | ClassConstructor<T>, metadata: Metadata): this;
    get<T>(key: Key<T>): Metadata | undefined;
    has<T>(key: Key<T>): boolean;
}
//# sourceMappingURL=MetadataMap.d.ts.map