import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';

/** Get current version of the app from package.json */
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = JSON.stringify(pkg.version);

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_APP_VERSION': version,
    /** True if the app is running as a desktop (Electron) build, false if running as a web build. */
    'import.meta.env.VITE_IS_ELECTRON': JSON.stringify(false),
  },
});
