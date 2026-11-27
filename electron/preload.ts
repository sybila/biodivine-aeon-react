import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

/** Exposes compute engine logs to the frontend. */
contextBridge.exposeInMainWorld('computeEngine', {
  onLog: (callback: (lines: string[]) => void) => {
    const listener = (_event: IpcRendererEvent, lines: string[]) =>
      callback(lines);
    ipcRenderer.on('compute-engine-log', listener);
    return () => ipcRenderer.removeListener('compute-engine-log', listener);
  },
});