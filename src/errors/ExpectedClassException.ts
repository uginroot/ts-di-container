import { ContainerException } from "./ContainerException";

export class ExpectedClassException extends ContainerException {
    public constructor(target: string) {
        super("Expected a class", { target });
        this.name = "ExpectedClassException";
    }
}
