import { Key } from "../types/Key";
import { getClassConstructorArgumentNames } from "../utils/getClassConstructorArgumentNames";
import { Metadata } from "../types/Metadata";
import { TARGET_TYPE_FACTORY } from "../constants/TARGET_TYPE_FACTORY";
import { metadataMap } from "../global-variables/metadataMap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inject(key: Key<any>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        const constructorArgumentNames = getClassConstructorArgumentNames(target);
        const metadata = metadataMap.get(target) || ({ type: TARGET_TYPE_FACTORY, parameters: [] } as Metadata);
        metadata.parameters[parameterIndex] = {
            inject: key,
            key: target,
            index: parameterIndex,
            name: constructorArgumentNames[parameterIndex],
        };
        metadataMap.set(target, metadata);
    };
}
