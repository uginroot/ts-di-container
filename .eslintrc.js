module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        project: ["./tsconfig.json"],
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/member-ordering": ["error", { default: ["signature", "field", "constructor", "method"] }],
        "linebreak-style": ["error", "unix"],
        "max-len": ["error", { code: 120, ignorePattern: "^import .*" }],
        "padding-line-between-statements": ["error", { blankLine: "always", prev: "block-like", next: "function" }],
        quotes: ["error", "double", { "avoidEscape": true }],
        semi: ["error", "always"],
        "@typescript-eslint/no-floating-promises": "error",
        "import/no-extraneous-dependencies": [
            "warn",
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/await-thenable": "error",
    },
    ignorePatterns: [".eslintrc.js"],
    settings: {
        "import/resolver": {
            typescript: {
                extensions: [".ts", ".tsx"],
                project: [
                    "./src",
                ],
            },
            node: true,
        },
    },
};
