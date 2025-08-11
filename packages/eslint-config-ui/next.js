const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    'unicorn/filename-case': 0,
    'import/no-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/no-named-as-default-member': 0,
    'func-names': 0,
    'no-bitwise': 0,
    'tsdoc/syntax': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    'no-implicit-coercion': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/function-component-definition': 0,
    '@typescript-eslint/no-empty-function': 0,
    'eslint-comments/require-description': 0,
    'no-constant-binary-expression': 0,
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-nested-ternary': 0,
    '@typescript-eslint/no-unsafe-return': 0, // 考虑打开
    'react/no-unstable-nested-components': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/naming-convention': 0,
    'prefer-named-capture-group': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/no-duplicates': 0,
    '@typescript-eslint/no-unnecessary-condition': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
};
