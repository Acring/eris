import { expect, test } from 'vitest';

import xbytes from '@/lib/xbytes';

// xbytes format
test('xbytes format -> fixedDecimals: true', () => {
  expect(xbytes.format(1024 * 1024, { fixedDecimals: true })).toBe('1.00MiB');
});

test('xbytes format -> fixedDecimals: true  + decimalPlaces: 3', () => {
  expect(
    xbytes.format(1024 * 1024, {
      fixedDecimals: true,
      decimalPlaces: 3,
    }),
  ).toBe('1.000MiB');
});

test('xbytes format -> thousandsSeparator: string + toUnit: "B"', () => {
  expect(
    xbytes.format(1024 * 1024 * 1024, {
      thousandsSeparator: ',',
      toUnit: 'B',
    }),
  ).toBe('1,073,741,824B');
});

test('xbytes format -> unitSeparator: " "', () => {
  expect(xbytes.format(1024 * 1024, { unitSeparator: ' ' })).toBe('1 MiB');
});

test('xbytes format -> withoutFloat: true', () => {
  expect(xbytes.format(1024 + 1, { withoutFloat: true })).toBe('1025B');
  expect(xbytes.format(1024, { withoutFloat: true })).toBe('1KiB');
});

test('xbytes format -> splitUnit: false | true', () => {
  expect(xbytes.format(1024 * 1024, { splitUnit: false })).toBe('1MiB');
  expect(xbytes.format(1024 * 1024, { splitUnit: true })).toEqual(['1', 'MiB']);
});

test('xbytes format -> capacityBase: 1024 | 1000', () => {
  expect(xbytes.format(1000 * 1000, { capacityBase: 1024 })).toBe('976.56KiB');
  expect(xbytes.format(1000 * 1000, { capacityBase: 1000 })).toBe('1MB');
});

test('xbytes format -> value is not isFinite, return null', () => {
  expect(xbytes.format(1024 / 0)).toBe(null);
});

// xbytes parse
test('xbytes parse -> default', () => {
  expect(xbytes.parse('10Mb')).toBe(10485760);
});

test('xbytes parse -> Mib', () => {
  expect(xbytes.parse('10Mib')).toBe(10485760);
});

test('xbytes parse -> capacityBase: 1000, convert: false', () => {
  expect(xbytes.parse('10MB', { capacityBase: 1000, convert: false })).toBe(10000000);
});

// xbytes parseToUnit
test('xbytes parseToUnit -> "TB" -> "GB", toUnit: "GB", capacityBase: 1024', () => {
  expect(xbytes.parseToUnit('10TB', 'GB', 1024)).toBe('10240GiB');
});

test('xbytes parseToUnit -> "TB" -> "GB", toUnit: "GB", capacityBase: 1000', () => {
  expect(xbytes.parseToUnit('10TB', 'GB', 1000)).toBe('10000GB');
});
