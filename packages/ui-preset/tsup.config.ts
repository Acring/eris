import path from 'node:path';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  dts: true,
  clean: true,
});
