const path = require("path");
module.exports = {
    root: true,
    extends: ["@gregros/eslint-config"],
    parserOptions: {
        project: [
            "src/lib/tsconfig.esm.json",
            "src/test/tsconfig.json"
        ]
    }
};
