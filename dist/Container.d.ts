import { ContainerInterface } from "./ContainerInterface";
import { ContainerSetterInterface } from "./ContainerSetterInterface";
import { Key } from "./types/Key";
import { ClassConstructor } from "./types/ClassConstructor";
import { AbstractClass } from "./types/AbstractClass";
export declare class Container implements ContainerInterface, ContainerSetterInterface {
    private readonly parentContainer;
    private readonly instances;
    private readonly factories;
    private readonly singletons;
    constructor(parentContainer?: ContainerInterface | undefined);
    makeChildContainer(): Container;
    get<T>(key: Key<T>): T;
    private resolveAutoWareInstance;
    private hasNotAutoWare;
    has<T>(key: Key<T>): boolean;
    setInstance<T>(key: Key<T>, value: T): ContainerInterface;
    setBind<T>(key: ClassConstructor<T> | AbstractClass<T>, value: ClassConstructor<T>): ContainerInterface;
    set<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
    setFactory<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
}
//# sourceMappingURL=Container.d.ts.map