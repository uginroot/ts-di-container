import { makeClassDecorator } from "../utils/makeClassDecorator";
import { TARGET_TYPE_SINGLETON } from "../constants/TARGET_TYPE_SINGLETON";

export function singleton() {
    return makeClassDecorator(TARGET_TYPE_SINGLETON)();
}
