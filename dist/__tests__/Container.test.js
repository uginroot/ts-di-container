"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("../Container");
const NotFoundException_1 = require("../errors/NotFoundException");
const injectable_1 = require("../decorators/injectable");
const makeToken_1 = require("../utils/makeToken");
const inject_1 = require("../decorators/inject");
const ResolveParameterException_1 = require("../errors/ResolveParameterException");
const injectableFactory_1 = require("../decorators/injectableFactory");
class NotExist {
}
class Class {
}
class ClassChildren {
}
const TOKEN = (0, makeToken_1.makeToken)("string");
let AutoWare = class AutoWare {
    constructor(s) { }
};
AutoWare = __decorate([
    (0, injectable_1.injectable)(),
    __param(0, (0, inject_1.inject)(TOKEN)),
    __metadata("design:paramtypes", [String])
], AutoWare);
let AutoWareSingleton = class AutoWareSingleton {
    constructor() { }
};
AutoWareSingleton = __decorate([
    (0, injectable_1.injectable)(),
    __metadata("design:paramtypes", [])
], AutoWareSingleton);
let AutoWareFactory = class AutoWareFactory {
    constructor() { }
};
AutoWareFactory = __decorate([
    (0, injectableFactory_1.injectableFactory)(),
    __metadata("design:paramtypes", [])
], AutoWareFactory);
describe(Container_1.Container.name, () => {
    let container;
    beforeEach(() => {
        container = new Container_1.Container();
    });
    describe("get", () => {
        it("should throw NotFoundException if key does not exist", () => {
            expect(() => container.get(NotExist)).toThrow(NotFoundException_1.NotFoundException);
        });
        it("should return the instance if key exists", () => {
            const key = Class;
            const instance = new Class();
            container.setInstance(key, instance);
            expect(container.get(key)).toBe(instance);
        });
        it("should return the instance if key auto ware exists", () => {
            const key = AutoWare;
            const parameter = "parameter";
            container.setInstance(TOKEN, parameter);
            expect(container.get(key)).toBeInstanceOf(AutoWare);
        });
        it("should throw ResolveParameterException if parameter failed resolve", () => {
            expect(() => container.get(AutoWare)).toThrow(ResolveParameterException_1.ResolveParameterException);
        });
        it("should return difference instance for factory", () => {
            container.setFactory(Class, () => new Class());
            const instance1 = container.get(Class);
            const instance2 = container.get(Class);
            expect(instance1 !== instance2).toEqual(true);
        });
        it("should return difference instance for auto ware bind factory", () => {
            container.setBind(AutoWareFactory, AutoWareFactory);
            const instance1 = container.get(AutoWareFactory);
            const instance2 = container.get(AutoWareFactory);
            expect(instance1 !== instance2).toEqual(true);
        });
        it("should return equal instance for auto ware bind singleton", () => {
            container.setBind(AutoWareSingleton, AutoWareSingleton);
            const instance1 = container.get(AutoWareSingleton);
            const instance2 = container.get(AutoWareSingleton);
            expect(instance1 === instance2).toEqual(true);
        });
    });
    describe("has", () => {
        it("should return true from exist instance", () => {
            const key = Class;
            const instance = new Class();
            container.setInstance(key, instance);
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist bind singleton", () => {
            const key = AutoWareSingleton;
            const instance = AutoWareSingleton;
            container.setBind(key, instance);
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist bind factory", () => {
            const key = AutoWareFactory;
            const instance = AutoWareFactory;
            container.setBind(key, instance);
            expect(container.has(key)).toEqual(true);
        });
        it("should return true from exist", () => {
            const key = Class;
            container.set(key, () => new Class());
            expect(container.has(key)).toEqual(true);
        });
    });
    describe("makeChildContainer", () => {
        it("should return true from exist instance", () => {
            const childContainer = container.makeChildContainer();
            container.set(Class, () => new Class());
            childContainer.set(ClassChildren, () => new ClassChildren());
            expect(container.has(Class)).toEqual(true);
            expect(container.has(ClassChildren)).toEqual(false);
            expect(childContainer.has(Class)).toEqual(true);
            expect(childContainer.has(ClassChildren)).toEqual(true);
        });
    });
});
//# sourceMappingURL=Container.test.js.map