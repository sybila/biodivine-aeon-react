const config = {
  version: '5.0.0 React',
  computeEngine: {
    /** Initial status of the compute engine. */
    initialStatus: 'Disconnected',
    /** Initial color of the compute engine status. */
    initialStatusColor: 'red',
    /** This is default url for the compute engine. */
    defaultURL: 'http://localhost:8000',
  },
  /** Local storage key for the last model. */
  localStorageModelName: 'lastModel',
};

export default config;
