interface BulkOptions {
  splitUnit?: boolean;
  toUnit?: string;
  withScale?: boolean;
}
/**
 * options optional attributes ‘splitUnit’ & ‘withScale’ & ‘toUnit’;
 * When toUnit is not empty, you can specify the value of the corresponding unit;
 * When splitUnit is true, by setting withScale to true, the conversion ratio of the corresponding unit will be returned together;
 * Similar to [1, '10,000', 1e4].
 */
function bulk(value: number, options?: BulkOptions, lang?: 'zh-CN' | 'en-US' | 'vi-VM') {
  const BULK_MAP = getBulkMap(lang);

  let unit = BULK_MAP[0][1];
  if (!value) {
    if (options && options.splitUnit) return [0, unit];
    return `0${unit}`;
  }
  let i = 1;
  while (BULK_MAP[i] && value >= (BULK_MAP[i][0] as number)) {
    i++;
  }
  unit = BULK_MAP[i - 1][1];
  let resultValue = value / (BULK_MAP[i - 1][0] as number);
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (options && options.toUnit) {
    unit = BULK_MAP.filter((b) => b[1] === options.toUnit)[0][1];
    resultValue = value / (BULK_MAP.filter((b) => b[1] === options.toUnit)[0][0] as number);
  }
  if (parseInt(`${resultValue}`, 10) !== resultValue) {
    // 保留两位小数
    resultValue = Math.floor(resultValue * 100) / 100;
  }
  if (options && options.splitUnit) {
    if (options.withScale)
      return [
        resultValue,
        unit,
        options.toUnit ? BULK_MAP.filter((b) => b[1] === options.toUnit)[0][0] : BULK_MAP[i - 1][0],
      ];
    return [resultValue, unit];
  }
  const noUnit = !unit;
  return `${resultValue}${noUnit ? '' : ' '}${unit}`;
}

function getBulkMap(lang?: 'zh-CN' | 'en-US' | 'vi-VM') {
  if (lang === 'zh-CN') {
    return [
      [1, ''],
      [1e4, '万'],
      [1e8, '亿'],
      [1e12, '兆'],
      [1e16, '京'],
    ];
  } else if (lang === 'vi-VM') {
    return [
      [1, ''],
      [1e3, 'nghìn'],
      [1e6, 'miệu'],
      [1e9, 'tỷ'],
      [1e12, 'nghìn tỷ'],
    ];
  }
  return [
    [1, ''],
    [1e3, 'K'],
    [1e6, 'M'],
    [1e9, 'B'],
    [1e12, 'T'],
  ];
}

export default bulk;
