import { ContainerException } from "../errors/ContainerException";

describe("ContainerException", () => {
    it("should correctly set the message and name", () => {
        const exception = new ContainerException("Test message");

        expect(exception.message).toEqual("Test message");
        expect(exception.name).toEqual("ContainerException");
    });

    it("should correctly set the context", () => {
        const context = { key: "value" };
        const exception = new ContainerException("Test message", context);

        expect(exception.getContext()).toEqual(context);
    });

    it("should return an empty object if no context is provided", () => {
        const exception = new ContainerException("Test message");

        expect(exception.getContext()).toEqual({});
    });
});
