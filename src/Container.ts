import { ContainerInterface } from "./ContainerInterface";
import { ContainerSetterInterface } from "./ContainerSetterInterface";

import { Key } from "./types/Key";
import { InstanceMap } from "./map/InstanceMap";
import { FactoryMap } from "./map/FactoryMap";
import { NotFoundException } from "./errors/NotFoundException";
import { AlreadyExistException } from "./errors/AlreadyExistException";
import { ClassConstructor } from "./types/ClassConstructor";
import { MissingDecoratorException } from "./errors/MissingDecoratorException";
import { getKeyDescription } from "./utils/getKeyDescription";
import { ResolveParameterException } from "./errors/ResolveParameterException";
import { metadataMap } from "./global-variables/metadataMap";
import { TARGET_TYPE_SINGLETON } from "./constants/TARGET_TYPE_SINGLETON";
import { TARGET_TYPE_FACTORY } from "./constants/TARGET_TYPE_FACTORY";
import { Metadata } from "./types/Metadata";
import { CLASS_METADATA_NOT_FOUND } from "./constants/CLASS_METADATA_NOT_FOUND";
import { AbstractClass } from "./types/AbstractClass";
import { isClassConstructor } from "./utils/isClassConstructor";

export class Container implements ContainerInterface, ContainerSetterInterface {
    private readonly instances = new InstanceMap();
    private readonly factories = new FactoryMap();
    private readonly singletons = new FactoryMap();

    public constructor(private readonly parentContainer: ContainerInterface | undefined = undefined) {
        this.instances.set(ContainerInterface, this);
        this.instances.set(ContainerSetterInterface, this);
    }

    public makeChildContainer(): Container {
        return new Container(this);
    }

    public get<T>(key: Key<T>): T {
        if (this.instances.has(key)) {
            return this.instances.get(key);
        }
        if (this.singletons.has(key)) {
            const instance = this.singletons.get(key)(this);
            this.instances.set(key, instance);
            return instance;
        }
        if (this.factories.has(key)) {
            return this.factories.get(key)(this);
        }

        // Auto ware with decorators
        if (isClassConstructor(key)) {
            const instance = this.resolveAutoWareInstance(key);
            if (instance !== CLASS_METADATA_NOT_FOUND) {
                return instance;
            }
        }

        if (this.parentContainer) {
            return this.parentContainer.get(key);
        }

        throw new NotFoundException(getKeyDescription(key));
    }

    private resolveAutoWareInstance<T>(key: ClassConstructor<T>): typeof CLASS_METADATA_NOT_FOUND | T {
        if (!metadataMap.has(key)) {
            return CLASS_METADATA_NOT_FOUND;
        }
        const metadata = metadataMap.get(key) as Metadata;
        const args = [];
        for (const parameter of metadata.parameters || []) {
            const paramKey = parameter.inject || parameter.key;
            try {
                args.push(this.get(paramKey));
            } catch (error) {
                const constructorName = key.prototype.constructor.name;
                throw new ResolveParameterException(parameter.name, constructorName, error);
            }
        }

        switch (metadata.type) {
            case TARGET_TYPE_SINGLETON:
                this.instances.set(key, new key(...args));
                return this.instances.get(key);
            case TARGET_TYPE_FACTORY:
                return new key(...args);
        }
    }

    private hasNotAutoWare<T>(key: Key<T>): boolean {
        return (
            this.instances.has(key) ||
            this.singletons.has(key) ||
            this.factories.has(key) ||
            (this.parentContainer !== undefined && this.parentContainer.has(key))
        );
    }

    public has<T>(key: Key<T>): boolean {
        return this.hasNotAutoWare(key) || metadataMap.has(key);
    }

    public setInstance<T>(key: Key<T>, value: T): ContainerInterface {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException(getKeyDescription(key));
        }
        this.instances.set(key, value);
        return this;
    }

    public setBind<T>(key: ClassConstructor<T> | AbstractClass<T>, value: ClassConstructor<T>): ContainerInterface {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException(getKeyDescription(key));
        }
        const metadata = metadataMap.get(value);
        if (metadata === undefined) {
            throw new MissingDecoratorException(getKeyDescription(value));
        }
        switch (metadata.type) {
            case TARGET_TYPE_SINGLETON:
                this.singletons.set(key, () => this.resolveAutoWareInstance(value));
                break;
            case TARGET_TYPE_FACTORY:
                this.factories.set(key, () => this.resolveAutoWareInstance(value));
                break;
        }
        return this;
    }

    public set<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException(getKeyDescription(key));
        }
        this.singletons.set(key, value);
        return this;
    }

    public setFactory<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException(getKeyDescription(key));
        }
        this.factories.set(key, value);
        return this;
    }
}
