import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;

  if (rendererUrl) {
    // Development
    void win.loadURL(rendererUrl);
    win.webContents.openDevTools();
  } else {
    // Production / preview
    const rendererPath = path.join(
      app.getAppPath(),
      'dist-el',
      'renderer',
      'index.html'
    );

    void win.loadFile(rendererPath);
  }

  return win;
}

// Start Electron
app
  .whenReady()
  .then(() => {
    createWindow();

    // Re-create the window when activated on macOS.
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((err: unknown) => {
    console.error('Electron failed to start:', err);
    app.quit();
  });

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
