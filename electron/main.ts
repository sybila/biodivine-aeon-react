import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
} from 'electron';
import { ChildProcess, spawn } from 'node:child_process';
import * as path from 'node:path';

/* #region --- Window Creation + Window Style --- */

let mainWindow: BrowserWindow | null = null;

/** Function responsible for definition and creation of the electron app window. */
function createWindow() {
  const windowOptions: BrowserWindowConstructorOptions = {
    title: 'Biodivine Aeon',
    width: 1200,
    height: 800,
    // Hides top menu bar, can be accessible by pressing alt
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(app.getAppPath(), 'dist-el', 'preload', 'index.mjs'),
    },
  };

  if (process.platform === 'linux') {
    windowOptions.icon = app.isPackaged
      ? path.join(process.resourcesPath, 'icons', 'linux-icons', '512x512.png')
      : path.join(app.getAppPath(), 'electron/icons/linux-icons/512x512.png');
  } else if (process.platform === 'win32') {
    windowOptions.icon = app.isPackaged
      ? path.join(process.resourcesPath, 'icons', 'Aeon-windows-icon.ico')
      : path.join(app.getAppPath(), 'electron/icons/Aeon-windows-icon.ico');
  } else if (process.platform === 'darwin') {
    windowOptions.icon = app.isPackaged
      ? path.join(process.resourcesPath, 'icons', 'Aeon-mac-icon.icns')
      : path.join(app.getAppPath(), 'electron/icons/Aeon-mac-icon.icns');
  }

  const win = new BrowserWindow(windowOptions);

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

  mainWindow = win;
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

/* #endregion */

/* #region --- Start Compute Engine --- */

let computeEngineProcess: ChildProcess | null = null;

function getComputeEngineBinaryName(): string {
  return process.platform === 'win32'
    ? 'biodivine-aeon-server.exe'
    : 'biodivine-aeon-server';
}

function getComputeEngineBinaryPath(): string {
  const platform =
    process.platform === 'win32'
      ? 'windows'
      : process.platform === 'darwin'
        ? 'mac'
        : 'linux';

  return app.isPackaged
    ? path.join(
        process.resourcesPath,
        'compute-engine',
        getComputeEngineBinaryName()
      )
    : path.join(
        app.getAppPath(),
        'electron/compute-engine-binaries',
        platform,
        getComputeEngineBinaryName()
      );
}

function startComputeEngine(): void {
  computeEngineProcess = spawn(getComputeEngineBinaryPath(), [], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  computeEngineProcess.on('error', (err) => {
    console.error('Failed to start compute engine:', err);
  });
}

/* #endregion */

/* #region --- Connect Compute Engine Output --- */

/** Function which sends lines from the compute engine stderr or stdout to the frontend.
 *  Lines should be cut into string[] by line splitter object {@link createLineSplitter}
 */
function sendLines(lines: string[]) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('compute-engine-log', lines);
  }
}

/**
 * Splits a stream of text chunks into complete lines.
 * Text after the last newline is kept until the next chunk completes it.
 * Used for splitting stdout and stderr output from the compute engine into lines.
 */
function createLineSplitter() {
  let rest = '';
  return {
    write(chunk: string) {
      const parts = (rest + chunk).split(/\r?\n/);
      rest = parts.pop() ?? '';
      if (parts.length > 0) sendLines(parts);
    },
    end() {
      if (rest) sendLines([rest]);
      rest = '';
    },
  };
}

function createComputeEngineFrontendPipeline() {
  const stdoutSplitter = createLineSplitter();
  const stderrSplitter = createLineSplitter();

  computeEngineProcess?.stdout?.setEncoding('utf8');
  computeEngineProcess?.stderr?.setEncoding('utf8');

  computeEngineProcess?.stdout?.on('data', (data: string) => {
    stdoutSplitter.write(data);
  });

  computeEngineProcess?.stderr?.on('data', (data: string) => {
    stderrSplitter.write(data);
  });

  computeEngineProcess?.on('exit', () => {
    stdoutSplitter.end();
    stderrSplitter.end();
  });
}

/* #endregion */

/* #region --- Main --- */

// Start Electron
app
  .whenReady()
  .then(() => {
    startComputeEngine();
    createTopMenu();
    createWindow();
    createComputeEngineFrontendPipeline();

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

app.on('will-quit', () => {
  computeEngineProcess?.kill();
});

/* #endregion */
