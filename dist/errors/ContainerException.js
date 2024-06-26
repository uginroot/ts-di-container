"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerException = void 0;
class ContainerException extends Error {
    constructor(message, context = {}) {
        super(message);
        this.context = context;
        this.name = "ContainerException";
    }
    getContext() {
        return this.context;
    }
}
exports.ContainerException = ContainerException;
//# sourceMappingURL=ContainerException.js.map