"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceMap = void 0;
class InstanceMap extends Map {
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
exports.InstanceMap = InstanceMap;
//# sourceMappingURL=InstanceMap.js.map