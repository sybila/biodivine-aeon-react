/// <reference types="vite/client" />

interface Window {
  computeEngine: {
    onLog: (callback: (lines: string[]) => void) => () => void;
  };
}
