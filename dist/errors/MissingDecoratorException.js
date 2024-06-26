"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingDecoratorException = void 0;
const ContainerException_1 = require("./ContainerException");
class MissingDecoratorException extends ContainerException_1.ContainerException {
    constructor(key) {
        super("Unable to instantiate object. " +
            `The class '${key}' does not have the required '@singleton()' or '@factory()' decorator.`);
        this.name = "MissingDecoratorException";
    }
}
exports.MissingDecoratorException = MissingDecoratorException;
//# sourceMappingURL=MissingDecoratorException.js.map