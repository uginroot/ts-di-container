import { AbstractClass } from "../types/AbstractClass";
import { ClassConstructor } from "../types/ClassConstructor";
import { ExpectedClassException } from "../errors/ExpectedClassException";
import { ConstructorNutFoundException } from "../errors/ConstructorNutFoundException";
import { getKeyDescription } from "./getKeyDescription";

// eslint-disable-next-line
export function getClassConstructorArgumentNames(target: AbstractClass<any> | ClassConstructor<any>): string[] {
    const targetString = target.toString();
    if (!/^class\s/.test(targetString)) {
        throw new ExpectedClassException(getKeyDescription(target));
    }
    const argumentsRegexp = /constructor\(([^)]*)/gim;
    const argumentsArray = argumentsRegexp.exec(targetString);
    if (argumentsArray === null) {
        if (/^class [a-z0-9_]*? extends/gim.test(targetString)) {
            throw new ConstructorNutFoundException(getKeyDescription(target));
        }
        return [];
    }
    return argumentsArray[1].split(",").map((param) => param.trim());
}
