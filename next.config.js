const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: config.serverRuntimeConfig,
  publicRuntimeConfig: config.publicRuntimeConfig,
  async redirects() {
    return [
      {
        source: '/catalog.aspx',
        destination: '/catalog',
        permanent: true
      },
      {
        source: '/groups/:id/:name',
        destination: '/My/Groups.aspx?gid=:id',
        permanent: false
      }
    ];
  },
  webpack(nextConfig) {
    nextConfig.plugins = nextConfig.plugins.filter(plugin => {
      return plugin.constructor.name !== 'ReactFreshWebpackPlugin';
    });
    return nextConfig;
  }
};
