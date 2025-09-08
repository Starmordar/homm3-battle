const config = {
  settingsPath: import.meta.env.PROD ? 'settings' : '/public/settings',
  assetsPath: import.meta.env.PROD ? 'assets' : '/public/assets',
};

export default config;
