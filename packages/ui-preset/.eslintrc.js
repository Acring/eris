/* eslint-env node */
module.exports = {
  extends: ['@xsky/eris-eslint-config-ui/library'],
  rules: {
    'no-console': 0,
  },
  ignorePatterns: ['tsup.config.ts', 'dist/', 'node_modules/', '.release-it.js'],
};
