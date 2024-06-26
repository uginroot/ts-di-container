import { Key } from "../types/Key";
import { ContainerInterface } from "../ContainerInterface";
export declare class FactoryMap extends Map {
    set<T>(key: Key<T>, value: (container: ContainerInterface) => T): this;
    get<T>(key: Key<T>): (container: ContainerInterface) => T;
    has<T>(key: Key<T>): boolean;
}
//# sourceMappingURL=FactoryMap.d.ts.map