export class ContainerException extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(message: string, private readonly context: Record<string, any> = {}) {
        super(message);
        this.name = "ContainerException";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getContext(): Record<string, any> {
        return this.context;
    }
}
