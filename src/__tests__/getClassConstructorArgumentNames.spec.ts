// noinspection JSUnusedLocalSymbols

import { getClassConstructorArgumentNames } from "../utils/getClassConstructorArgumentNames";
import { AbstractClass } from "../types/AbstractClass";
import { ClassConstructor } from "../types/ClassConstructor";
import { ExpectedClassException } from "../errors/ExpectedClassException";
import { ConstructorNutFoundException } from "../errors/ConstructorNutFoundException";

describe("getClassConstructorArgumentNames", () => {
    it("should return the argument names for a class constructor", () => {
        class TestClass {
            constructor(arg1: any, arg2: any) {}
        }

        const result = getClassConstructorArgumentNames(TestClass);
        expect(result).toEqual(["arg1", "arg2"]);
    });

    it("should throw ExpectedClassException if the target is not a class", () => {
        const notAClass = function () {};

        expect(() =>
            getClassConstructorArgumentNames(notAClass as unknown as AbstractClass<any> | ClassConstructor<any>),
        ).toThrow(ExpectedClassException);
    });

    it("should throw ConstructorNutFoundException if the extendable class does not have a constructor", () => {
        class ParentClass {}
        class TestClass extends ParentClass {}

        expect(() => getClassConstructorArgumentNames(TestClass)).toThrow(ConstructorNutFoundException);
    });

    it("should return an empty array if the class extends another class have constructor", () => {
        class ParentClass {
            constructor(arg1: any) {}
        }

        class ChildClass extends ParentClass {
            constructor(arg1: any) {
                super(arg1);
            }
        }

        const result = getClassConstructorArgumentNames(ChildClass);
        expect(result).toEqual(["arg1"]);
    });
});
