import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'vitest-canvas-mock';
import { initLocale } from './i18n';

beforeAll(() => {
  initLocale('zh-CN');
});
afterEach(() => cleanup());
