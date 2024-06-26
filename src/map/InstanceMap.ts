import { Key } from "../types/Key";

export class InstanceMap extends Map {
    public set<T>(key: Key<T>, value: T) {
        super.set(key, value);
        return this;
    }

    public get<T>(key: Key<T>): T {
        return super.get(key);
    }

    public has<T>(key: Key<T>): boolean {
        return super.has(key);
    }
}
