import { Token } from "../types/Token";

export function makeToken<T>(name: string): Token<T> {
    return Symbol.for(name) as Token<T>;
}
