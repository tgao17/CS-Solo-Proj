const path = require('path');

// console.log('paths activated');

module.exports = {
  root: path.resolve(__dirname),
  client: path.resolve(__dirname, 'client'),
  server: path.resolve(__dirname, 'server'),
  router: path.resolve(__dirname, 'server', 'src', 'routes'),
  controller: path.resolve(__dirname, 'server', 'src', 'controllers'),
  models: path.resolve(__dirname, 'server', 'src', 'models'),
};
