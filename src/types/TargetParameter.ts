import { Key } from "./Key";

export interface TargetParameter {
    index: number;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    key: Key<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inject: Key<any> | undefined;
}
