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
 * @fileoverview Definitions for module "path"
 */

var path = {};

/**
 * @interface
 */
path.ParsedPath = function () {};

/**
 * @type {string}
 */
path.ParsedPath.prototype.root;

/**
 * @type {string}
 */
path.ParsedPath.prototype.dir;

/**
 * @type {string}
 */
path.ParsedPath.prototype.base;

/**
 * @type {string}
 */
path.ParsedPath.prototype.ext;

/**
 * @type {string}
 */
path.ParsedPath.prototype.name;

/**
 * @param {string} p
 * @return {string}
 */
path.normalize = function (_p) {};

/**
 * @param {...*} paths
 * @return {string}
 */
path.join = function (_paths) {};

/**
 * @param {...string} paths
 * @return {string}
 */
path.join = function (_paths) {};

/**
 * @param {...*} pathSegments
 * @return {string}
 */
path.resolve = function (_pathSegments) {};

/**
 * @param {string} path
 * @return {boolean}
 */
_path.isAbsolute = function (_path) {};

/**
 * @param {string} from
 * @param {string} to
 * @return {string}
 */
path.relative = function (_from, _to) {};

/**
 * @param {string} p
 * @return {string}
 */
path.dirname = function (_p) {};

/**
 * @param {string} p
 * @param {string=} ext
 * @return {string}
 */
path.basename = function (_p, _ext) {};

/**
 * @param {string} p
 * @return {string}
 */
path.extname = function (_p) {};

/**
 * @type {string}
 */
path.sep;

/**
 * @type {string}
 */
path.delimiter;

/**
 * @param {string} pathString
 * @return {path.ParsedPath}
 */
path.parse = function (_pathString) {};

/**
 * @param {path.ParsedPath} pathObject
 * @return {string}
 */
path.format = function (_pathObject) {};

path.posix = path.posix || {};

/**
 * @param {string} p
 * @return {string}
 */
path.posix.normalize = function (_p) {};

/**
 * @param {...*} paths
 * @return {string}
 */
path.posix.join = function (_paths) {};

/**
 * @param {...*} pathSegments
 * @return {string}
 */
path.posix.resolve = function (_pathSegments) {};

/**
 * @param {string} p
 * @return {boolean}
 */
path.posix.isAbsolute = function (_p) {};

/**
 * @param {string} from
 * @param {string} to
 * @return {string}
 */
path.posix.relative = function (_from, _to) {};

/**
 * @param {string} p
 * @return {string}
 */
path.posix.dirname = function (_p) {};

/**
 * @param {string} p
 * @param {string=} ext
 * @return {string}
 */
path.posix.basename = function (_p, _ext) {};

/**
 * @param {string} p
 * @return {string}
 */
path.posix.extname = function (_p) {};

/**
 * @type {string}
 */
path.posix.sep;

/**
 * @type {string}
 */
path.posix.delimiter;

/**
 * @param {string} p
 * @return {path.ParsedPath}
 */
path.posix.parse = function (_p) {};

/**
 * @param {path.ParsedPath} pP
 * @return {string}
 */
path.posix.format = function (_pP) {};

path.win32 = path.win32 || {};

/**
 * @param {string} p
 * @return {string}
 */
path.win32.normalize = function (_p) {};

/**
 * @param {...*} paths
 * @return {string}
 */
path.win32.join = function (_paths) {};

/**
 * @param {...*} pathSegments
 * @return {string}
 */
path.win32.resolve = function (_pathSegments) {};

/**
 * @param {string} p
 * @return {boolean}
 */
path.win32.isAbsolute = function (_p) {};

/**
 * @param {string} from
 * @param {string} to
 * @return {string}
 */
path.win32.relative = function (_from, _to) {};

/**
 * @param {string} p
 * @return {string}
 */
path.win32.dirname = function (_p) {};

/**
 * @param {string} p
 * @param {string=} ext
 * @return {string}
 */
path.win32.basename = function (_p, _ext) {};

/**
 * @param {string} p
 * @return {string}
 */
path.win32.extname = function (_p) {};

/**
 * @type {string}
 */
path.win32.sep;

/**
 * @type {string}
 */
path.win32.delimiter;

/**
 * @param {string} p
 * @return {path.ParsedPath}
 */
path.win32.parse = function (_p) {};

/**
 * @param {path.ParsedPath} pP
 * @return {string}
 */
path.win32.format = function (_pP) {};

module.exports.ParsedPath = path.ParsedPath;

module.exports.normalize = path.normalize;

module.exports.join = path.join;

module.exports.join = path.join;

module.exports.resolve = path.resolve;

module.exports.isAbsolute = path.isAbsolute;

module.exports.relative = path.relative;

module.exports.dirname = path.dirname;

module.exports.basename = path.basename;

module.exports.extname = path.extname;

module.exports.sep = path.sep;

module.exports.delimiter = path.delimiter;

module.exports.parse = path.parse;

module.exports.format = path.format;

module.exports.posix = path.posix;

module.exports.win32 = path.win32;

/**
 * @param {string} path
 * @return {string}
 */
_path._makeLong = function (_path) {};

module.exports._makeLong = path._makeLong;

/**
 * @param {string} path
 * @param {(function(boolean): *)} callback
 * @return {boolean}
 */
_path.exists = function (_path, _callback) {};

/**
 * @param {string} path
 * @return {boolean}
 */
_path.existsSync = function (_path) {};

module.exports.exists = path.exists;

module.exports.existsSync = path.existsSync;
