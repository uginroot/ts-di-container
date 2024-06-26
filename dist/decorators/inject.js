"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
const getClassConstructorArgumentNames_1 = require("../utils/getClassConstructorArgumentNames");
const TARGET_TYPE_FACTORY_1 = require("../constants/TARGET_TYPE_FACTORY");
const metadataMap_1 = require("../global-variables/metadataMap");
function inject(key) {
    return function (target, propertyKey, parameterIndex) {
        const constructorArgumentNames = (0, getClassConstructorArgumentNames_1.getClassConstructorArgumentNames)(target);
        const metadata = metadataMap_1.metadataMap.get(target) || { type: TARGET_TYPE_FACTORY_1.TARGET_TYPE_FACTORY, parameters: [] };
        metadata.parameters[parameterIndex] = {
            inject: key,
            key: target,
            index: parameterIndex,
            name: constructorArgumentNames[parameterIndex],
        };
        metadataMap_1.metadataMap.set(target, metadata);
    };
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map