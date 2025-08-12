module.exports = {
  env: {
    node: true,
  },
  extends: [require.resolve('@xsky/eris-eslint-config-ui/ui')],
  rules: {
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
  ignorePatterns: [
    'ConfigProvider.d.ts',
    'node_modules/',
    'dist/',
    '.eslintrc.js',
    'turbo',
    'tailwind.config.ts',
    '.release-it.js',
    'copy-assets-to-dist.js',
    'assets/',
  ],
};
