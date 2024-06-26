import { TARGET_TYPE_FACTORY } from "../constants/TARGET_TYPE_FACTORY";
import { makeClassDecorator } from "../utils/makeClassDecorator";

export function factory() {
    return makeClassDecorator(TARGET_TYPE_FACTORY)();
}
