/// <reference types="vite/client" />

interface Window {
  computeEngine: {
    onLog: (callback: (text: string) => void) => () => void;
  };
}
