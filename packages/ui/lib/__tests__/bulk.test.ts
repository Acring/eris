import { expect, test } from 'vitest';

import bulk from '@/lib/bulk';

// splitUnit: false, lang: 'en-US'(default)
test('bulk 0 -> splitUnit: false', () => {
  expect(bulk(0, { splitUnit: false })).toBe('0');
});

test('bulk 6 -> splitUnit: false', () => {
  expect(bulk(6, { splitUnit: false })).toBe('6');
});

test('bulk 1e3 -> splitUnit: false', () => {
  expect(bulk(1e3, { splitUnit: false })).toBe('1 K');
});

test('bulk 1e6 -> splitUnit: false', () => {
  expect(bulk(1e6, { splitUnit: false })).toBe('1 M');
});

test('bulk 1e9 -> splitUnit: false', () => {
  expect(bulk(1e9, { splitUnit: false })).toBe('1 B');
});

test('bulk 1e12 -> splitUnit: false', () => {
  expect(bulk(1e12, { splitUnit: false })).toBe('1 T');
});

// splitUnit: false, lang: 'zh-CN'
test('bulk 0 -> splitUnit: false, lang: zh-CN', () => {
  expect(bulk(0, { splitUnit: false }, 'zh-CN')).toBe('0');
});

test('bulk 6 -> splitUnit: false, lang: zh-CN', () => {
  expect(bulk(6, { splitUnit: false }, 'zh-CN')).toBe('6');
});

test('bulk 1e4 -> splitUnit: false, lang: zh-CN', () => {
  expect(bulk(1e4, { splitUnit: false }, 'zh-CN')).toBe('1 万');
});

test('bulk 1e8 -> splitUnit: false, lang: zh-CN', () => {
  expect(bulk(1e8, { splitUnit: false }, 'zh-CN')).toBe('1 亿');
});

test('bulk 1e12 -> splitUnit: false, lang: zh-CN', () => {
  expect(bulk(1e12, { splitUnit: false }, 'zh-CN')).toBe('1 兆');
});

test('bulk 1e16 -> splitUnit: false, lang: zh-CN', () => {
  expect(bulk(1e16, { splitUnit: false }, 'zh-CN')).toBe('1 京');
});

// splitUnit: true, lang: 'zh-CN'
test('bulk -> splitUnit: true', () => {
  expect(bulk(0, { splitUnit: true })).toEqual([0, '']);
});

test('bulk 6 -> splitUnit: true, lang: zh-CN', () => {
  expect(bulk(6, { splitUnit: true }, 'zh-CN')).toEqual([6, '']);
});

test('bulk 1e4 -> splitUnit: true, lang: zh-CN', () => {
  expect(bulk(1e4, { splitUnit: true }, 'zh-CN')).toEqual([1, '万']);
});

test('bulk 1e8 -> splitUnit: true, lang: zh-CN', () => {
  expect(bulk(1e8, { splitUnit: true }, 'zh-CN')).toEqual([1, '亿']);
});

test('bulk 1e12 -> splitUnit: true, lang: zh-CN', () => {
  expect(bulk(1e12, { splitUnit: true }, 'zh-CN')).toEqual([1, '兆']);
});

test('bulk 1e16 -> splitUnit: true, lang: zh-CN', () => {
  expect(bulk(1e16, { splitUnit: true }, 'zh-CN')).toEqual([1, '京']);
});
