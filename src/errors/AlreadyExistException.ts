import { ContainerException } from "./ContainerException";

export class AlreadyExistException extends ContainerException {
    public constructor(key: string) {
        super("Key already exists in container", { key });
        this.name = "AlreadyExistException";
    }
}
