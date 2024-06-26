"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassConstructorArgumentNames = void 0;
const ExpectedClassException_1 = require("../errors/ExpectedClassException");
const ConstructorNutFoundException_1 = require("../errors/ConstructorNutFoundException");
function getClassConstructorArgumentNames(target) {
    const targetString = target.toString();
    if (!/^class\s/.test(targetString)) {
        throw new ExpectedClassException_1.ExpectedClassException(target);
    }
    const argumentsRegexp = /constructor\(([^)]*)/gim;
    const argumentsArray = argumentsRegexp.exec(targetString);
    if (argumentsArray === null) {
        if (/^class [a-z0-9_]*? extends/gim.test(targetString)) {
            throw new ConstructorNutFoundException_1.ConstructorNutFoundException(target);
        }
        return [];
    }
    return argumentsArray[1].split(",").map((param) => param.trim());
}
exports.getClassConstructorArgumentNames = getClassConstructorArgumentNames;
//# sourceMappingURL=getClassConstructorArgumentNames.js.map