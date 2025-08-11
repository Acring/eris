module.exports = {
  env: {
    node: true,
  },
  extends: ['@xsky/eris-eslint-config-ui/ui'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-console': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', 'turbo', '.release-it.js'],
};
