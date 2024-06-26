"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectedClassException = void 0;
const ContainerException_1 = require("./ContainerException");
class ExpectedClassException extends ContainerException_1.ContainerException {
    constructor(target) {
        super(`Expected a class`, { target });
        this.name = "ExpectedClassException";
    }
}
exports.ExpectedClassException = ExpectedClassException;
//# sourceMappingURL=ExpectedClassException.js.map