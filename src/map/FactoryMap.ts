import { Key } from "../types/Key";
import { ContainerInterface } from "../ContainerInterface";

export class FactoryMap extends Map {
    public set<T>(key: Key<T>, value: (container: ContainerInterface) => T) {
        super.set(key, value);
        return this;
    }

    public get<T>(key: Key<T>): (container: ContainerInterface) => T {
        return super.get(key);
    }

    public has<T>(key: Key<T>): boolean {
        return super.has(key);
    }
}
