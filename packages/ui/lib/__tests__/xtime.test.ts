import { expect, test } from 'vitest';

import xtime from '@/lib/xtime';

test('xtime format -> unitSeparator: " "', () => {
  expect(xtime.format(2 * 1000 * 1000, { unitSeparator: ' ' })).toBe('2 s');
});

test('xtime format -> fixedDecimals: true', () => {
  expect(xtime.format(2 * 1000 * 1000, { fixedDecimals: true })).toBe('2.00s');
});

test('xtime format -> fixedDecimals: true  + decimalPlaces: 3', () => {
  expect(
    xtime.format(2 * 1000 * 1000, {
      fixedDecimals: true,
      decimalPlaces: 3,
    }),
  ).toBe('2.000s');
});

test('xtime format -> toUnit: 1m -> 0.02h', () => {
  expect(
    xtime.format(60 * 1000 * 1000, {
      toUnit: 'h',
    }),
  ).toBe('0.02h');
});

test('xtime format -> unit: 48h -> 2d', () => {
  expect(
    xtime.format(48, {
      unit: 'h',
    }),
  ).toBe('2d');
});

test('xtime format -> splitUnit: 48h -> ["2", "d"]', () => {
  expect(
    xtime.format(48, {
      unit: 'h',
      splitUnit: true,
    }),
  ).toEqual(['2', 'd']);
});

test('xtime parse -> "10h" ->  36000000000', () => {
  expect(xtime.parse('10h')).toBe(36000000000);
});

// 当没有带单位的字符串数字时， parse 会以最小单位 μs 进行计算
test('xtime parse -> "10" ->  10', () => {
  expect(xtime.parse('10')).toBe(10);
});

// 非法输入 parse 会返回 NaN
test('xtime parse -> "%" ->  NaN', () => {
  expect(xtime.parse('%')).toBe(NaN);
});
