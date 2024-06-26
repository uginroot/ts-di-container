import { ContainerException } from "./ContainerException";

export class ResolveParameterException extends ContainerException {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(parameterName: string, key: string, previous?: any) {
        super(
            `Unable to resolve the parameter '${parameterName}' in the constructor of the class '${key}'. ` +
                "Please ensure that all dependencies are provided and correctly configured. " +
                `Previous error: ${previous?.message ?? String(previous)}`,
            { parameterName, key, previous },
        );
        this.name = "ResolveParameterException";
    }
}
