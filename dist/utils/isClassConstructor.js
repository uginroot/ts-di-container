"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClassConstructor = void 0;
function isClassConstructor(value) {
    return typeof value === "function" && value.toString().startsWith("class");
}
exports.isClassConstructor = isClassConstructor;
//# sourceMappingURL=isClassConstructor.js.map