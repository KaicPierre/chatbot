import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  bundle: true,
  skipNodeModulesBundle: true,
});
