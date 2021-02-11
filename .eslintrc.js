module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:promise/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'jest', 'prettier'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        // warns about leftover log/debugger statements when building for Production
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // Rules for working with promises
        'promise/always-return': 'warn',
        'promise/catch-or-return': 'warn',
        'promise/prefer-await-to-then': 'warn',
        'promise/prefer-await-to-callbacks': 'warn',
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'], // reassign `state` param is a common practice in redux-toolkit
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/newline-after-import': ['error', { count: 1 }],
    },
}
