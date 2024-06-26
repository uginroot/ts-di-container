// noinspection JSUnusedLocalSymbols

import { makeClassDecorator } from "../utils/makeClassDecorator";
import { metadataMap } from "../global-variables/metadataMap";
import { Metadata } from "../types/Metadata";
import { TARGET_TYPE_SINGLETON } from "../constants/TARGET_TYPE_SINGLETON";
import { makeToken } from "../utils/makeToken";
import { inject } from "../decorators/inject";

describe("makeClassDecorator", () => {
    it("should create a decorator that sets metadata for a class", () => {
        const Decorator = makeClassDecorator(TARGET_TYPE_SINGLETON);

        @Decorator()
        class TestClass {
            constructor(arg1: any, arg2: any) {}
        }

        const metadata = metadataMap.get(TestClass) as Metadata;
        expect(metadata).toBeDefined();
        expect(metadata.type).toEqual(TARGET_TYPE_SINGLETON);
        expect(metadata.parameters).toHaveLength(2);
        expect(metadata.parameters[0].name).toEqual("arg1");
        expect(metadata.parameters[1].name).toEqual("arg2");
    });

    it("should not overwrite existing metadata", () => {
        const Decorator = makeClassDecorator(TARGET_TYPE_SINGLETON);

        const ARG1 = makeToken<string>("ARG1");

        @Decorator()
        class InjectedClass {}

        @Decorator()
        class TestClass {
            constructor(@inject(ARG1) arg1: string, arg2: InjectedClass) {}
        }

        const originalMetadata: Metadata = {
            type: TARGET_TYPE_SINGLETON,
            parameters: [
                { key: ARG1, index: 0, inject: ARG1, name: "arg1" },
                { key: InjectedClass, index: 1, inject: undefined, name: "arg2" },
            ],
        };
        metadataMap.set(TestClass, originalMetadata);

        const metadata = metadataMap.get(TestClass);
        expect(metadata).toEqual(originalMetadata);
    });
});
