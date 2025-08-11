import * as changeCase from 'change-case';

const parseName = (name, defaultStyle) => {
  const nameSlices = name.split('_');

  const fill = nameSlices.includes('fill');
  const line = nameSlices.includes('line');
  const isColorful = nameSlices.includes('colorful');

  let style;
  // 目前没有 stroke 的图标
  if (isColorful) {
    style = 'fill';
  } else if (fill) {
    style = 'fill';
  } else if (line) {
    style = 'fill';
  } else {
    style = defaultStyle;
  }

  return {
    name,
    componentName: changeCase.pascalCase(name, {
      mergeAmbiguousCharacters: true,
    }),
    style,
  };
};

export { parseName };
