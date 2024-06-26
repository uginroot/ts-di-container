import { Key } from "./types/Key";
export declare abstract class ContainerInterface {
    abstract get<T>(key: Key<T>): T;
    abstract has<T>(key: Key<T>): boolean;
}
//# sourceMappingURL=ContainerInterface.d.ts.map