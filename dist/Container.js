"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const ContainerInterface_1 = require("./ContainerInterface");
const ContainerSetterInterface_1 = require("./ContainerSetterInterface");
const InstanceMap_1 = require("./map/InstanceMap");
const FactoryMap_1 = require("./map/FactoryMap");
const NotFoundException_1 = require("./errors/NotFoundException");
const AlreadyExistException_1 = require("./errors/AlreadyExistException");
const MissingDecoratorException_1 = require("./errors/MissingDecoratorException");
const getKeyDescription_1 = require("./utils/getKeyDescription");
const ResolveParameterException_1 = require("./errors/ResolveParameterException");
const metadataMap_1 = require("./global-variables/metadataMap");
const TARGET_TYPE_SINGLETON_1 = require("./constants/TARGET_TYPE_SINGLETON");
const TARGET_TYPE_FACTORY_1 = require("./constants/TARGET_TYPE_FACTORY");
const CLASS_METADATA_NOT_FOUND_1 = require("./constants/CLASS_METADATA_NOT_FOUND");
const isClassConstructor_1 = require("./utils/isClassConstructor");
class Container {
    constructor(parentContainer = undefined) {
        this.parentContainer = parentContainer;
        this.instances = new InstanceMap_1.InstanceMap();
        this.factories = new FactoryMap_1.FactoryMap();
        this.singletons = new FactoryMap_1.FactoryMap();
        this.instances.set(ContainerInterface_1.ContainerInterface, this);
        this.instances.set(ContainerSetterInterface_1.ContainerSetterInterface, this);
    }
    makeChildContainer() {
        return new Container(this);
    }
    get(key) {
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
        if ((0, isClassConstructor_1.isClassConstructor)(key)) {
            const instance = this.resolveAutoWareInstance(key);
            if (instance !== CLASS_METADATA_NOT_FOUND_1.CLASS_METADATA_NOT_FOUND) {
                return instance;
            }
        }
        if (this.parentContainer) {
            return this.parentContainer.get(key);
        }
        throw new NotFoundException_1.NotFoundException((0, getKeyDescription_1.getKeyDescription)(key));
    }
    resolveAutoWareInstance(key) {
        if (!metadataMap_1.metadataMap.has(key)) {
            return CLASS_METADATA_NOT_FOUND_1.CLASS_METADATA_NOT_FOUND;
        }
        const metadata = metadataMap_1.metadataMap.get(key);
        const args = [];
        for (const parameter of metadata.parameters || []) {
            const paramKey = parameter.inject || parameter.key;
            try {
                args.push(this.get(paramKey));
            }
            catch (error) {
                const constructorName = key.prototype.constructor.name;
                throw new ResolveParameterException_1.ResolveParameterException(parameter.name, constructorName, error);
            }
        }
        switch (metadata.type) {
            case TARGET_TYPE_SINGLETON_1.TARGET_TYPE_SINGLETON:
                this.instances.set(key, new key(...args));
                return this.instances.get(key);
            case TARGET_TYPE_FACTORY_1.TARGET_TYPE_FACTORY:
                return new key(...args);
        }
    }
    hasNotAutoWare(key) {
        return (this.instances.has(key) ||
            this.singletons.has(key) ||
            this.factories.has(key) ||
            (this.parentContainer !== undefined && this.parentContainer.has(key)));
    }
    has(key) {
        return this.hasNotAutoWare(key) || metadataMap_1.metadataMap.has(key);
    }
    setInstance(key, value) {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException_1.AlreadyExistException(key);
        }
        this.instances.set(key, value);
        return this;
    }
    setBind(key, value) {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException_1.AlreadyExistException(key);
        }
        const metadata = metadataMap_1.metadataMap.get(value);
        if (metadata === undefined) {
            throw new MissingDecoratorException_1.MissingDecoratorException((0, getKeyDescription_1.getKeyDescription)(value));
        }
        switch (metadata.type) {
            case TARGET_TYPE_SINGLETON_1.TARGET_TYPE_SINGLETON:
                this.singletons.set(key, () => this.resolveAutoWareInstance(value));
                break;
            case TARGET_TYPE_FACTORY_1.TARGET_TYPE_FACTORY:
                this.factories.set(key, () => this.resolveAutoWareInstance(value));
                break;
        }
        return this;
    }
    set(key, value) {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException_1.AlreadyExistException(key);
        }
        this.singletons.set(key, value);
        return this;
    }
    setFactory(key, value) {
        if (this.hasNotAutoWare(key)) {
            throw new AlreadyExistException_1.AlreadyExistException(key);
        }
        this.factories.set(key, value);
        return this;
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map