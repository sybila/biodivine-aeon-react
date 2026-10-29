import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-el/main',
      rollupOptions: {
        input: {
          index: path.resolve(rootDir, 'electron/main.ts'),
        },
      },
    },
  },

  preload: {
    build: {
      outDir: 'dist-el/preload',
      rollupOptions: {
        input: {
          index: path.resolve(rootDir, 'electron/preload.ts'),
        },
      },
    },
  },

  renderer: {
    root: rootDir,
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
      },
    },
    build: {
      outDir: 'dist-el/renderer',
      rollupOptions: {
        input: {
          index: path.resolve(rootDir, 'index.html'),
        },
      },
    },
  },
});
