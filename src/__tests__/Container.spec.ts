import { Container } from "../Container";
import { NotFoundException } from "../errors/NotFoundException";
import { singleton } from "../decorators/singleton";
import { makeToken } from "../utils/makeToken";
import { inject } from "../decorators/inject";
import { ResolveParameterException } from "../errors/ResolveParameterException";
import { factory } from "../decorators/factory";
import { metadataMap } from "../global-variables/metadataMap";
import { AlreadyExistException } from "../errors/AlreadyExistException";
import { MissingDecoratorException } from "../errors/MissingDecoratorException";

describe(Container.name, () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
        metadataMap.clear();
    });

    describe("get", () => {
        it("should throw NotFoundException if key does not exist", () => {
            class NotExist {}
            expect(() => container.get(NotExist)).toThrow(NotFoundException);
            expect(() => container.get(makeToken<NotExist>("NotExist"))).toThrow(NotFoundException);
            expect(() => container.get(makeToken<NotExist>(""))).toThrow(NotFoundException);
        });
        it("should throw AlreadyExistException if key does not exist", () => {
            class TestClass {}
            container.set(TestClass, () => new TestClass());
            expect(() => container.set(TestClass, () => new TestClass())).toThrow(AlreadyExistException);
        });
        it("should throw ResolveParameterException if parameter failed resolve", () => {
            class NotExist {}

            @singleton()
            class AutoWare {
                public constructor(autoWareSingleton: NotExist) {}
            }
            expect(() => container.get(AutoWare)).toThrow(ResolveParameterException);
        });
        it("should return the instance if key exists", () => {
            class Class {}

            const key = Class;
            const instance = new Class();
            container.setInstance(key, instance);
            expect(container.get(key)).toBe(instance);
        });
        it("should return the instance if key auto ware exists", () => {
            @singleton()
            class AutoWareSingleton {
                public constructor() {}
            }
            @factory()
            class AutoWareFactory {
                public constructor() {}
            }
            const TOKEN = makeToken("string");

            @singleton()
            class AutoWare {
                public constructor(
                    autoWareSingleton: AutoWareSingleton,
                    autoWareFactory: AutoWareFactory,
                    @inject(TOKEN) s: string,
                ) {}
            }

            const key = AutoWare;
            const parameter = "parameter";
            container.setInstance(TOKEN, parameter);
            expect(container.get(key)).toBeInstanceOf(AutoWare);
        });
    });

    describe("setInstance", () => {
        it("should return the instance if key exists", () => {
            class Class {}

            const key = Class;
            const instance = new Class();
            container.setInstance(key, instance);
            expect(container.get(key)).toBe(instance);
        });
        it("should throw AlreadyExistException if key does not exist", () => {
            class TestClass {}

            container.setInstance(TestClass, new TestClass());
            expect(() => container.setInstance(TestClass, new TestClass())).toThrow(AlreadyExistException);
        });
    });

    describe("setFactory", () => {
        it("should return difference instance for factory", () => {
            class Class {}

            container.setFactory(Class, () => new Class());
            const instance1 = container.get(Class);
            const instance2 = container.get(Class);
            expect(instance1 !== instance2).toEqual(true);
        });
        it("should throw AlreadyExistException if key does not exist", () => {
            class TestClass {}

            container.setFactory(TestClass, () => new TestClass());
            expect(() => container.setFactory(TestClass, () => new TestClass())).toThrow(AlreadyExistException);
        });
    });

    describe("setBind", () => {
        it("factory", () => {
            abstract class AbstractClass {}
            @factory()
            class AutoWareFactory {
                public constructor() {}
            }

            container.setBind(AbstractClass, AutoWareFactory);
            const instance1 = container.get(AbstractClass);
            const instance2 = container.get(AbstractClass);
            expect(instance1 !== instance2).toEqual(true);
        });
        it("singleton", () => {
            abstract class AbstractClass {}
            @singleton()
            class AutoWareSingleton {
                public constructor() {}
            }

            container.setBind(AbstractClass, AutoWareSingleton);
            const instance1 = container.get(AbstractClass);
            const instance2 = container.get(AbstractClass);
            expect(instance1 === instance2).toEqual(true);
        });
        it("missing decorator", () => {
            abstract class AbstractClass {}
            class AutoWareSingleton {
                public constructor() {}
            }

            expect(() => container.setBind(AbstractClass, AutoWareSingleton)).toThrow(MissingDecoratorException);
        });
        it("should throw AlreadyExistException if key does not exist", () => {
            abstract class AbstractClass {}
            @singleton()
            class AutoWareSingleton {
                public constructor() {}
            }

            container.setBind(AbstractClass, AutoWareSingleton);
            expect(() => container.setBind(AbstractClass, AutoWareSingleton)).toThrow(AlreadyExistException);
        });
    });

    describe("has", () => {
        it("should return true from exist instance", () => {
            class Class {}

            const key = Class;
            const instance = new Class();
            container.setInstance(key, instance);
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist bind singleton", () => {
            @singleton()
            class AutoWareSingleton {
                public constructor() {}
            }

            const key = AutoWareSingleton;
            const instance = AutoWareSingleton;
            container.setBind(key, instance);
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist bind factory", () => {
            @factory()
            class AutoWareFactory {
                public constructor() {}
            }

            const key = AutoWareFactory;
            const instance = AutoWareFactory;
            container.setBind(key, instance);
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist", () => {
            class Class {}

            const key = Class;
            container.set(key, () => new Class());
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist class metadata", () => {
            @singleton()
            class AutoWare {
                public constructor() {}
            }
            expect(container.has(AutoWare)).toEqual(true);
        });
    });
    describe("makeChildContainer", () => {
        it("should return true from exist instance", () => {
            class Class {}
            class ClassChildren {}

            const childContainer = container.makeChildContainer();
            const instanceClass = new Class();
            const instanceClassChildren = new ClassChildren();
            container.set(Class, () => instanceClass);
            childContainer.set(ClassChildren, () => instanceClassChildren);

            expect(container.has(Class)).toEqual(true);
            expect(container.has(ClassChildren)).toEqual(false);

            expect(childContainer.has(Class)).toEqual(true);
            expect(childContainer.has(ClassChildren)).toEqual(true);

            expect(container.get(Class)).toEqual(instanceClass);
            expect(() => container.get(ClassChildren)).toThrow(NotFoundException);

            expect(childContainer.get(Class)).toEqual(instanceClass);
            expect(childContainer.get(ClassChildren)).toEqual(instanceClassChildren);
        });
    });
});
