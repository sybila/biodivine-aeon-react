import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'node:path';

/** Function responsible for definition and creation of the electron app window. */
function createWindow() {
  const win = new BrowserWindow({
    title: 'Biodivine/Aeon',
    width: 1200,
    height: 800,
    // Hides top menu bar, can be accessible by pressing alt
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Make the app windowed full screen on startup
  win.maximize();

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

/** Function defining the top menu of the electron app. */
function createTopMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Ctrl+Alt+Q',
          role: 'quit',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'F5',
          click: () => {
            const win = BrowserWindow.getFocusedWindow();
            win?.webContents.reload();
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          role: 'toggleDevTools',
        },
        ,
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'togglefullscreen' },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
}

// Start Electron
app
  .whenReady()
  .then(() => {
    createTopMenu();
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
