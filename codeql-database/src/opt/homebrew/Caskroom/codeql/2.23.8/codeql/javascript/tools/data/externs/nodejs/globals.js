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

/*
 *        Automatically generated from globals.d.ts
 */
/**
 * @externs
 */

/**
 * @interface
 */
function Error() {}

/**
 * @type {string}
 */
Error.prototype.stack;

/**
 * @interface
 */
function ErrorConstructor() {}

/**
 * @param {Object} targetObject
 * @param {Function=} constructorOpt
 * @return {void}
 */
ErrorConstructor.prototype.captureStackTrace = function (
  _targetObject,
  _constructorOpt,
) {};

/**
 * @type {number}
 */
ErrorConstructor.prototype.stackTraceLimit;

/**
 * @interface
 */
function _MapConstructor() {}

/**
 * @interface
 */
function _WeakMapConstructor() {}

/**
 * @interface
 */
function _SetConstructor() {}

/**
 * @interface
 */
function _WeakSetConstructor() {}

/**
 * @type {NodeJS.Process}
 */
var _process;

/**
 * @type {NodeJS.Global}
 */
var _global;

/**
 * @type {string}
 */
var __filename;

/**
 * @type {string}
 */
var __dirname;

/**
 * @param {*} handler
 * @param {*=} timeout
 * @param {...*} args
 * @return {number}
 */
var setTimeout = function (_handler, _timeout, _args) {};

/**
 * @param {(function(...*): void)} callback
 * @param {number} ms
 * @param {...*} args
 * @return {NodeJS.Timer}
 */
var setTimeout = function (_callback, _ms, _args) {};

/**
 * @param {number} handle
 * @return {void}
 */
var clearTimeout = function (_handle) {};

/**
 * @param {NodeJS.Timer} timeoutId
 * @return {void}
 */
var clearTimeout = function (_timeoutId) {};

/**
 * @param {*} handler
 * @param {*=} timeout
 * @param {...*} args
 * @return {number}
 */
var setInterval = function (_handler, _timeout, _args) {};

/**
 * @param {(function(...*): void)} callback
 * @param {number} ms
 * @param {...*} args
 * @return {NodeJS.Timer}
 */
var setInterval = function (_callback, _ms, _args) {};

/**
 * @param {number} handle
 * @return {void}
 */
var clearInterval = function (_handle) {};

/**
 * @param {NodeJS.Timer} intervalId
 * @return {void}
 */
var clearInterval = function (_intervalId) {};

/**
 * @param {*} expression
 * @param {...*} args
 * @return {number}
 */
var setImmediate = function (_expression, _args) {};

/**
 * @param {(function(...*): void)} callback
 * @param {...*} args
 * @return {*}
 */
var setImmediate = function (_callback, _args) {};

/**
 * @param {number} handle
 * @return {void}
 */
var clearImmediate = function (_handle) {};

/**
 * @param {*} immediateId
 * @return {void}
 */
var clearImmediate = function (_immediateId) {};

/**
 * @interface
 * @type {((function(string): *))}
 */
function _NodeRequireFunction() {}

/**
 * @interface
 * @extends {NodeRequireFunction}
 */
function NodeRequire() {}

/**
 * @param {string} id
 * @return {string}
 */
NodeRequire.prototype.resolve = function (_id) {};

/**
 * @type {*}
 */
NodeRequire.prototype.cache;

/**
 * @type {*}
 */
NodeRequire.prototype.extensions;

/**
 * @type {*}
 */
NodeRequire.prototype.main;

/**
 * @type {NodeRequire}
 */
var _require;

/**
 * @interface
 */
function NodeModule() {}

/**
 * @type {*}
 */
NodeModule.prototype.exports;

/**
 * @type {NodeRequireFunction}
 */
NodeModule.prototype.require;

/**
 * @type {string}
 */
NodeModule.prototype.id;

/**
 * @type {string}
 */
NodeModule.prototype.filename;

/**
 * @type {boolean}
 */
NodeModule.prototype.loaded;

/**
 * @type {*}
 */
NodeModule.prototype.parent;

/**
 * @type {Array<*>}
 */
NodeModule.prototype.children;

/**
 * @type {NodeModule}
 */
var _module;

/**
 * @type {*}
 */
var _exports;

/**
 * @param {string} str
 * @param {string=} encoding
 * @return {Buffer}
 * @constructor
 */
var SlowBuffer = function (_str, _encoding) {};

/**
 * @param {number} size
 * @return {Buffer}
 * @constructor
 */
var SlowBuffer = function (_size) {};

/**
 * @param {Uint8Array} size
 * @return {Buffer}
 * @constructor
 */
var SlowBuffer = function (_size) {};

/**
 * @param {Array<*>} array
 * @return {Buffer}
 * @constructor
 */
var SlowBuffer = function (_array) {};

/**
 * @type {Buffer}
 */
SlowBuffer.prototype;

/**
 * @type {(function(*): boolean)}
 */
SlowBuffer.isBuffer;

/**
 * @type {(function(string, string=): number)}
 */
SlowBuffer.byteLength;

/**
 * @type {(function(Array<Buffer>, number=): Buffer)}
 */
SlowBuffer.concat;

/**
 * @interface
 * @extends {NodeBuffer}
 */
function Buffer() {}

/**
 * @param {string} str
 * @param {string=} encoding
 * @return {Buffer}
 * @constructor
 */
var Buffer = function (_str, _encoding) {};

/**
 * @param {number} size
 * @return {Buffer}
 * @constructor
 */
var Buffer = function (_size) {};

/**
 * @param {Uint8Array} array
 * @return {Buffer}
 * @constructor
 */
var Buffer = function (_array) {};

/**
 * @param {ArrayBuffer} arrayBuffer
 * @return {Buffer}
 * @constructor
 */
var Buffer = function (_arrayBuffer) {};

/**
 * @param {Array<*>} array
 * @return {Buffer}
 * @constructor
 */
var Buffer = function (_array) {};

/**
 * @param {Buffer} buffer
 * @return {Buffer}
 * @constructor
 */
var Buffer = function (_buffer) {};

/**
 * @type {(function(Array<*>): Buffer)|(function(ArrayBuffer, number=, number=): Buffer)|(function(Buffer): Buffer)|(function(string, string=): Buffer)}
 */
Buffer.from;

/**
 * @type {(function(*): boolean)}
 */
Buffer.isBuffer;

/**
 * @type {(function(string): boolean)}
 */
Buffer.isEncoding;

/**
 * @type {(function(string, string=): number)}
 */
Buffer.byteLength;

/**
 * @type {(function(Array<Buffer>, number=): Buffer)}
 */
Buffer.concat;

/**
 * @type {(function(Buffer, Buffer): number)}
 */
Buffer.compare;

/**
 * @type {(function(number, (string|Buffer|number)=, string=): Buffer)}
 */
Buffer.alloc;

/**
 * @type {(function(number): Buffer)}
 */
Buffer.allocUnsafe;

/**
 * @type {(function(number): Buffer)}
 */
Buffer.allocUnsafeSlow;

var NodeJS = NodeJS || {};

/**
 * @interface
 * @extends {Error}
 */
NodeJS.ErrnoException = function () {};

/**
 * @type {string}
 */
NodeJS.ErrnoException.prototype.errno;

/**
 * @type {string}
 */
NodeJS.ErrnoException.prototype.code;

/**
 * @type {string}
 */
NodeJS.ErrnoException.prototype.path;

/**
 * @type {string}
 */
NodeJS.ErrnoException.prototype.syscall;

/**
 * @type {string}
 */
NodeJS.ErrnoException.prototype.stack;

/**
 * @constructor
 */
NodeJS.EventEmitter;

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.EventEmitter.prototype.addListener = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.EventEmitter.prototype.on = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.EventEmitter.prototype.once = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.EventEmitter.prototype.removeListener = function (_event, _listener) {};

/**
 * @param {string=} event
 * @return {*}
 */
NodeJS.EventEmitter.prototype.removeAllListeners = function (_event) {};

/**
 * @param {number} n
 * @return {*}
 */
NodeJS.EventEmitter.prototype.setMaxListeners = function (_n) {};

/**
 * @return {number}
 */
NodeJS.EventEmitter.prototype.getMaxListeners = function () {};

/**
 * @param {string} event
 * @return {Array<Function>}
 */
NodeJS.EventEmitter.prototype.listeners = function (_event) {};

/**
 * @param {string} event
 * @param {...*} args
 * @return {boolean}
 */
NodeJS.EventEmitter.prototype.emit = function (_event, _args) {};

/**
 * @param {string} type
 * @return {number}
 */
NodeJS.EventEmitter.prototype.listenerCount = function (_type) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.EventEmitter.prototype.prependListener = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.EventEmitter.prototype.prependOnceListener = function (
  _event,
  _listener,
) {};

/**
 * @return {Array<string>}
 */
NodeJS.EventEmitter.prototype.eventNames = function () {};

/**
 * @interface
 * @extends {NodeJS.EventEmitter}
 */
NodeJS.ReadableStream = function () {};

/**
 * @type {boolean}
 */
NodeJS.ReadableStream.prototype.readable;

/**
 * @param {number=} size
 * @return {(string|Buffer)}
 */
NodeJS.ReadableStream.prototype.read = function (_size) {};

/**
 * @param {string} encoding
 * @return {void}
 */
NodeJS.ReadableStream.prototype.setEncoding = function (_encoding) {};

/**
 * @return {NodeJS.ReadableStream}
 */
NodeJS.ReadableStream.prototype.pause = function () {};

/**
 * @return {NodeJS.ReadableStream}
 */
NodeJS.ReadableStream.prototype.resume = function () {};

/**
 * @template T
 * @param {T} destination
 * @param {{end: boolean}=} options
 * @return {T}
 */
NodeJS.ReadableStream.prototype.pipe = function (_destination, _options) {};

/**
 * @template T
 * @param {T=} destination
 * @return {void}
 */
NodeJS.ReadableStream.prototype.unpipe = function (_destination) {};

/**
 * @param {string} chunk
 * @return {void}
 */
NodeJS.ReadableStream.prototype.unshift = function (_chunk) {};

/**
 * @param {Buffer} chunk
 * @return {void}
 */
NodeJS.ReadableStream.prototype.unshift = function (_chunk) {};

/**
 * @param {NodeJS.ReadableStream} oldStream
 * @return {NodeJS.ReadableStream}
 */
NodeJS.ReadableStream.prototype.wrap = function (_oldStream) {};

/**
 * @interface
 * @extends {NodeJS.EventEmitter}
 */
NodeJS.WritableStream = function () {};

/**
 * @type {boolean}
 */
NodeJS.WritableStream.prototype.writable;

/**
 * @param {(Buffer|string)} buffer
 * @param {Function=} cb
 * @return {boolean}
 */
NodeJS.WritableStream.prototype.write = function (_buffer, _cb) {};

/**
 * @param {string} str
 * @param {string=} encoding
 * @param {Function=} cb
 * @return {boolean}
 */
NodeJS.WritableStream.prototype.write = function (_str, _encoding, _cb) {};

/**
 * @return {void}
 */
NodeJS.WritableStream.prototype.end = function () {};

/**
 * @param {Buffer} buffer
 * @param {Function=} cb
 * @return {void}
 */
NodeJS.WritableStream.prototype.end = function (_buffer, _cb) {};

/**
 * @param {string} str
 * @param {Function=} cb
 * @return {void}
 */
NodeJS.WritableStream.prototype.end = function (_str, _cb) {};

/**
 * @param {string} str
 * @param {string=} encoding
 * @param {Function=} cb
 * @return {void}
 */
NodeJS.WritableStream.prototype.end = function (_str, _encoding, _cb) {};

/**
 * @interface
 * @extends {NodeJS.ReadableStream}
 * @extends {NodeJS.WritableStream}
 */
NodeJS.ReadWriteStream = function () {};

/**
 * @return {NodeJS.ReadWriteStream}
 */
NodeJS.ReadWriteStream.prototype.pause = function () {};

/**
 * @return {NodeJS.ReadWriteStream}
 */
NodeJS.ReadWriteStream.prototype.resume = function () {};

/**
 * @interface
 * @extends {NodeJS.EventEmitter}
 */
NodeJS.Events = function () {};

/**
 * @interface
 * @extends {NodeJS.Events}
 */
NodeJS.Domain = function () {};

/**
 * @param {Function} fn
 * @return {void}
 */
NodeJS.Domain.prototype.run = function (_fn) {};

/**
 * @param {NodeJS.Events} emitter
 * @return {void}
 */
NodeJS.Domain.prototype.add = function (_emitter) {};

/**
 * @param {NodeJS.Events} emitter
 * @return {void}
 */
NodeJS.Domain.prototype.remove = function (_emitter) {};

/**
 * @param {(function(Error, *): *)} cb
 * @return {*}
 */
NodeJS.Domain.prototype.bind = function (_cb) {};

/**
 * @param {(function(*): *)} cb
 * @return {*}
 */
NodeJS.Domain.prototype.intercept = function (_cb) {};

/**
 * @return {void}
 */
NodeJS.Domain.prototype.dispose = function () {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.Domain.prototype.addListener = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.Domain.prototype.on = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.Domain.prototype.once = function (_event, _listener) {};

/**
 * @param {string} event
 * @param {Function} listener
 * @return {*}
 */
NodeJS.Domain.prototype.removeListener = function (_event, _listener) {};

/**
 * @param {string=} event
 * @return {*}
 */
NodeJS.Domain.prototype.removeAllListeners = function (_event) {};

/**
 * @interface
 */
NodeJS.MemoryUsage = function () {};

/**
 * @type {number}
 */
NodeJS.MemoryUsage.prototype.rss;

/**
 * @type {number}
 */
NodeJS.MemoryUsage.prototype.heapTotal;

/**
 * @type {number}
 */
NodeJS.MemoryUsage.prototype.heapUsed;

/**
 * @interface
 */
NodeJS.ProcessVersions = function () {};

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.http_parser;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.node;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.v8;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.ares;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.uv;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.zlib;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.modules;

/**
 * @type {string}
 */
NodeJS.ProcessVersions.prototype.openssl;

/**
 * @interface
 * @extends {NodeJS.EventEmitter}
 */
NodeJS.Process = function () {};

/**
 * @type {NodeJS.WritableStream}
 */
NodeJS.Process.prototype.stdout;

/**
 * @type {NodeJS.WritableStream}
 */
NodeJS.Process.prototype.stderr;

/**
 * @type {NodeJS.ReadableStream}
 */
NodeJS.Process.prototype.stdin;

/**
 * @type {Array<string>}
 */
NodeJS.Process.prototype.argv;

/**
 * @type {Array<string>}
 */
NodeJS.Process.prototype.execArgv;

/**
 * @type {string}
 */
NodeJS.Process.prototype.execPath;

/**
 * @return {void}
 */
NodeJS.Process.prototype.abort = function () {};

/**
 * @param {string} directory
 * @return {void}
 */
NodeJS.Process.prototype.chdir = function (_directory) {};

/**
 * @return {string}
 */
NodeJS.Process.prototype.cwd = function () {};

/**
 * @type {*}
 */
NodeJS.Process.prototype.env;

/**
 * @param {number=} code
 * @return {void}
 */
NodeJS.Process.prototype.exit = function (_code) {};

/**
 * @type {number}
 */
NodeJS.Process.prototype.exitCode;

/**
 * @return {number}
 */
NodeJS.Process.prototype.getgid = function () {};

/**
 * @param {number} id
 * @return {void}
 */
NodeJS.Process.prototype.setgid = function (_id) {};

/**
 * @param {string} id
 * @return {void}
 */
NodeJS.Process.prototype.setgid = function (_id) {};

/**
 * @return {number}
 */
NodeJS.Process.prototype.getuid = function () {};

/**
 * @param {number} id
 * @return {void}
 */
NodeJS.Process.prototype.setuid = function (_id) {};

/**
 * @param {string} id
 * @return {void}
 */
NodeJS.Process.prototype.setuid = function (_id) {};

/**
 * @type {string}
 */
NodeJS.Process.prototype.version;

/**
 * @type {NodeJS.ProcessVersions}
 */
NodeJS.Process.prototype.versions;

NodeJS.Process.prototype.config;

/**
 * @type {{cflags: Array<*>, default_configuration: string, defines: Array<string>, include_dirs: Array<string>, libraries: Array<string>}}
 */
NodeJS.Process.prototype.config.target_defaults;

/**
 * @type {{clang: number, host_arch: string, node_install_npm: boolean, node_install_waf: boolean, node_prefix: string, node_shared_openssl: boolean, node_shared_v8: boolean, node_shared_zlib: boolean, node_use_dtrace: boolean, node_use_etw: boolean, node_use_openssl: boolean, target_arch: string, v8_no_strict_aliasing: number, v8_use_snapshot: boolean, visibility: string}}
 */
NodeJS.Process.prototype.config.variables;

/**
 * @param {number} pid
 * @param {(string|number)=} signal
 * @return {void}
 */
NodeJS.Process.prototype.kill = function (_pid, _signal) {};

/**
 * @type {number}
 */
NodeJS.Process.prototype.pid;

/**
 * @type {string}
 */
NodeJS.Process.prototype.title;

/**
 * @type {string}
 */
NodeJS.Process.prototype.arch;

/**
 * @type {string}
 */
NodeJS.Process.prototype.platform;

/**
 * @return {NodeJS.MemoryUsage}
 */
NodeJS.Process.prototype.memoryUsage = function () {};

/**
 * @param {Function} callback
 * @param {...*} args
 * @return {void}
 */
NodeJS.Process.prototype.nextTick = function (_callback, _args) {};

/**
 * @param {number=} mask
 * @return {number}
 */
NodeJS.Process.prototype.umask = function (_mask) {};

/**
 * @return {number}
 */
NodeJS.Process.prototype.uptime = function () {};

/**
 * @param {Array<number>=} time
 * @return {Array<number>}
 */
NodeJS.Process.prototype.hrtime = function (_time) {};

/**
 * @type {NodeJS.Domain}
 */
NodeJS.Process.prototype.domain;

/**
 * @param {*} message
 * @param {*=} sendHandle
 * @return {void}
 */
NodeJS.Process.prototype.send = function (_message, _sendHandle) {};

/**
 * @return {void}
 */
NodeJS.Process.prototype.disconnect = function () {};

/**
 * @type {boolean}
 */
NodeJS.Process.prototype.connected;

/**
 * @interface
 */
NodeJS.Global = function () {};

/**
 * @type {ArrayConstructor}
 */
NodeJS.Global.prototype.Array;

/**
 * @type {ArrayBufferConstructor}
 */
NodeJS.Global.prototype.ArrayBuffer;

/**
 * @type {BooleanConstructor}
 */
NodeJS.Global.prototype.Boolean;

/**
 * @param {string} str
 * @param {string=} encoding
 * @return {Buffer}
 * @constructor
 */
NodeJS.Global.prototype.Buffer = function (_str, _encoding) {};

/**
 * @param {number} size
 * @return {Buffer}
 * @constructor
 */
NodeJS.Global.prototype.Buffer = function (_size) {};

/**
 * @param {Uint8Array} array
 * @return {Buffer}
 * @constructor
 */
NodeJS.Global.prototype.Buffer = function (_array) {};

/**
 * @param {ArrayBuffer} arrayBuffer
 * @return {Buffer}
 * @constructor
 */
NodeJS.Global.prototype.Buffer = function (_arrayBuffer) {};

/**
 * @param {Array<*>} array
 * @return {Buffer}
 * @constructor
 */
NodeJS.Global.prototype.Buffer = function (_array) {};

/**
 * @param {Buffer} buffer
 * @return {Buffer}
 * @constructor
 */
NodeJS.Global.prototype.Buffer = function (_buffer) {};

/**
 * @type {(function(Array<*>): Buffer)|(function(ArrayBuffer, number=, number=): Buffer)|(function(Buffer): Buffer)|(function(string, string=): Buffer)}
 */
NodeJS.Global.prototype.Buffer.from;

/**
 * @type {(function(*): boolean)}
 */
NodeJS.Global.prototype.Buffer.isBuffer;

/**
 * @type {(function(string): boolean)}
 */
NodeJS.Global.prototype.Buffer.isEncoding;

/**
 * @type {(function(string, string=): number)}
 */
NodeJS.Global.prototype.Buffer.byteLength;

/**
 * @type {(function(Array<Buffer>, number=): Buffer)}
 */
NodeJS.Global.prototype.Buffer.concat;

/**
 * @type {(function(Buffer, Buffer): number)}
 */
NodeJS.Global.prototype.Buffer.compare;

/**
 * @type {(function(number, (string|Buffer|number)=, string=): Buffer)}
 */
NodeJS.Global.prototype.Buffer.alloc;

/**
 * @type {(function(number): Buffer)}
 */
NodeJS.Global.prototype.Buffer.allocUnsafe;

/**
 * @type {(function(number): Buffer)}
 */
NodeJS.Global.prototype.Buffer.allocUnsafeSlow;

/**
 * @type {DataViewConstructor}
 */
NodeJS.Global.prototype.DataView;

/**
 * @type {DateConstructor}
 */
NodeJS.Global.prototype.Date;

/**
 * @type {ErrorConstructor}
 */
NodeJS.Global.prototype.Error;

/**
 * @type {EvalErrorConstructor}
 */
NodeJS.Global.prototype.EvalError;

/**
 * @type {Float32ArrayConstructor}
 */
NodeJS.Global.prototype.Float32Array;

/**
 * @type {Float64ArrayConstructor}
 */
NodeJS.Global.prototype.Float64Array;

/**
 * @type {FunctionConstructor}
 */
NodeJS.Global.prototype.Function;

/**
 * @type {NodeJS.Global}
 */
NodeJS.Global.prototype.GLOBAL;

/**
 * @type {number}
 */
NodeJS.Global.prototype.Infinity;

/**
 * @type {Int16ArrayConstructor}
 */
NodeJS.Global.prototype.Int16Array;

/**
 * @type {Int32ArrayConstructor}
 */
NodeJS.Global.prototype.Int32Array;

/**
 * @type {Int8ArrayConstructor}
 */
NodeJS.Global.prototype.Int8Array;

/**
 * @type {*}
 */
NodeJS.Global.prototype.Intl;

/**
 * @type {JSON}
 */
NodeJS.Global.prototype.JSON;

/**
 * @type {MapConstructor}
 */
NodeJS.Global.prototype.Map;

/**
 * @type {Math}
 */
NodeJS.Global.prototype.Math;

/**
 * @type {number}
 */
NodeJS.Global.prototype.NaN;

/**
 * @type {NumberConstructor}
 */
NodeJS.Global.prototype.Number;

/**
 * @type {ObjectConstructor}
 */
NodeJS.Global.prototype.Object;

/**
 * @type {Function}
 */
NodeJS.Global.prototype.Promise;

/**
 * @type {RangeErrorConstructor}
 */
NodeJS.Global.prototype.RangeError;

/**
 * @type {ReferenceErrorConstructor}
 */
NodeJS.Global.prototype.ReferenceError;

/**
 * @type {RegExpConstructor}
 */
NodeJS.Global.prototype.RegExp;

/**
 * @type {SetConstructor}
 */
NodeJS.Global.prototype.Set;

/**
 * @type {StringConstructor}
 */
NodeJS.Global.prototype.String;

/**
 * @type {Function}
 */
NodeJS.Global.prototype.Symbol;

/**
 * @type {SyntaxErrorConstructor}
 */
NodeJS.Global.prototype.SyntaxError;

/**
 * @type {TypeErrorConstructor}
 */
NodeJS.Global.prototype.TypeError;

/**
 * @type {URIErrorConstructor}
 */
NodeJS.Global.prototype.URIError;

/**
 * @type {Uint16ArrayConstructor}
 */
NodeJS.Global.prototype.Uint16Array;

/**
 * @type {Uint32ArrayConstructor}
 */
NodeJS.Global.prototype.Uint32Array;

/**
 * @type {Uint8ArrayConstructor}
 */
NodeJS.Global.prototype.Uint8Array;

/**
 * @type {Function}
 */
NodeJS.Global.prototype.Uint8ClampedArray;

/**
 * @type {WeakMapConstructor}
 */
NodeJS.Global.prototype.WeakMap;

/**
 * @type {WeakSetConstructor}
 */
NodeJS.Global.prototype.WeakSet;

/**
 * @type {(function(*): void)}
 */
NodeJS.Global.prototype.clearImmediate;

/**
 * @type {(function(NodeJS.Timer): void)}
 */
NodeJS.Global.prototype.clearInterval;

/**
 * @type {(function(NodeJS.Timer): void)}
 */
NodeJS.Global.prototype.clearTimeout;

/**
 * @type {Console}
 */
NodeJS.Global.prototype.console;

/**
 * @type {(function(string): string)}
 */
NodeJS.Global.prototype.decodeURI;

/**
 * @type {(function(string): string)}
 */
NodeJS.Global.prototype.decodeURIComponent;

/**
 * @type {(function(string): string)}
 */
NodeJS.Global.prototype.encodeURI;

/**
 * @type {(function(string): string)}
 */
NodeJS.Global.prototype.encodeURIComponent;

/**
 * @type {(function(string): string)}
 */
NodeJS.Global.prototype.escape;

/**
 * @type {(function(string): *)}
 */
NodeJS.Global.prototype.eval;

/**
 * @type {NodeJS.Global}
 */
NodeJS.Global.prototype.global;

/**
 * @type {(function(number): boolean)}
 */
NodeJS.Global.prototype.isFinite;

/**
 * @type {(function(number): boolean)}
 */
NodeJS.Global.prototype.isNaN;

/**
 * @type {(function(string): number)}
 */
NodeJS.Global.prototype.parseFloat;

/**
 * @type {(function(string, number=): number)}
 */
NodeJS.Global.prototype.parseInt;

/**
 * @type {NodeJS.Process}
 */
NodeJS.Global.prototype.process;

/**
 * @type {NodeJS.Global}
 */
NodeJS.Global.prototype.root;

/**
 * @type {(function((function(...*): void), ...*): *)}
 */
NodeJS.Global.prototype.setImmediate;

/**
 * @type {(function((function(...*): void), number, ...*): NodeJS.Timer)}
 */
NodeJS.Global.prototype.setInterval;

/**
 * @type {(function((function(...*): void), number, ...*): NodeJS.Timer)}
 */
NodeJS.Global.prototype.setTimeout;

/**
 * @type {*}
 */
NodeJS.Global.prototype.undefined;

/**
 * @type {(function(string): string)}
 */
NodeJS.Global.prototype.unescape;

/**
 * @type {(function(): void)}
 */
NodeJS.Global.prototype.gc;

/**
 * @type {*}
 */
NodeJS.Global.prototype.v8debug;

/**
 * @interface
 */
NodeJS.Timer = function () {};

/**
 * @return {void}
 */
NodeJS.Timer.prototype.ref = function () {};

/**
 * @return {void}
 */
NodeJS.Timer.prototype.unref = function () {};

/**
 * @interface
 * @template T
 */
function _IterableIterator() {}

/**
 * @interface
 * @extends {Uint8Array}
 */
function NodeBuffer() {}

/**
 * @param {string} string
 * @param {number=} offset
 * @param {number=} length
 * @param {string=} encoding
 * @return {number}
 */
NodeBuffer.prototype.write = function (_string, _offset, _length, _encoding) {};

/**
 * @param {string=} encoding
 * @param {number=} start
 * @param {number=} end
 * @return {string}
 */
NodeBuffer.prototype.toString = function (_encoding, _start, _end) {};

/**
 * @return {{type: string, data: Array<*>}}
 */
NodeBuffer.prototype.toJSON = function () {};

/**
 * @param {Buffer} otherBuffer
 * @return {boolean}
 */
NodeBuffer.prototype.equals = function (_otherBuffer) {};

/**
 * @param {Buffer} otherBuffer
 * @param {number=} targetStart
 * @param {number=} targetEnd
 * @param {number=} sourceStart
 * @param {number=} sourceEnd
 * @return {number}
 */
NodeBuffer.prototype.compare = function (
  _otherBuffer,
  _targetStart,
  _targetEnd,
  _sourceStart,
  _sourceEnd,
) {};

/**
 * @param {Buffer} targetBuffer
 * @param {number=} targetStart
 * @param {number=} sourceStart
 * @param {number=} sourceEnd
 * @return {number}
 */
NodeBuffer.prototype.copy = function (
  _targetBuffer,
  _targetStart,
  _sourceStart,
  _sourceEnd,
) {};

/**
 * @param {number=} start
 * @param {number=} end
 * @return {Buffer}
 */
NodeBuffer.prototype.slice = function (_start, _end) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUIntLE = function (
  _value,
  _offset,
  _byteLength,
  _noAssert,
) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUIntBE = function (
  _value,
  _offset,
  _byteLength,
  _noAssert,
) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeIntLE = function (
  _value,
  _offset,
  _byteLength,
  _noAssert,
) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeIntBE = function (
  _value,
  _offset,
  _byteLength,
  _noAssert,
) {};

/**
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUIntLE = function (_offset, _byteLength, _noAssert) {};

/**
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUIntBE = function (_offset, _byteLength, _noAssert) {};

/**
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readIntLE = function (_offset, _byteLength, _noAssert) {};

/**
 * @param {number} offset
 * @param {number} byteLength
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readIntBE = function (_offset, _byteLength, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUInt8 = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUInt16LE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUInt16BE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUInt32LE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readUInt32BE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readInt8 = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readInt16LE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readInt16BE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readInt32LE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readInt32BE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readFloatLE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readFloatBE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readDoubleLE = function (_offset, _noAssert) {};

/**
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.readDoubleBE = function (_offset, _noAssert) {};

/**
 * @return {Buffer}
 */
NodeBuffer.prototype.swap16 = function () {};

/**
 * @return {Buffer}
 */
NodeBuffer.prototype.swap32 = function () {};

/**
 * @return {Buffer}
 */
NodeBuffer.prototype.swap64 = function () {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUInt8 = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUInt16LE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUInt16BE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUInt32LE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeUInt32BE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeInt8 = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeInt16LE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeInt16BE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeInt32LE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeInt32BE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeFloatLE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeFloatBE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeDoubleLE = function (_value, _offset, _noAssert) {};

/**
 * @param {number} value
 * @param {number} offset
 * @param {boolean=} noAssert
 * @return {number}
 */
NodeBuffer.prototype.writeDoubleBE = function (_value, _offset, _noAssert) {};

/**
 * @param {*} value
 * @param {number=} offset
 * @param {number=} end
 * @return {*}
 */
NodeBuffer.prototype.fill = function (_value, _offset, _end) {};

/**
 * @param {(string|number|Buffer)} value
 * @param {number=} byteOffset
 * @param {string=} encoding
 * @return {number}
 */
NodeBuffer.prototype.indexOf = function (_value, _byteOffset, _encoding) {};

/**
 * @param {(string|number|Buffer)} value
 * @param {number=} byteOffset
 * @param {string=} encoding
 * @return {number}
 */
NodeBuffer.prototype.lastIndexOf = function (_value, _byteOffset, _encoding) {};

/**
 * @return {IterableIterator<Array<*>>}
 */
NodeBuffer.prototype.entries = function () {};

/**
 * @param {(string|number|Buffer)} value
 * @param {number=} byteOffset
 * @param {string=} encoding
 * @return {boolean}
 */
NodeBuffer.prototype.includes = function (_value, _byteOffset, _encoding) {};

/**
 * @return {IterableIterator<number>}
 */
NodeBuffer.prototype.keys = function () {};

/**
 * @return {IterableIterator<number>}
 */
NodeBuffer.prototype.values = function () {};

/**
 * @interface
 * @extends {Uint8Array}
 */
function NodeBuffer() {}

/**
 * @param {number=} start
 * @param {number=} end
 * @return {Buffer}
 */
NodeBuffer.prototype.utf8Slice = function (_start, _end) {};

/**
 * @param {number=} start
 * @param {number=} end
 * @return {Buffer}
 */
NodeBuffer.prototype.binarySlice = function (_start, _end) {};

/**
 * @param {number=} start
 * @param {number=} end
 * @return {Buffer}
 */
NodeBuffer.prototype.asciiSlice = function (_start, _end) {};

/**
 * @param {string} string
 * @param {number=} offset
 * @return {Buffer}
 */
NodeBuffer.prototype.utf8write = function (_string, _offset) {};

/**
 * @param {string} string
 * @param {number=} offset
 * @return {Buffer}
 */
NodeBuffer.prototype.binaryWrite = function (_string, _offset) {};

/**
 * @param {string} string
 * @param {number=} offset
 * @return {Buffer}
 */
NodeBuffer.prototype.asciiWrite = function (_string, _offset) {};

/**
 * @param {string} string
 * @param {number=} offset
 * @return {Buffer}
 */
NodeBuffer.prototype.utf8Write = function (_string, _offset) {};

/**
 * @interface
 */
function Console() {}

/**
 * @param {boolean=} test
 * @param {string=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.assert = function (_test, _message, _optionalParams) {};

/**
 * @param {*} condition
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.assert = function (_condition, _var_args) {};

/**
 * @param {*=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.error = function (_message, _optionalParams) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.error = function (_var_args) {};

/**
 * @param {*=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.info = function (_message, _optionalParams) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.info = function (_var_args) {};

/**
 * @param {*=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.log = function (_message, _optionalParams) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.log = function (_var_args) {};

/**
 * @param {*=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.warn = function (_message, _optionalParams) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.warn = function (_var_args) {};

/**
 * @param {string=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.debug = function (_message, _optionalParams) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.debug = function (_var_args) {};

/**
 * @param {*=} value
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.dir = function (_value, _optionalParams) {};

/**
 * @param {*} value
 * @return {*}
 */
Console.prototype.dir = function (_value) {};

/**
 * @param {*} value
 * @return {void}
 */
Console.prototype.dirxml = function (_value) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.dirxml = function (_var_args) {};

/**
 * @param {Object} data
 * @param {*=} opt_columns
 * @return {*}
 */
Console.prototype.table = function (_data, _opt_columns) {};

/**
 * @param {*=} message
 * @param {...*} optionalParams
 * @return {void}
 */
Console.prototype.trace = function (_message, _optionalParams) {};

/**
 * @return {*}
 */
Console.prototype.trace = function () {};

/**
 * @param {string=} countTitle
 * @return {void}
 */
Console.prototype.count = function (_countTitle) {};

/**
 * @param {*} value
 * @return {*}
 */
Console.prototype.count = function (_value) {};

/**
 * @param {*} value
 * @return {*}
 */
Console.prototype.markTimeline = function (_value) {};

/**
 * @param {string=} reportName
 * @return {void}
 */
Console.prototype.profile = function (_reportName) {};

/**
 * @param {string=} opt_title
 * @return {*}
 */
Console.prototype.profile = function (_opt_title) {};

/**
 * @return {void}
 */
Console.prototype.profileEnd = function () {};

/**
 * @param {string=} opt_title
 * @return {*}
 */
Console.prototype.profileEnd = function (_opt_title) {};

/**
 * @param {string=} timerName
 * @return {void}
 */
Console.prototype.time = function (_timerName) {};

/**
 * @param {string} name
 * @return {*}
 */
Console.prototype.time = function (_name) {};

/**
 * @param {string=} timerName
 * @return {void}
 */
Console.prototype.timeEnd = function (_timerName) {};

/**
 * @param {string} name
 * @return {*}
 */
Console.prototype.timeEnd = function (_name) {};

/**
 * @param {*} value
 * @return {*}
 */
Console.prototype.timeStamp = function (_value) {};

/**
 * @param {string=} groupTitle
 * @return {void}
 */
Console.prototype.group = function (_groupTitle) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.group = function (_var_args) {};

/**
 * @param {string=} groupTitle
 * @return {void}
 */
Console.prototype.groupCollapsed = function (_groupTitle) {};

/**
 * @param {...*} var_args
 * @return {*}
 */
Console.prototype.groupCollapsed = function (_var_args) {};

/**
 * @return {void}
 */
Console.prototype.groupEnd = function () {};

/**
 * @return {void}
 */
Console.prototype.clear = function () {};
