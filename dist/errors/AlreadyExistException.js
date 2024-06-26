"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistException = void 0;
const ContainerException_1 = require("./ContainerException");
class AlreadyExistException extends ContainerException_1.ContainerException {
    constructor(key) {
        super(`Key already exists in container`, { key });
        this.name = "AlreadyExistException";
    }
}
exports.AlreadyExistException = AlreadyExistException;
//# sourceMappingURL=AlreadyExistException.js.map