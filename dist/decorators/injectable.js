"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectable = void 0;
const makeClassDecorator_1 = require("../utils/makeClassDecorator");
const TARGET_TYPE_INJECTABLE_1 = require("../constants/TARGET_TYPE_INJECTABLE");
function injectable() {
    return (0, makeClassDecorator_1.makeClassDecorator)(TARGET_TYPE_INJECTABLE_1.TARGET_TYPE_INJECTABLE)();
}
exports.injectable = injectable;
//# sourceMappingURL=injectable.js.map