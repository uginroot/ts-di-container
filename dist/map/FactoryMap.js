"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryMap = void 0;
class FactoryMap extends Map {
    set(key, value) {
        super.set(key, value);
        return this;
    }
    get(key) {
        return super.get(key);
    }
    has(key) {
        return super.has(key);
    }
}
exports.FactoryMap = FactoryMap;
//# sourceMappingURL=FactoryMap.js.map