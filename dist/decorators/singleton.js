"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleton = void 0;
const makeClassDecorator_1 = require("../utils/makeClassDecorator");
const TARGET_TYPE_SINGLETON_1 = require("../constants/TARGET_TYPE_SINGLETON");
function singleton() {
    return (0, makeClassDecorator_1.makeClassDecorator)(TARGET_TYPE_SINGLETON_1.TARGET_TYPE_SINGLETON)();
}
exports.singleton = singleton;
//# sourceMappingURL=singleton.js.map