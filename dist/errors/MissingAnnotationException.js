"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingAnnotationException = void 0;
const ContainerException_1 = require("./ContainerException");
class MissingAnnotationException extends ContainerException_1.ContainerException {
    constructor(key) {
        super("Unable to instantiate object. " +
            `The class '${key}' does not have the required '@injectable()' annotation.`);
        this.name = MissingAnnotationException.prototype.name;
    }
}
exports.MissingAnnotationException = MissingAnnotationException;
//# sourceMappingURL=MissingAnnotationException.js.map