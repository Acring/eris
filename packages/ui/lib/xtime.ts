const formatDecimalsRegExp = /(?:\.0*|(\.\d+?)0+)$/;

const map = {
  μs: 1,
  ms: Math.pow(10, 3),
  s: Math.pow(10, 6),
  m: 60 * Math.pow(10, 6),
  h: Math.pow(60, 2) * Math.pow(10, 6),
  d: 24 * Math.pow(60, 2) * Math.pow(10, 6),
};

const parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(μs|ms|s|m|h|d)$/i;

export type MapKeyTypes = keyof typeof map;
interface OptionsType {
  unitSeparator?: string;
  decimalPlaces?: number;
  fixedDecimals?: boolean;
  toUnit?: MapKeyTypes;
  unit?: MapKeyTypes;
}

interface OptionsTypeWithSplitUnit extends OptionsType {
  splitUnit?: true;
}

interface OptionsTypeWithOutSplitUnit extends OptionsType {
  splitUnit?: false;
}

/**
 * 3600 => 01:00:00
 * @param {Number} val second
 * @param {Boolean} isShowDay Whether to convert to 175000 with days => 2 days 00:36:40
 */
function restTime(val: number, isShowDay = false) {
  if (!val || typeof val !== 'number') return '00:00:00';
  // Converted to us level, map can be reused for conversion
  let us = val * map.s,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;
  const fmt = (v: number) => (v < 10 ? `0${v}` : v);
  while (us > 0) {
    if (isShowDay && us >= map.d) {
      days = parseInt(`${us / map.d}`);
      us = us % map.d;
    } else if (us >= map.h) {
      hours = parseInt(`${us / map.h}`);
      us = us % map.h;
    } else if (us >= map.m) {
      minutes = parseInt(`${us / map.m}`);
      us = us % map.m;
    } else {
      seconds = parseInt(`${us / map.s}`);
      us = 0;
    }
  }
  const day = days > 0 ? `${days}d ` : '';
  return `${day}${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}`;
}

function timeFormat(timeStr: string) {
  let result = '';
  const usParse = parse(timeStr);
  if (usParse >= map.h) {
    result += `${Math.floor(usParse / map.h)}h `;
  }
  if (usParse >= map.m) {
    result += `${Math.floor((usParse % map.h) / map.m)}m `;
  }
  result += `${Math.floor((usParse % map.m) / map.s)}s`;
  return result;
}

function format(value: number, options?: OptionsTypeWithSplitUnit | OptionsTypeWithOutSplitUnit) {
  let mag = Math.abs(value);
  if (options?.unit) {
    mag *= map[options.unit];
  }
  const unitSeparator = options?.unitSeparator || '';
  const decimalPlaces = options?.decimalPlaces !== undefined ? options.decimalPlaces : 2;
  const fixedDecimals = Boolean(options && options.fixedDecimals);
  const toUnit = options?.toUnit || '';
  // Split number and unit in array.
  const splitUnit = Boolean(options && options.splitUnit);

  let unit: keyof typeof map;
  if (toUnit) {
    unit = toUnit;
  } else if (mag >= map.d) {
    unit = 'd';
  } else if (mag >= map.h) {
    unit = 'h';
  } else if (mag >= map.m) {
    unit = 'm';
  } else if (mag >= map.s) {
    unit = 's';
  } else if (mag >= map.ms) {
    unit = 'ms';
  } else {
    unit = 'μs';
  }

  const val = mag / map[unit];
  let str = val.toFixed(decimalPlaces);

  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1');
  }

  // Final unit copywriting
  const unitStr = unit as string;

  // When the array format is thrown, the unit is in English format
  if (splitUnit) {
    return [str, unitStr];
  }
  // Unit with translation
  return str + unitSeparator + unitStr;
}

// string => number Convert a string with a unit to a number with a unit of μs.
// such as: parse('100s')  => 100000000
//  parse('10h')  => 36000000000
function parse(val: string) {
  const results = parseRegExp.exec(val);
  let floatValue: number;
  let unit: MapKeyTypes = 'μs';

  if (!results) {
    // 当没有单位时，直接返回，且默认单位 μs
    floatValue = parseInt(val, 10);
  } else {
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase() as MapKeyTypes; // 由于是 RegExp.exec 的结果，所以需要强制转换
  }

  return Math.floor(map[unit] * floatValue);
}

const xtime = {
  parse,
  format,
  restTime,
  timeFormat,
};

export default xtime;
