import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    dangerouslyIgnoreUnhandledErrors: true,
    testTimeout: 20000,
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['text', 'json', 'html'],
    },
    environment: 'happy-dom',
    setupFiles: './setup.ts',
    alias: {
      '@xsky/eris-icons': path.resolve(__dirname, './packages/icons/src'),
      '@xsky/eris-ui/ConfigProvider': path.resolve(__dirname, './packages/ui/ConfigProvider.tsx'),
    },
  },
  plugins: [tsconfigPaths()],
});
