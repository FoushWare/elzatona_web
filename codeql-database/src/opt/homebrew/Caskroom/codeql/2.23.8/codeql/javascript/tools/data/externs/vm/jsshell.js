/**
 * @externs
 * Sources:
 *  * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Introduction_to_the_JavaScript_shell
 *  * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Shell_global_objects
 *  * http://mxr.mozilla.org/mozilla-central/source/js/src/shell/js.cpp
 */

/**
 * @type {Object}
 */
var _environment;

/**
 * @type {Array.<string>}
 */
var _arguments;

/**
 * @type {Array.<string>}
 */
var _scriptArgs;

/**
 * @constructor
 * @param {string=} name
 * @see https://developer.mozilla.org/en-US/docs/Archive/Mozilla/SpiderMonkey/File_object
 */
function File(_name) {}

/**
 * @type {File}
 */
File.input;

/**
 * @type {File}
 */
File.output;

/**
 * @type {File}
 */
File.error;

/**
 * @type {File}
 */
File.currentDir;

/**
 * @type {string}
 */
File.separator;

/**
 * @type {number}
 */
File.prototype.number;

/**
 * @type {File}
 */
File.prototype.parent;

/**
 * @type {string}
 */
File.prototype.path;

/**
 * @type {string}
 */
File.prototype.name;

/**
 * @type {boolean}
 */
File.prototype.isDirectory;

/**
 * @type {boolean}
 */
File.prototype.isFile;

/**
 * @type {boolean}
 */
File.prototype.exists;

/**
 * @type {boolean}
 */
File.prototype.canRead;

/**
 * @type {boolean}
 */
File.prototype.canWrite;

/**
 * @type {boolean}
 */
File.prototype.canAppend;

/**
 * @type {boolean}
 */
File.prototype.canReplace;

/**
 * @type {boolean}
 */
File.prototype.isOpen;

/**
 * @type {string}
 */
File.prototype.type;

/**
 * @type {string}
 */
File.prototype.mode;

/**
 * @type {Date}
 */
File.prototype.creationTime;

/**
 * @type {Date}
 */
File.prototype.lastModified;

/**
 * @type {number}
 */
File.prototype.size;

/**
 * @type {boolean}
 */
File.prototype.hasRandomAccess;

/**
 * @type {boolean}
 */
File.prototype.hasAutoFlush;

/**
 * @type {number}
 */
File.prototype.position;

/**
 * @type {boolean}
 */
File.prototype.isNative;

/**
 * @param {string} mode
 * @param {string} type
 */
File.prototype.open = function (_mode, _type) {};

/**
 */
File.prototype.close = function () {};

/**
 */
File.prototype.remove = function () {};

/**
 * @param {string} destination
 */
File.prototype.copyTo = function (_destination) {};

/**
 * @param {string} newName
 */
File.prototype.renameTo = function (_newName) {};

/**
 */
File.prototype.flush = function () {};

/**
 * @param {number} offset
 * @param {number} whence
 * @return {number}
 */
File.prototype.seek = function (_offset, _whence) {};

/**
 * @param {number} numBytes
 * @return {string}
 */
File.prototype.read = function (_numBytes) {};

/**
 * @return {string}
 */
File.prototype.readln = function () {};

/**
 * @return {Array.<string>}
 */
File.prototype.readAll = function () {};

/**
 * @param {string} data
 */
File.prototype.write = function (_data) {};

/**
 * @param {string} data
 */
File.prototype.writeln = function (_data) {};

/**
 * @param {Array.<string>} lines
 */
File.prototype.writeAll = function (_lines) {};

/**
 * @param {RegExp=} filter
 * @return {Array.<File>}
 */
File.prototype.list = function (_filter) {};

/**
 * @param {string} name
 */
File.prototype.mkdir = function (_name) {};

/**
 * @return {string}
 */
File.prototype.toURL = function () {};

/**
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
 */
function Reflect() {}

/**
 * @param {string} code
 * @param {Object=} options
 * @return {Object}
 */
Reflect.parse = function (_code, _options) {};

/**
 * @param {number=} number
 * @return {number}
 */
function _version(_number) {}

/**
 */
function _revertVersion() {}

/**
 * @param {...string} options
 */
function _options(_options) {}

/**
 * @param {...string} files
 */
function _load(_files) {}

/**
 * @param {...string} files
 */
function _loadRelativeToScript(_files) {}

/**
 * @param {string} code
 * @param {Object=} options
 */
function _evaluate(_code, _options) {}

/**
 * @param {string} file
 * @return {number}
 */
function _run(_file) {}

/**
 * @return {string}
 */
function _readline() {}

/**
 * @param {...*} exprs
 */
function _print(_exprs) {}

/**
 * @param {...*} exprs
 */
function _printErr(_exprs) {}

/**
 * @param {*} expr
 */
function _putstr(_expr) {}

/**
 * @return {number}
 */
function _dateNow() {}

/**
 * @param {...string} names
 * @return {string}
 */
function _help(_names) {}

/**
 * @param {number=} status
 */
function _quit(_status) {}

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string=} msg
 * @throws {Error}
 */
function _assertEq(_actual, _expected, _msg) {}

/**
 * @throws {Error}
 */
function _assertJit() {}

/**
 */
function _gc() {}

/**
 */
function _gcstats() {}

/**
 * @param {string} name
 * @param {number} value
 */
function _gcparam(_name, _value) {}

/**
 * @param {Object=} start
 * @param {string} kind
 */
function _countHeap(_start, _kind) {}

/**
 * @return {Object}
 */
function _makeFinalizeObserver() {}

/**
 * @return {number}
 */
function _finalizeCount() {}

/**
 * @param {number} level
 */
function _gczeal(_level) {}

/**
 * @param {boolean} debug
 */
function _setDebug(_debug) {}

/**
 * @param {function} f
 */
function _setDebuggerHandler(_f) {}

/**
 * @param {function} f
 */
function _setThrowHook(_f) {}

/**
 * @param {function=} fun
 * @param {number=} pc
 * @param {*} exp
 */
function _trap(_fun, _pc, _exp) {}

/**
 * @param {function} fun
 * @param {number=} pc
 */
function _untrap(_fun, _pc) {}

/**
 * @param {function=} fun
 * @param {number} line
 */
function _line2pc(_fun, line) {}

/**
 * @param {function} fun
 * @param {number=} pc
 */
function _pc2line(_fun, pc) {}

/**
 * @param {number=} number
 */
function _stackQuota(_number) {}

/**
 * @return {boolean}
 */
function _stringsAreUTF8() {}

/**
 * @param {number} mode
 */
function _testUTF8(_mode) {}

/**
 * @param {string=} fileName
 * @param {*=} start
 * @param {*=} toFind
 * @param {number=} maxDepth
 * @param {*=} toIgnore
 */
function _dumpHeap(_fileName, _start, _toFind, _maxDepth, _toIgnore) {}

/**
 */
function _dumpObject() {}

/**
 * @param {string|boolean} mode
 */
function _tracing(_mode) {}

/**
 * @param {...string} strings
 */
function _stats(_strings) {}

/**
 */
function _build() {}

/**
 * @param {Object=} obj
 */
function _clear(_obj) {}

/**
 * @param {function} fun
 * @param {Object=} scope
 */
function _clone(_fun, _scope) {}

/**
 * @param {Object} obj
 */
function _getpda(_obj) {}

/**
 * @param {*} n
 * @return {number}
 */
function _toint32(_n) {}

/**
 * @param {number} n
 * @param {string} str
 * @param {boolean} save
 */
function _evalInFrame(_n, _str, _save) {}

/**
 * @param {string} filename
 * @param {string=} options
 */
function _snarf(_filename, _options) {}

/**
 * @param {string} filename
 * @param {string=} options
 */
function _read(_filename, _options) {}

/**
 * @param {number=} seconds
 */
function _timeout(_seconds) {}

/**
 * @param {Object} obj
 */
function _parent(_obj) {}

/**
 * @param {Object} obj
 */
function _wrap(_obj) {}

/**
 * @param {*} sd
 */
function _serialize(_sd) {}

/**
 * @param {*} a
 */
function _deserialize(_a) {}

/**
 */
function _mjitstats() {}

/**
 */
function _stringstats() {}

/**
 * @param {Object} callback
 */
function _setGCCallback(_callback) {}

/**
 */
function _startTimingMutator() {}

/**
 */
function _stopTimingMutator() {}

/**
 * @throws {Error}
 */
function _throwError() {}

/**
 * @param {function} fun
 */
function _disassemble(_fun) {}

/**
 * @param {function} fun
 */
function _dis(_fun) {}

/**
 * @param {string} file
 */
function _disfile(_file) {}

/**
 * @param {function} fun
 */
function _dissrc(_fun) {}

/**
 * @param {function} fun
 */
function _notes(_fun) {}

/**
 * @param {boolean} showArgs
 * @param {boolean} showLocals
 * @param {boolean} showThisProps
 */
function _stackDump(_showArgs, _showLocals, _showThisProps) {}

/**
 * @param {string} str
 * @return string
 */
function _intern(_str) {}

/**
 * @param {Object} obj
 */
function _getslx(_obj) {}

/**
 * @param {string} s
 * @param {Object=} o
 */
function _evalcx(_s, _o) {}

/**
 * @param {string} str
 */
function _evalInWorker(_str) {}

/**
 * @return {Object}
 */
function _getSharedArrayBuffer() {}

/**
 * @param {Object} buf
 */
function _setSharedArrayBuffer(_buf) {}

/**
 * @param {Object} obj
 * @return {*}
 */
function _shapeOf(_obj) {}

/**
 * @param {...Array.<*>} arrays
 */
function _arrayInfo(_arrays) {}

/**
 * @param {number} dt
 */
function _sleep(_dt) {}

/**
 * @param {string} code
 * @throws {Error}
 */
function _compile(_code) {}

/**
 * @param {string} code
 * @throws {Error}
 */
function _parse(_code) {}

/**
 * @param {string} code
 * @return {boolean}
 */
function _syntaxParse(_code) {}

/**
 * @param {string} code
 * @param {Object=} options
 */
function _offThreadCompileScript(_code, _options) {}

/**
 * @throws {Error}
 */
function _runOffThreadScript() {}

/**
 * @param {number=} seconds
 * @param {function=} func
 */
function _timeout(_seconds, _func) {}

/**
 * @param {boolean} cond
 */
function _interruptIf(_cond) {}

/**
 * @param {function} fun
 */
function _invokeInterruptCallback(_fun) {}

/**
 * @param {function} fun
 */
function _setInterruptCallback(_fun) {}

/**
 */
function _enableLastWarning() {}

/**
 */
function _disableLastWarning() {}

/**
 * @return {Object}
 */
function _getLastWarning() {}

/**
 */
function _clearLastWarning() {}

/**
 * @return {number}
 */
function _elapsed() {}

/**
 * @param {function} func
 * @return {string}
 */
function _decompileFunction(_func) {}

/**
 * @param {function} func
 * @return {string}
 */
function _decompileBody(_func) {}

/**
 * @return {string}
 */
function _decompileThis() {}

/**
 * @return {string}
 */
function _thisFilename() {}

/**
 * @param {Object=} options
 * @return {Object}
 */
function _newGlobal(_options) {}

/**
 * @param {string} filename
 * @param {number} offset
 * @param {number} size
 */
function _createMappedArrayBuffer(_filename, _offset, _size) {}

/**
 * @return {number}
 */
function _getMaxArgs() {}

/**
 * @return {Object}
 */
function _objectEmulatingUndefined() {}

/**
 * @return {boolean}
 */
function _isCachingEnabled() {}

/**
 * @param {boolean} b
 */
function _setCachingEnabled(_b) {}

/**
 * @param {string} code
 */
function _cacheEntry(_code) {}

/**
 */
function _printProfilerEvents() {}

/**
 */
function _enableSingleStepProfiling() {}

/**
 */
function _disableSingleStepProfiling() {}

/**
 * @param {string} s
 * @return {boolean}
 */
function _isLatin1(_s) {}

/**
 * @return {number}
 */
function _stackPointerInfo() {}

/**
 * @param {Object} params
 * @return {Array.<*>}
 */
function _entryPoints(_params) {}

/**
 * @param {Object} object
 * @param {boolean} deep
 */
function _seal(_object, _deep) {}
