import { TARGET_TYPE_FACTORY } from "../constants/TARGET_TYPE_FACTORY";
import { TARGET_TYPE_SINGLETON } from "../constants/TARGET_TYPE_SINGLETON";

export type TargetTypes = typeof TARGET_TYPE_FACTORY | typeof TARGET_TYPE_SINGLETON;
