// Automatically generated from TypeScript type definitions provided by
// DefinitelyTyped (https://github.com/DefinitelyTyped/DefinitelyTyped),
// which is licensed under the MIT license; see file DefinitelyTyped-LICENSE
// in parent directory.
// Type definitions for Node.js 10.5.x
// Project: http://nodejs.org/
// Definitions by: Microsoft TypeScript <http://typescriptlang.org>
//                 DefinitelyTyped <https://github.com/DefinitelyTyped/DefinitelyTyped>
//                 Parambir Singh <https://github.com/parambirs>
//                 Christian Vaagland Tellnes <https://github.com/tellnes>
//                 Wilco Bakker <https://github.com/WilcoBakker>
//                 Nicolas Voigt <https://github.com/octo-sniffle>
//                 Chigozirim C. <https://github.com/smac89>
//                 Flarna <https://github.com/Flarna>
//                 Mariusz Wiktorczyk <https://github.com/mwiktorczyk>
//                 wwwy3y3 <https://github.com/wwwy3y3>
//                 Deividas Bakanas <https://github.com/DeividasBakanas>
//                 Kelvin Jin <https://github.com/kjin>
//                 Alvis HT Tang <https://github.com/alvis>
//                 Sebastian Silbermann <https://github.com/eps1lon>
//                 Hannes Magnusson <https://github.com/Hannes-Magnusson-CK>
//                 Alberto Schiabel <https://github.com/jkomyno>
//                 Klaus Meinhardt <https://github.com/ajafff>
//                 Huw <https://github.com/hoo29>
//                 Nicolas Even <https://github.com/n-e>
//                 Bruno Scheufler <https://github.com/brunoscheufler>
//                 Mohsen Azimi <https://github.com/mohsen1>
//                 Hoàng Văn Khải <https://github.com/KSXGitHub>
//                 Alexander T. <https://github.com/a-tarasyuk>
//                 Lishude <https://github.com/islishude>
//                 Andrew Makarov <https://github.com/r3nya>
//                 Zane Hannan AU <https://github.com/ZaneHannanAU>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * @externs
 * @fileoverview Definitions for module "net"
 */

var net = {};

/**
 * @interface
 * @extends {internal.Duplex}
 */
net.Socket = function () {};

/**
 * @param {Buffer} buffer
 * @return {boolean}
 */
net.Socket.prototype.write = function (_buffer) {};

/**
 * @param {Buffer} buffer
 * @param {Function=} cb
 * @return {boolean}
 */
net.Socket.prototype.write = function (_buffer, _cb) {};

/**
 * @param {string} str
 * @param {Function=} cb
 * @return {boolean}
 */
net.Socket.prototype.write = function (_str, _cb) {};

/**
 * @param {string} str
 * @param {string=} encoding
 * @param {Function=} cb
 * @return {boolean}
 */
net.Socket.prototype.write = function (_str, _encoding, _cb) {};

/**
 * @param {string} str
 * @param {string=} encoding
 * @param {string=} fd
 * @return {boolean}
 */
net.Socket.prototype.write = function (_str, _encoding, _fd) {};

/**
 * @param {*} data
 * @param {string=} encoding
 * @param {Function=} callback
 * @return {void}
 */
net.Socket.prototype.write = function (_data, _encoding, _callback) {};

/**
 * @param {number} port
 * @param {string=} host
 * @param {Function=} connectionListener
 * @return {void}
 */
net.Socket.prototype.connect = function (_port, _host, _connectionListener) {};

/**
 * @param {string} path
 * @param {Function=} connectionListener
 * @return {void}
 */
net.Socket.prototype.connect = function (_path, _connectionListener) {};

/**
 * @type {number}
 */
net.Socket.prototype.bufferSize;

/**
 * @param {string=} encoding
 * @return {void}
 */
net.Socket.prototype.setEncoding = function (_encoding) {};

/**
 * @return {void}
 */
net.Socket.prototype.destroy = function () {};

/**
 * @return {net.Socket}
 */
net.Socket.prototype.pause = function () {};

/**
 * @return {net.Socket}
 */
net.Socket.prototype.resume = function () {};

/**
 * @param {number} timeout
 * @param {Function=} callback
 * @return {void}
 */
net.Socket.prototype.setTimeout = function (_timeout, _callback) {};

/**
 * @param {boolean=} noDelay
 * @return {void}
 */
net.Socket.prototype.setNoDelay = function (_noDelay) {};

/**
 * @param {boolean=} enable
 * @param {number=} initialDelay
 * @return {void}
 */
net.Socket.prototype.setKeepAlive = function (_enable, _initialDelay) {};

/**
 * @return {{port: number, family: string, address: string}}
 */
net.Socket.prototype.address = function () {};

/**
 * @return {void}
 */
net.Socket.prototype.unref = function () {};

/**
 * @return {void}
 */
net.Socket.prototype.ref = function () {};

/**
 * @type {string}
 */
net.Socket.prototype.remoteAddress;

/**
 * @type {string}
 */
net.Socket.prototype.remoteFamily;

/**
 * @type {number}
 */
net.Socket.prototype.remotePort;

/**
 * @type {string}
 */
net.Socket.prototype.localAddress;

/**
 * @type {number}
 */
net.Socket.prototype.localPort;

/**
 * @type {number}
 */
net.Socket.prototype.bytesRead;

/**
 * @type {number}
 */
net.Socket.prototype.bytesWritten;

/**
 * @return {void}
 */
net.Socket.prototype.end = function () {};

/**
 * @param {Buffer} buffer
 * @param {Function=} cb
 * @return {void}
 */
net.Socket.prototype.end = function (_buffer, _cb) {};

/**
 * @param {string} str
 * @param {Function=} cb
 * @return {void}
 */
net.Socket.prototype.end = function (_str, _cb) {};

/**
 * @param {string} str
 * @param {string=} encoding
 * @param {Function=} cb
 * @return {void}
 */
net.Socket.prototype.end = function (_str, _encoding, _cb) {};

/**
 * @param {*=} data
 * @param {string=} encoding
 * @return {void}
 */
net.Socket.prototype.end = function (_data, _encoding) {};

/**
 * @type {(function(new: net.Socket, {fd: string, type: string, allowHalfOpen: boolean}=))}
 */
net.Socket;

/**
 * @interface
 */
net.ListenOptions = function () {};

/**
 * @type {number}
 */
net.ListenOptions.prototype.port;

/**
 * @type {string}
 */
net.ListenOptions.prototype.host;

/**
 * @type {number}
 */
net.ListenOptions.prototype.backlog;

/**
 * @type {string}
 */
net.ListenOptions.prototype.path;

/**
 * @type {boolean}
 */
net.ListenOptions.prototype.exclusive;

/**
 * @interface
 * @extends {net.Socket}
 */
net.Server = function () {};

/**
 * @param {number} port
 * @param {string=} hostname
 * @param {number=} backlog
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (
  _port,
  _hostname,
  _backlog,
  _listeningListener,
) {};

/**
 * @param {number} port
 * @param {string=} hostname
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_port, _hostname, _listeningListener) {};

/**
 * @param {number} port
 * @param {number=} backlog
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_port, _backlog, _listeningListener) {};

/**
 * @param {number} port
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_port, _listeningListener) {};

/**
 * @param {string} path
 * @param {number=} backlog
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_path, _backlog, _listeningListener) {};

/**
 * @param {string} path
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_path, _listeningListener) {};

/**
 * @param {*} handle
 * @param {number=} backlog
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_handle, _backlog, _listeningListener) {};

/**
 * @param {*} handle
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_handle, _listeningListener) {};

/**
 * @param {net.ListenOptions} options
 * @param {Function=} listeningListener
 * @return {net.Server}
 */
net.Server.prototype.listen = function (_options, _listeningListener) {};

/**
 * @param {Function=} callback
 * @return {net.Server}
 */
net.Server.prototype.close = function (_callback) {};

/**
 * @return {{port: number, family: string, address: string}}
 */
net.Server.prototype.address = function () {};

/**
 * @param {(function(Error, number): void)} cb
 * @return {void}
 */
net.Server.prototype.getConnections = function (_cb) {};

/**
 * @return {net.Server}
 */
net.Server.prototype.ref = function () {};

/**
 * @return {net.Server}
 */
net.Server.prototype.unref = function () {};

/**
 * @type {number}
 */
net.Server.prototype.maxConnections;

/**
 * @type {number}
 */
net.Server.prototype.connections;

/**
 * @param {(function(net.Socket): void)=} connectionListener
 * @return {net.Server}
 */
net.createServer = function (_connectionListener) {};

/**
 * @param {{allowHalfOpen: boolean}=} options
 * @param {(function(net.Socket): void)=} connectionListener
 * @return {net.Server}
 */
net.createServer = function (_options, _connectionListener) {};

/**
 * @param {{port: number, host: string, localAddress: string, localPort: string, family: number, allowHalfOpen: boolean}} options
 * @param {Function=} connectionListener
 * @return {net.Socket}
 */
net.connect = function (_options, _connectionListener) {};

/**
 * @param {number} port
 * @param {string=} host
 * @param {Function=} connectionListener
 * @return {net.Socket}
 */
net.connect = function (_port, _host, _connectionListener) {};

/**
 * @param {string} path
 * @param {Function=} connectionListener
 * @return {net.Socket}
 */
net.connect = function (_path, _connectionListener) {};

/**
 * @param {{port: number, host: string, localAddress: string, localPort: string, family: number, allowHalfOpen: boolean}} options
 * @param {Function=} connectionListener
 * @return {net.Socket}
 */
net.createConnection = function (_options, _connectionListener) {};

/**
 * @param {number} port
 * @param {string=} host
 * @param {Function=} connectionListener
 * @return {net.Socket}
 */
net.createConnection = function (_port, _host, _connectionListener) {};

/**
 * @param {string} path
 * @param {Function=} connectionListener
 * @return {net.Socket}
 */
net.createConnection = function (_path, _connectionListener) {};

/**
 * @param {string} input
 * @return {number}
 */
net.isIP = function (_input) {};

/**
 * @param {string} input
 * @return {boolean}
 */
net.isIPv4 = function (_input) {};

/**
 * @param {string} input
 * @return {boolean}
 */
net.isIPv6 = function (_input) {};

module.exports.Socket = net.Socket;

module.exports.Socket = net.Socket;

module.exports.ListenOptions = net.ListenOptions;

module.exports.Server = net.Server;

module.exports.createServer = net.createServer;

module.exports.createServer = net.createServer;

module.exports.connect = net.connect;

module.exports.connect = net.connect;

module.exports.connect = net.connect;

module.exports.createConnection = net.createConnection;

module.exports.createConnection = net.createConnection;

module.exports.createConnection = net.createConnection;

module.exports.isIP = net.isIP;

module.exports.isIPv4 = net.isIPv4;

module.exports.isIPv6 = net.isIPv6;
