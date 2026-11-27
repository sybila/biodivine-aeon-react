import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import { readFileSync } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Get current version of the app from package.json */
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = JSON.stringify(pkg.version);

/** Function which strips google analytics tag from index.html in the electron version of the app.
 *  Part of the index.html which enables google analytics has to be wrapped in <!-- gtag:start --> and <!-- gtag:end --> for the script to work.
 */
const stripGtag = () => ({
  name: 'strip-gtag',
  transformIndexHtml(html: string) {
    return html.replace(/<!-- gtag:start -->[\s\S]*?<!-- gtag:end -->/, '');
  },
});

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
    define: { 'import.meta.env.VITE_APP_VERSION': version },
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
    define: { 'import.meta.env.VITE_APP_VERSION': version },
  },

  renderer: {
    root: rootDir,
    base: './',
    plugins: [react(), tailwindcss(), stripGtag()],
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
    define: {
      'import.meta.env.VITE_APP_VERSION': version,
      /** True if the app is running as a desktop (Electron) build, false if running as a web build. */
      'import.meta.env.VITE_IS_ELECTRON': JSON.stringify(true),
    },
  },
});
