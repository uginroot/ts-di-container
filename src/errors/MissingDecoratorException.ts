import { ContainerException } from "./ContainerException";

export class MissingDecoratorException extends ContainerException {
    public constructor(key: string) {
        super(
            "Unable to instantiate object. " +
                `The class '${key}' does not have the required '@singleton()' or '@factory()' decorator.`,
        );
        this.name = "MissingDecoratorException";
    }
}
