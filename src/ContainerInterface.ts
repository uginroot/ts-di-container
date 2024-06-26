import { Key } from "./types/Key";

export abstract class ContainerInterface {
    public abstract get<T>(key: Key<T>): T;
    public abstract has<T>(key: Key<T>): boolean;
}
