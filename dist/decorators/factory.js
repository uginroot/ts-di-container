"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const TARGET_TYPE_FACTORY_1 = require("../constants/TARGET_TYPE_FACTORY");
const makeClassDecorator_1 = require("../utils/makeClassDecorator");
function factory() {
    return (0, makeClassDecorator_1.makeClassDecorator)(TARGET_TYPE_FACTORY_1.TARGET_TYPE_FACTORY)();
}
exports.factory = factory;
//# sourceMappingURL=factory.js.map