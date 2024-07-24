export default {
    tabWidth: 4,
    arrowParens: "avoid",
    trailingComma: "none",
    printWidth: 80,
    semi: false,
    overrides: [
        {
            files: "*.{yaml,json}",
            options: {
                tabWidth: 2
            }
        }
    ],
    plugins: [
        "prettier-plugin-packagejson",
        "prettier-plugin-jsdoc",
        "prettier-plugin-organize-imports"
    ]
}
