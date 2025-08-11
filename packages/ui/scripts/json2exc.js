const xl = require('excel4node');

const wb = new xl.Workbook();
const ws = wb.addWorksheet('Sheet 1');
const LANG = {
  zh: {
    path: '../i18n/locale/zh-CN.json',
    output: './i18n/locale/zh-CN.xlsx',
    headingColumnNames: ['中文', '中文'],
  },
  en: {
    path: '../i18n/locale/en-US.json',
    output: './i18n/locale/en-US.xlsx',
    headingColumnNames: ['中文', '英语'],
  },
  vi: {
    path: '../i18n/locale/vi-VN.json',
    output: './i18n/locale/vi-VN.xlsx',
    headingColumnNames: ['中文', '越南语'],
  },
};
const { path, output, headingColumnNames } = LANG[process.argv[2]];

// 加载数据
const data = require(path);

let headingColumnNamesIndex = 1;
headingColumnNames.forEach((heading) => {
  ws.cell(1, headingColumnNamesIndex++).string(heading);
});

let rowIndex = 2;
for (const key in data) {
  let columnIndex = 1;
  ws.cell(rowIndex, columnIndex++).string(key);
  ws.cell(rowIndex, columnIndex++).string(data[key]);
  rowIndex++;
}
wb.write(output);
