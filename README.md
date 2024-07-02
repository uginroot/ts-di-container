# ts-di-container

This package provides a DI (Dependency Injection) container for TypeScript. It includes functions for automatically injecting dependencies into classes, decorators for automatically injecting classes, and dependency injection.

## Installation

```bash
npm i @uginroot/ts-di-container
```

## Use

### Container

The `Container` class represents a DI container. It provides methods for registering and retrieving dependencies. These methods are divided into two interfaces, `ContainerInterface` and `ContainerSetterInterface`. These interfaces are automatically registered with the container when it is created.

```ts
import {Container, singleton, factory, makeToken, inject} from '@uginroot/ts-di-container';

const container = new Container();

class Singleton {}
container.set(Singleton, () => new Singleton());
console.log(container.get(Singleton) instanceof Singleton);         // true
console.log(container.get(Singleton) === container.get(Singleton)); // true

class Factory {}
container.setFactory(Factory, () => new Factory());
console.log(container.get(Factory) instanceof Factory);         // true
console.log(container.get(Factory) === container.get(Factory)); // false <---

class Instance {}
container.setInstance(Factory, new Instance());
console.log(container.get(Instance) instanceof Instance);         // true
console.log(container.get(Instance) === container.get(Instance)); // true

abstract class BindInterface {}
class Bind extends BindInterface {}
container.set(Bind, () => new Bind());
container.setBind(BindInterface, Bind);
console.log(container.get(BindInterface) instanceof Bind);                  // true
console.log(container.get(BindInterface) === container.get(BindInterface)); // true

@singleton()
class AutoWareSingleton {
    public constructor() {}
}
console.log(container.get(AutoWareSingleton) instanceof AutoWareSingleton);         // true
console.log(container.get(AutoWareSingleton) === container.get(AutoWareSingleton)); // true

@factory()
class AutoWareFactory {
    public constructor() {
    }
}
console.log(container.get(AutoWareFactory) instanceof AutoWareFactory);         // true
console.log(container.get(AutoWareFactory) === container.get(AutoWareFactory)); // false <---

// Auto ware
@singleton()
class TestClass {}
const TOKEN = makeToken<string>("token description");
@singleton()
class AutoWare {
    public constructor(
        public testClass: TestClass,
        @inject(TOKEN) public str: string
    ) {}
}
container.setInstance(TOKEN, "test");
console.log(container.get(AutoWare) instanceof AutoWare);            // true
console.log(container.get(AutoWare) === container.get(AutoWare));    // true
console.log(container.get(AutoWare).testClass instanceof TestClass); // true
console.log(container.get(AutoWare).str === container.get(TOKEN));   // true
```

### ChildContainer

```ts
import { Container } from '@uginroot/ts-di-container';

class TestParent {}
class TestChild {}

const container = new Container();
const childContainer = container.createChildContainer();

container.set(TestParent, () => new TestParent());
childContainer.set(TestChild, () => new TestChild());

console.log(container.has(TestParent)); // true
console.log(container.has(TestChild));  // false <---

console.log(childContainer.has(TestParent)); // true
console.log(childContainer.has(TestChild));  // true

@singleton()
class AnyContainerAvailable {}

console.log(container.has(AnyContainerAvailable));      // true
console.log(childContainer.has(AnyContainerAvailable)); // true
```


### Interfaces & Types
```ts
export type AbstractClass<T = unknown> = Function & { prototype: T, name: string };
export type ClassConstructor<T = unknown> = new (...args: any[]) => T;
export type Token<T> = symbol;

export type Key<T> = ClassConstructor<T> | AbstractClass<T> | Token<T>;
```
```ts
export abstract class ContainerInterface {
    public abstract get<T>(key: Key<T>): T;
    public abstract has<T>(key: Key<T>): boolean;
}
```
```ts
export abstract class ContainerSetterInterface {
    public abstract setInstance<T>(key: Key<T>, value: T): ContainerInterface;
    public abstract setBind<T>(key: Key<T>, value: ClassConstructor<T>): ContainerInterface;
    public abstract setFactory<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
    public abstract set<T>(key: Key<T>, value: (container: ContainerInterface) => T): ContainerInterface;
}
```

### Simple example
```ts
// ./Dependency.ts
export abstract class DependencyInterface {}
export class Dependency implements DependencyInterface {}
```
```ts
// ./AnyClass.ts
import { DependencyInterface } from './Dependency';

export abstract class AnyClassInterface {}
export class AnyClass implements AnyClassInterface {
    public constructor(
        public dependency: DependencyInterface,
        public setting1: string,
        public setting2: string,
    ) {}
}
```
```ts
// ./di-tokens.ts
import { makeToken, Token } from '@uginroot/ts-di-container';

export const SETTING1 = makeToken<string>("setting1");
export const SETTING2 = Symbol("setting2") as Token<string>; // alternative
```

```ts
// ./main.ts
import { Container } from 'ts-di-container';
import { DependencyInterface, Dependency } from './Dependency';
import { AnyClassInterface, AnyClass } from './AnyClass';
import { SETTING1, SETTING2 } from './di-tokens';

const container: ContainerInterface = (() => {
    const container = new Container();
    
    container.setInstance(SETTING1, "value1");
    container.setInstance(SETTING2, "value2");
    container.set(DependencyInterface, (container: ContainerInterface) => {
        return new Dependency();
    });
    container.set(AnyClassInterface, (container: ContainerInterface) => {
        return new AnyClass(
            container.get(DependencyInterface),
            container.get(SETTING1),
            container.get(SETTING2),
        );
    });
    return container.get(ContainerInterface);
})();

const anyClass = container.get(AnyClassInterface);
```

### Simple example with decorators

```ts
// ./Dependency.ts
import { singleton } from '@uginroot/ts-di-container';

abstract class DependencyInterface {}
@singleton()
class Dependency implements DependencyInterface {}
```
```ts
// ./AnyClass.ts
import { singleton, inject } from 'ts-di-container';
import { SETTING1, SETTING2 } from './di-tokens';
import { DependencyInterface } from './Dependency';

abstract class AnyClassInterface {}
@singleton()
class AnyClass implements AnyClassInterface {
    public constructor(
        public dependency: DependencyInterface,
        @inject(SETTING1) public setting1: string,
        @inject(SETTING2) public setting2: string,
    ) {}
}
```

```ts
// ./di-tokens.ts
import { makeToken, Token } from '@uginroot/ts-di-container';

const SETTING1 = makeToken<string>("setting1");
const SETTING2 = Symbol("setting2") as Token<string>; // alternative
```

```ts
// ./main.ts
import { Container } from '@uginroot/ts-di-container';
import { DependencyInterface, Dependency } from './Dependency';
import { AnyClassInterface, AnyClass } from './AnyClass';
import { SETTING1, SETTING2 } from './di-tokens';

const container: ContainerInterface = (() => {
    const container = new Container();

    container.setInstance(SETTING1, "value1");
    container.setInstance(SETTING2, "value2");
    container.setBind(DependencyInterface, Dependency);
    container.setBind(AnyClassInterface, AnyClass);

    return container.get(ContainerInterface);
})();

const anyClass = container.get(AnyClassInterface);
```
