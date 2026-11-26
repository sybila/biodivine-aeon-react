import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('computeEngine', {
  onLog: (callback: (text: string) => void) => {
    const listener = (_event: IpcRendererEvent, text: string) => callback(text);
    ipcRenderer.on('compute-engine-log', listener);
    return () => ipcRenderer.removeListener('compute-engine-log', listener);
  },
});