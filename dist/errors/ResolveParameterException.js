"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveParameterException = void 0;
const ContainerException_1 = require("./ContainerException");
class ResolveParameterException extends ContainerException_1.ContainerException {
    constructor(parameterName, key, previous) {
        super(`Unable to resolve the parameter '${parameterName}' in the constructor of the class '${key}'. ` +
            "Please ensure that all dependencies are provided and correctly configured. " +
            `Previous error: ${previous?.message ?? String(previous)}`, { parameterName, key, previous });
        this.name = "ResolveParameterException";
    }
}
exports.ResolveParameterException = ResolveParameterException;
//# sourceMappingURL=ResolveParameterException.js.map