/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
// Load the exported variables from Figma
const data: FigmaVariables = require('../designSystem/figma-variables.json');

type Value = string | number | boolean;

interface BaseVariableItem {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'color';
}

interface RawVariableItem extends BaseVariableItem {
  isAlias: false;
  value: Value | RGBA;
}

interface AliasVariableItem extends BaseVariableItem {
  isAlias: true;
  value: {
    collection: string;
    name: string;
  };
}

interface ModeItem {
  name: string;
  variables: (RawVariableItem | AliasVariableItem)[];
}

interface Collection {
  name: string;
  modes: ModeItem[];
}
interface FigmaVariables {
  version: string;
  metadata: Record<string, any>;
  collections: Collection[];
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function convertColor({ r, g, b, a }: RGBA) {
  return `rgba(${r}, ${g}, ${b},${a})`;
}

// 将 figma 变量转换为 tailwind 配置
function convert() {
  const tailwindConfig: {
    colors: Record<string, any>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    fontSize: Record<string, any>;
    boxShadow: Record<string, any>;
    fontFamily?: Record<string, any>;
    height: Record<string, any>;
    width: Record<string, any>;
  } = {
    colors: {},
    spacing: {},
    borderRadius: {},
    fontSize: {},
    boxShadow: {},
    height: {},
    width: {},
  };

  const rootCSSVariables: { default: Record<string, string>; dark: Record<string, string> } = {
    default: {},
    dark: {},
  };

  const bodyCSSVariables: { default: Record<string, string>; dark: Record<string, string> } = {
    default: {},
    dark: {},
  };

  const collections = data.collections;

  const colors = collections.find((item) => item.name === 'colors');
  if (!colors) {
    console.log(`请检查 colors collection  是否存在`);
    return;
  }

  // 处理基础 colors 完整色板
  const newColors = tailwindConfig.colors;

  //colors 只有一个 Default
  for (const item of colors.modes[0].variables) {
    const name = item.name.replace('/', '-');
    rootCSSVariables.default[name] = convertColor(item.value as any);

    newColors[name] = `var(--${name})`;
  }

  for (const item of colors.modes[1].variables) {
    const name = item.name.replace('/', '-');
    rootCSSVariables.dark[name] = convertColor(item.value as any);
  }

  // 处理基础 spacing
  const newSpacing = tailwindConfig.spacing;
  const spacing = collections.find((item) => item.name === 'spacing');
  if (!spacing) {
    console.log(`请检查 spacing collection 是否存在`);
    return;
  }
  for (const item of spacing.modes[0].variables) {
    newSpacing[item.name] = `${item.value as string}px`;
  }

  // 处理基础 radius
  const newRadius = tailwindConfig.borderRadius;

  const radius = collections.find((item) => item.name === 'radius');
  if (!radius) {
    console.log(`请检查 radius collection 是否存在`);
    return;
  }
  for (const item of radius.modes[0].variables) {
    newRadius[item.name] = `${item.value as string}px`;
  }

  const newHeight = tailwindConfig.height;

  const newWidth = tailwindConfig.width;

  // 处理 fontSize
  const newFontSize = tailwindConfig.fontSize;
  const fontSize = collections.find((item) => item.name === 'fontsize');
  if (!fontSize) {
    console.log(`请检查 fontsize collection 是否存在`);
    return;
  }
  // 处理 fontSize

  for (const item of fontSize.modes[0].variables) {
    if (!newFontSize[item.name.split('/')[0]]) {
      newFontSize[item.name.split('/')[0]] = ['', ''];
    }
    if (item.name.split('/')[1] === 'size') {
      newFontSize[item.name.split('/')[0]][0] = `${item.value as string}px`;
    } else {
      newFontSize[item.name.split('/')[0]][1] = `${item.value as string}px`;
    }
  }

  // 处理 box-shadow
  const newBoxShadow = tailwindConfig.boxShadow;
  const boxShadow = collections.find((item) => item.name === 'box-shadow');
  if (!boxShadow) {
    console.log(`请检查 box-shadow collection 是否存在`);
    return;
  }

  for (const item of boxShadow.modes[0].variables) {
    const name = item.name.replaceAll('/', '-');
    if (name.includes('primary')) {
      rootCSSVariables.default[name] = item.value as string;
      rootCSSVariables.dark[name] = item.value as string;
      newBoxShadow[name] = `var(--${name})`;
    } else {
      newBoxShadow[name] = item.value;
    }
  }

  // 处理项目级 tokens colors
  const tokens = collections.find((item) => item.name === 'tokens')!;
  if (!tokens) {
    console.log(`请检查 tokens collection 是否存在`);
    return;
  }
  const lightModeTokens = tokens.modes.find((item) => item.name === 'Default');
  if (!lightModeTokens) {
    console.log(`请检查 tokens collection default mode 是否存在`);
    return;
  }
  const darkModeTokens = tokens.modes.find((item) => item.name === 'Dark');
  if (!darkModeTokens) {
    console.log(`请检查 tokens collection dark mode 是否存在`);
    return;
  }

  // 处理组件级 tokens colors
  const components = collections.find((item) => item.name === 'components')!;
  if (!components) {
    console.log(`请检查 components collection 是否存在`);
    return;
  }

  const componentsLightModeTokens = components.modes.find((item) => item.name === 'Default');
  if (!componentsLightModeTokens) {
    console.log(`请检查 components collection default mode 是否存在`);
    return;
  }
  lightModeTokens.variables.push(...componentsLightModeTokens.variables);

  const componentsDarkModeTokens = components.modes.find((item) => item.name === 'Dark');
  if (!componentsDarkModeTokens) {
    console.log(`请检查 components collection dark mode 是否存在`);
    return;
  }
  darkModeTokens.variables.push(...componentsDarkModeTokens.variables);

  // 生成 css Variables
  for (const item of lightModeTokens.variables) {
    // skip [spacing, radius, height, width]
    if (['spacing', 'radius', 'height', 'width'].some((key) => item.name.includes(key))) continue;
    if (item.isAlias) {
      // 目前是只有 colors 有 alias
      bodyCSSVariables.default[item.name.replaceAll('/', '-')] =
        `theme('colors.${item.value.name.replaceAll('/', '-')}')`;
    } else if (!item.isAlias) {
      bodyCSSVariables.default[item.name.replaceAll('/', '-')] = convertColor(item.value as RGBA);
    }
    newColors[item.name.replaceAll('/', '-')] = `var(--${item.name.replaceAll('/', '-')})`;
  }

  for (const item of darkModeTokens.variables) {
    // skip [spacing, radius, height, width]
    if (['spacing', 'radius', 'height', 'width'].some((key) => item.name.includes(key))) continue;
    if (item.isAlias) {
      // 目前是只有 colors 有 alias
      bodyCSSVariables.dark[item.name.replaceAll('/', '-')] =
        `theme('colors.${item.value.name.replaceAll('/', '-')}')`;
    } else if (!item.isAlias) {
      bodyCSSVariables.dark[item.name.replaceAll('/', '-')] = convertColor(item.value as RGBA);
    }
  }

  // 处理组件级别的 height
  for (const item of lightModeTokens.variables.filter((item) => item.name.includes('height'))) {
    newHeight[item.name.replaceAll('/', '-')] =
      typeof item.value === 'string' ? item.value : `${item.value as number}px`;
  }

  // 处理组件级别的 width
  for (const item of lightModeTokens.variables.filter((item) => item.name.includes('width'))) {
    newWidth[item.name.replaceAll('/', '-')] =
      typeof item.value === 'string' ? item.value : `${item.value as number}px`;
  }

  // 处理项目级 tokens spacing
  for (const item of tokens.modes[0].variables.filter((item) => item.name.includes('spacing'))) {
    if (item.isAlias) {
      newSpacing[item.name.replaceAll('/', '-')] = newSpacing[item.value.name];
    } else {
      newSpacing[item.name.replaceAll('/', '-')] =
        typeof item.value === 'string' ? item.value : `${item.value as number}px`;
    }
  }

  // 处理项目级 tokens radius
  for (const item of tokens.modes[0].variables.filter((item) => item.name.includes('radius'))) {
    if (item.isAlias) {
      newRadius[item.name.replaceAll('/', '-')] = newRadius[item.value.name];
    } else {
      newRadius[item.name.replaceAll('/', '-')] = item.value as string;
    }
  }

  // 处理 font-family
  const font = collections.find((item) => item.name === 'font-family');
  if (!font) {
    console.log(`请检查 font-family collection 是否存在`);
    return;
  }

  const fontFamily = font.modes[0].variables[0].value as string;
  tailwindConfig.fontFamily = {
    sans: fontFamily.replace(/"/g, '').split(' , '),
  };

  // write to tailwind config file
  const jsonString = JSON.stringify(
    {
      extend: tailwindConfig,
    },
    null,
    2,
  );

  // 递归检查所有的 key 是否存在空格
  function checkKey(obj: any) {
    for (const key in obj) {
      if (key.includes(' ')) {
        console.error(`❌ tailwind 配置文件中存在空格的 key: ${key}`);
      }
      if (typeof obj[key] === 'object') {
        checkKey(obj[key]);
      }
    }
  }

  checkKey(tailwindConfig);

  const singleQuotedJsonString = jsonString.replace(/"/g, `'`);

  fs.writeFileSync(
    './src/theme/extension/theme.ts',
    `// 根据 Figma Variables 生成 \n\n` +
      `import type { OptionalConfig } from "tailwindcss/types/config"; \n\n` +
      `export const theme: OptionalConfig['theme'] = ${singleQuotedJsonString};`,
    'utf-8',
  );
  console.log(' 生成 tailwind 配置文件成功 ');

  const colorsString = `
    export const getRootColors = (dark: boolean) => {
      if( dark ) {
        return {
          ${Object.keys(rootCSSVariables.dark)
            .map((key) => `'--${key}': '${rootCSSVariables.dark[key]}'`)
            .join(',\n')}
        }
      }
      return {
        ${Object.keys(rootCSSVariables.default)
          .map((key) => `'--${key}': '${rootCSSVariables.default[key]}'`)
          .join(',\n')}
      }
      
    }

    export const getBodyColors = (dark: boolean, theme: any) => {
      if( dark ) {
        return {
          ${Object.keys(bodyCSSVariables.dark)
            .map(
              (key) =>
                `'--${key}': ${
                  bodyCSSVariables.dark[key].includes('theme')
                    ? bodyCSSVariables.dark[key]
                    : `'${bodyCSSVariables.dark[key]}'`
                }`,
            )
            .join(',\n')}
        }
      }
      return {
        ${Object.keys(bodyCSSVariables.default)
          .map(
            (key) =>
              `'--${key}': ${
                bodyCSSVariables.default[key].includes('theme')
                  ? bodyCSSVariables.default[key]
                  : `'${bodyCSSVariables.default[key]}'`
              }`,
          )
          .join(',\n')}
      }
      
    }
  `;

  fs.writeFileSync('./src/theme/tokens/colors.ts', colorsString, 'utf-8');
  console.log(' 生成 colors 成功 ');
}

convert();

export {};
