import { Key } from "../types/Key";
import { Metadata } from "../types/Metadata";
import { AbstractClass } from "../types/AbstractClass";
import { ClassConstructor } from "../types/ClassConstructor";

export class MetadataMap extends Map {
    public set<T>(key: AbstractClass<T> | ClassConstructor<T>, metadata: Metadata) {
        super.set(key, metadata);
        return this;
    }

    public get<T>(key: Key<T>): Metadata | undefined {
        return super.get(key);
    }

    public has<T>(key: Key<T>): boolean {
        return super.has(key);
    }
}
