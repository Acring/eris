import * as cheerio from 'cheerio';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { processSvg } from './process-svg.mjs';
import { parseName } from './utils.mjs';
import { getAttrs, getElementCode } from './template.mjs';
import { readFile } from 'node:fs/promises';
import { exec } from 'node:child_process';

const fileUrl = new URL('../src/data.json', import.meta.url);
const icons = JSON.parse(await readFile(fileUrl, 'utf8'));

// import icons from '../src/data.json' assert { type: 'json' };
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const defaultStyle = process.env.npm_package_config_style || 'stroke';

const rootDir = path.join(__dirname, '..');

const srcDir = path.join(rootDir, 'src');
const iconsDir = path.join(rootDir, 'src/icons');

const generateIconsIndex = () => {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
    fs.mkdirSync(iconsDir);
  } else if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }

  fs.writeFileSync(path.join(rootDir, './src', 'index.ts'), '', 'utf-8');
};

const attrsToString = (attrs, style) => {
  return Object.keys(attrs)
    .map((key) => {
      if (key === 'width' || key === 'height' || key === style) {
        return `${key}={${attrs[key]}}`;
      }
      if (key === 'otherProps') {
        return '{...otherProps}';
      }
      return `${key}="${attrs[key]}"`;
    })
    .join(' ');
};

const generateIconCode = async ({ name }) => {
  const names = parseName(name, defaultStyle);
  const location = path.join(rootDir, 'src/svg', `${names.name}.svg`);
  const destination = path.join(rootDir, 'src/icons', `${names.componentName}.tsx`);
  const code = fs.readFileSync(location);
  const isColorful = names.name.includes('colorful');
  const svgCode = await processSvg(code, {
    isColorful,
  });
  const svgAttrs = getSvgAttrs(code);
  const ComponentName = names.componentName;
  const element = getElementCode(
    ComponentName,
    attrsToString(getAttrs(names.style, svgAttrs), names.style),
    svgAttrs,
    svgCode,
  );

  const component = element;

  fs.writeFileSync(destination, component, 'utf-8');

  console.log('Successfully built', ComponentName);
  return { ComponentName, name: names.name };
};

// append export code to icons.js
const appendToIconsIndex = ({ ComponentName }) => {
  const exportString = `export { default as ${ComponentName} } from './icons/${ComponentName}';\r\n`;
  fs.appendFileSync(path.join(rootDir, './src', 'index.ts'), exportString, 'utf-8');
};

function getSvgAttrs(svg) {
  const $ = cheerio.load(svg);
  return $('body').children().attr();
}

generateIconsIndex();

Object.keys(icons)
  .map((key) => icons[key])
  .forEach(({ name }) => {
    generateIconCode({ name }).then(({ ComponentName, name }) => {
      appendToIconsIndex({ ComponentName, name });
    });
  });

exec('eslint --fix ./src/**/*.{ts,tsx} && prettier --write ./src/**/*.{ts,tsx}', (err, stdout) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
