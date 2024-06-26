import { Key } from "../types/Key";

// eslint-disable-next-line
export function getKeyDescription(key: Key<any>): string {
    if (typeof key === "symbol") {
        if (key.description) {
            return `Symbol(${key.description})`;
        }
        return "Symbol()";
    }
    return key.prototype.constructor.name;
}
