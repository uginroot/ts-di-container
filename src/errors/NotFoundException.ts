import { ContainerException } from "./ContainerException";

export class NotFoundException extends ContainerException {
    public constructor(key: string) {
        super("Key not found in container", { key });
        this.name = "NotFoundException";
    }
}
