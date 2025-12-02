const config = {
  /** AEON frontend version. */
  version: '0.6.0',
  computeEngine: {
    /** Compute Engine version. */
    version: '0.5.0-SNAPSHOT',
    /** Initial status of the compute engine. */
    initialStatus: 'Disconnected',
    /** Initial color of the compute engine status. */
    initialStatusColor: 'red',
    /** This is default url for the compute engine. */
    defaultURL: 'http://localhost:8000',
  },
  /** Local storage key for the last model. */
  localStorageModelName: 'lastModel',
  /** Download links for different versions of the compute engine. */
  computeEngineDownloadLinks: {
    windows:
      'https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/Windows-x86-64bit-Compute-Engine.zip',
    linux:
      'https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/Linux-x86-64bit-Compute-Engine.zip',
    macosIntel:
      'https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/MacOs-x86-64bit-Compute-Engine.zip',
    macosArm:
      'https://github.com/sybila/biodivine-control-tool/raw/refs/heads/main/ComputeEngine/MacOs-arm64-Compute-Engine.zip',
  },
};

export default config;
