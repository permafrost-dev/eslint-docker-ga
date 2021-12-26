module.exports = {
    env: {
        node: true,
        browser: true,
        commonjs: true,
    },
    settings: {},
    extends: ['eslint:recommended'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
    },
};
