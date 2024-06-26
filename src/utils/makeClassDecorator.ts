import "reflect-metadata";
import { TargetTypes } from "../types/TargetTypes";
import { getClassConstructorArgumentNames } from "./getClassConstructorArgumentNames";
import { metadataMap } from "../global-variables/metadataMap";
import { Metadata } from "../types/Metadata";

export function makeClassDecorator(type: TargetTypes) {
    return () => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return function <T extends Function>(target: T) {
            const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
            const constructorArgumentNames = getClassConstructorArgumentNames(target);
            const metadata = metadataMap.get(target) || ({ type: type, parameters: [] } as Metadata);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            paramTypes.map((param: any, index: number): void => {
                metadata.parameters[index] = {
                    key: param,
                    index: index,
                    inject: metadata.parameters[index]?.inject,
                    name: constructorArgumentNames[index],
                };
            });
            metadata.type = type;
            metadataMap.set(target, metadata);
        };
    };
}
