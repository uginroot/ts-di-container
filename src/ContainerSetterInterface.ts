import { ClassConstructor } from "./types/ClassConstructor";
import { ContainerInterface } from "./ContainerInterface";
import { Key } from "./types/Key";

export abstract class ContainerSetterInterface {
    public abstract setInstance<T>(key: Key<T>, value: T): ContainerInterface;
    public abstract setBind<T>(key: Key<T>, value: ClassConstructor<T>): ContainerInterface;
    public abstract setFactory<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
    public abstract set<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
}
