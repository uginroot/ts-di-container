"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const ContainerException_1 = require("./ContainerException");
class NotFoundException extends ContainerException_1.ContainerException {
    constructor(key) {
        super(`Key not found in container`, { key });
        this.name = "NotFoundException";
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map