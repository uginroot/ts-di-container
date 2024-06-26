const { resolve, join } = require("path");

module.exports = {
    testEnvironment: "node",
    transform: { "\\.[jt]sx?$": "ts-jest" },
    transformIgnorePatterns: ["/node_modules/", "/dist/"],
    setupFiles: [resolve(join(__dirname, "./jest.setup.ts"))],
};
