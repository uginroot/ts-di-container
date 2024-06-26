import { ContainerException } from "./ContainerException";

export class ConstructorNutFoundException extends ContainerException {
    public constructor(target: string) {
        super("Constructor not found in extendable class", { target });
        this.name = "ConstructorNutFoundException";
    }
}
