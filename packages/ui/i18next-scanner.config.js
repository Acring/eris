const fs = require('node:fs');
const chalk = require('chalk');
const path = require('node:path');
const typescript = require('typescript');

module.exports = {
  input: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    // Use ! to filter out files or directories
    '!components/**/*.spec.{js,jsx,ts,tsx}',
    '!components/i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    compatibilityJSON: 'v3',
    // debug: true,
    func: {
      list: ['i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey(ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 2020,
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en-US', 'zh-CN', 'vi-VN'],
    ns: ['locale'],
    defaultLng: 'en-US',
    defaultNs: 'locale',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'i18n/{{ns}}/{{lng}}.json',
      savePath: 'i18n/{{ns}}/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;
    const { base, ext } = path.parse(file.path);
    if (['.ts', '.tsx'].includes(ext) && !base.includes('.d.ts')) {
      // resolve TS file
      const { outputText } = typescript.transpileModule(content, {
        compilerOptions: {
          target: 'es2020',
        },
        fileName: path.basename(file.path),
      });
      parser.parseTransFromString(outputText);
      parser.parseFuncFromString(
        outputText,
        { list: ['i18next._', 'i18next.__', 't'] },
        (key, options) => {
          options.defaultValue = key;
          parser.set(key, { ...options, nsSeparator: false, keySeparator: false });
          ++count;
        },
      );
    } else {
      // resolve JS file
      parser.parseFuncFromString(
        content,
        { list: ['i18next._', 'i18next.__', 't'] },
        (key, options) => {
          options.defaultValue = key;
          parser.set(key, { ...options, nsSeparator: false, keySeparator: false });
          ++count;
        },
      );
    }
    if (count > 0) {
      // eslint-disable-next-line no-console
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }
    done();
  },
};
