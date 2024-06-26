import { TargetTypes } from "./TargetTypes";
import { TargetParameter } from "./TargetParameter";

export interface Metadata {
    type: TargetTypes;
    parameters: TargetParameter[];
}
