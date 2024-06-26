"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyDescription = void 0;
function getKeyDescription(key) {
    if (typeof key === "symbol") {
        if (key.description) {
            return `Symbol(${key.description})`;
        }
        return "Symbol()";
    }
    return key.prototype.constructor.name;
}
exports.getKeyDescription = getKeyDescription;
//# sourceMappingURL=getKeyDescription.js.map