const Path = require('path');
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT || 8080),
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'build'),
    },
    cors: true,
  },
});

// Register api and plugins
/* eslint-disable global-require */
server.register([{
  // logging
  register: require('good'),
  options: require('./config/logging'),
}, {
  // prints routes on startup
  register: require('blipp'),
  options: {},
},
  // needed by lout
  require('vision'),
  require('inert'),
{
  // api documentation
  register: require('lout'),
  options: {},
}], {}, (err) => {
  if (err) {
    throw err;
  }
});
/* eslint-enable global-require */

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true,
    },
  },
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
