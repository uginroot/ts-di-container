"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClassDecorator = void 0;
require("reflect-metadata");
const getClassConstructorArgumentNames_1 = require("./getClassConstructorArgumentNames");
const metadataMap_1 = require("../global-variables/metadataMap");
function makeClassDecorator(type) {
    return () => {
        return function (target) {
            const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
            const constructorArgumentNames = (0, getClassConstructorArgumentNames_1.getClassConstructorArgumentNames)(target);
            const metadata = metadataMap_1.metadataMap.get(target) || { type: type, parameters: [] };
            paramTypes.map((param, index) => {
                metadata.parameters[index] = {
                    key: param,
                    index: index,
                    inject: metadata.parameters[index]?.inject,
                    name: constructorArgumentNames[index],
                };
            });
            metadata.type = type;
            metadataMap_1.metadataMap.set(target, metadata);
        };
    };
}
exports.makeClassDecorator = makeClassDecorator;
//# sourceMappingURL=makeClassDecorator.js.map