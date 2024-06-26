import { Key } from "../types/Key";
export declare class InstanceMap extends Map {
    set<T>(key: Key<T>, value: T): this;
    get<T>(key: Key<T>): T;
    has<T>(key: Key<T>): boolean;
}
//# sourceMappingURL=InstanceMap.d.ts.map