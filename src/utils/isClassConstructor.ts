import { ClassConstructor } from "../types/ClassConstructor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isClassConstructor(value: any): value is ClassConstructor<any> {
    return typeof value === "function" && value.toString().startsWith("class");
}
