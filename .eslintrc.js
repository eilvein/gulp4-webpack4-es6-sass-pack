module.exports = {
    parser: 'babel-eslint',
    extends: ['plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    rules: {
        indent: ['error', 4],
        semi: ['off', 'always'],
        'no-console': 'off',
        'no-unused-vars': 'off'
    }
}
