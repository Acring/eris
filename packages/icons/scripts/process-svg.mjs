import { optimize as svgo } from 'svgo';
import * as cheerio from 'cheerio';

/**
 * Convert string to CamelCase.
 * @param {string} str - A string.
 * @returns {string}
 */
function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @param {object} options - Options for optimize SVG
 * @returns {Promise<string>}
 */
function optimize(svg, options) {
  return new Promise((resolve) => {
    resolve(
      svgo(svg, {
        plugins: [
          {
            name: 'convertShapeToPath',
            params: {
              convertArcs: false,
            },
          },
          {
            name: 'mergePaths',
            params: {
              force: false,
            },
          },
          // if icon is colorful, reserved svg color attribute
          {
            name: 'removeAttrs',
            params: {
              attrs: options.isColorful ? '' : '(fill|stroke.*)',
            },
          },
          {
            name: 'removeTitle',
          },
        ],
      }).data,
    );
  });
}

/**
 * remove SVG element.
 * @param {string} svg - An SVG string.
 * @returns {string}
 */
function removeSVGElement(svg) {
  const $ = cheerio.load(svg, {
    xml: {
      // 保持 XML 标签名称的大小写
      lowerCaseTags: false,
    },
  });

  // 获取 svg 标签下的所有内容
  let content = $('svg').html();

  if (!content) {
    return '';
  }

  // 删除 xmlns 属性
  content = content.replace(/xmlns="[^"]*"/g, '');
  // 替换 clippath 为 clipPath
  content = content.replace(/clippath/g, 'clipPath');
  // style 转换为 react style
  content = content.replace(/style="([^"]*)"/g, (_, style) => {
    const styleObj = {};
    if (!style) return 'style={{}}';

    style
      .split(';')
      .filter(Boolean)
      .forEach((item) => {
        const [key, value] = item.split(':').map((s) => s.trim());
        if (key && value) {
          // 转换 CSS 属性名为驼峰式
          const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          styleObj[camelKey] = value;
        }
      });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  return content;
}

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {object} options - Options of svg
 * @param {Promise<string>}
 */
export async function processSvg(svg, options) {
  const optimized = await optimize(svg, options)
    // remove semicolon inserted by prettier
    // because prettier thinks it's formatting JSX not HTML
    // .then((svg) => svg.replace(/;/g, ''))
    .then(removeSVGElement)
    .then((svg) => svg.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`));
  return optimized;
}
