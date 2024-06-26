"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataMap = void 0;
class MetadataMap extends Map {
    set(key, metadata) {
        super.set(key, metadata);
        return this;
    }
    get(key) {
        return super.get(key);
    }
    has(key) {
        return super.has(key);
    }
}
exports.MetadataMap = MetadataMap;
//# sourceMappingURL=MetadataMap.js.map