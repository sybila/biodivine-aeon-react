const config = {
  /** AEON frontend version. (defined in package.json) */
  version: import.meta.env.VITE_APP_VERSION as string,
  /** True if the app is running as a desktop (Electron) build, false if running as a web build. */
  isDesktopApp: import.meta.env.VITE_IS_ELECTRON as boolean,
  computeEngine: {
    /** Compute Engine version. */
    version: '0.7.2',
    /** Initial status of the compute engine. */
    initialStatus: 'Disconnected',
    /** Initial color of the compute engine status. */
    initialStatusColor: 'var(--color-compute-engine-status-error)',
    /** This is default url for the compute engine. */
    defaultURL: 'http://localhost:8000',
    /** URL with instructions for downloading and running the compute engine. **/
    downloadLink:
      'https://github.com/sybila/biodivine-aeon-server/releases/latest',
  },
  /** Local storage key for the last model. */
  localStorageModelName: 'lastModel',
};

export default config;
