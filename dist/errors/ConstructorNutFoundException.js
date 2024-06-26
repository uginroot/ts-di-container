"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorNutFoundException = void 0;
const ContainerException_1 = require("./ContainerException");
class ConstructorNutFoundException extends ContainerException_1.ContainerException {
    constructor(target) {
        super(`Constructor not found in extendable class`, { target });
        this.name = "ConstructorNutFoundException";
    }
}
exports.ConstructorNutFoundException = ConstructorNutFoundException;
//# sourceMappingURL=ConstructorNutFoundException.js.map