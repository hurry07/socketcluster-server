/**
 * Module dependencies.
 */

var http = require('http');

/**
 * Expose SCServer constructor.
 *
 * @api public
 */

module.exports.SCServer = require('./scserver');

/**
 * Expose SCSocket constructor.
 *
 * @api public
 */

module.exports.SCSocket = require('./scsocket');

/**
 * Creates an http.Server exclusively used for WS upgrades.
 *
 * @param {Number}   port
 * @param {Object}   options
 * @param {Function} fn
 * @return {SCServer} websocket cluster server
 * @api public
 */

module.exports.listen = function (port, options, fn) {
  if ('function' === typeof options) {
    fn = options;
    options = {};
  }

  var server = http.createServer(function (req, res) {
    res.writeHead(501);
    res.end('Not Implemented');
  });

  var engine = module.exports.attach(server, options);
  engine.httpServer = server;
  server.listen(port, fn);

  return engine;
};

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @return {SCServer} websocket cluster server
 * @api public
 */

module.exports.attach = function (server, options) {
  if (options == null) {
    options = {};
  }
  options.httpServer = server;
  var socketClusterServer = new module.exports.SCServer(options);
  return socketClusterServer;
};
