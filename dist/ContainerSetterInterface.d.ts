import { ClassConstructor } from "./types/ClassConstructor";
import { ContainerInterface } from "./ContainerInterface";
import { Key } from "./types/Key";
export declare abstract class ContainerSetterInterface {
    abstract setInstance<T>(key: Key<T>, value: T): ContainerInterface;
    abstract setBind<T>(key: Key<T>, value: ClassConstructor<T>): ContainerInterface;
    abstract setFactory<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
    abstract set<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
}
//# sourceMappingURL=ContainerSetterInterface.d.ts.map