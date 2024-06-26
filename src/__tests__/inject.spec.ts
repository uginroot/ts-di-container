import { inject } from "../decorators/inject";
import { metadataMap } from "../global-variables/metadataMap";
import { Metadata } from "../types/Metadata";
import { makeToken } from "../utils/makeToken";
import { singleton } from "../decorators/singleton";
import { TARGET_TYPE_SINGLETON } from "../constants/TARGET_TYPE_SINGLETON";

describe("inject", () => {
    it("should add metadata for a constructor parameter", () => {
        const KEY = makeToken<string>("KEY");

        @singleton()
        class TestClass {
            constructor(@inject(KEY) arg1: string) {}
        }

        const metadata: Metadata = {
            type: TARGET_TYPE_SINGLETON,
            parameters: [{ key: String, index: 0, inject: KEY, name: "arg1" }],
        };
        expect(metadataMap.get(TestClass)).toEqual(metadata);
    });

    it("should not overwrite existing metadata", () => {
        const KEY1 = Symbol("key1");
        const KEY2 = Symbol("key2");

        @singleton()
        class InjectedClass {}

        @singleton()
        class TestClass {
            constructor(@inject(KEY1) arg1: string, @inject(KEY2) arg2: string, arg3: InjectedClass) {}
        }

        const metadata: Metadata = {
            type: TARGET_TYPE_SINGLETON,
            parameters: [
                { key: String, index: 0, inject: KEY1, name: "arg1" },
                { key: String, index: 1, inject: KEY2, name: "arg2" },
                { key: InjectedClass, index: 2, inject: undefined, name: "arg3" },
            ],
        };
        expect(metadataMap.get(TestClass)).toEqual(metadata);
    });
});
