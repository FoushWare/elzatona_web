/*
 * Copyright 2016 Semmle Ltd.
 */

/**
 * @fileoverview An incomplete model of the Vows library.
 * @externs
 * @see vowsjs.org/#reference
 */

var assert = require("assert");

/**
 * @param {number} eps
 * @param {number} actual
 * @param {number} expected
 * @param {string=} message
 * @return {void}
 */
function epsilon(_eps, _actual, _expected, _message) {}
assert.epsilon = epsilon;

/**
 * @param {string} actual
 * @param {RegExp} expected
 * @param {string=} message
 * @return {void}
 */
function match(_actual, _expected, _message) {}
assert.match = match;
assert.matches = match;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isTrue(_actual, _message) {}
assert.isTrue = isTrue;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isFalse(_actual, _message) {}
assert.isFalse = isFalse;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isZero(_actual, _message) {}
assert.isZero = isZero;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isNotZero(_actual, _message) {}
assert.isNotZero = isNotZero;

/**
 * @param {number} actual
 * @param {number} expected
 * @param {string=} message
 * @return {void}
 */
function greater(_actual, _expected, _message) {}
assert.greater = greater;

/**
 * @param {number} actual
 * @param {number} expected
 * @param {string=} message
 * @return {void}
 */
function lesser(_actual, _expected, _message) {}
assert.lesser = lesser;

/**
 * @param {number} actual
 * @param {number} expected
 * @param {number} delta
 * @param {string=} message
 * @return {void}
 */
function inDelta(_actual, _expected, _delta, _message) {}
assert.inDelta = inDelta;

/**
 * @param {Array.<*>|Object|string} actual
 * @param {*} expected
 * @param {string=} message
 * @return {void}
 */
function include(_actual, _expected, _message) {}
assert.include = include;
assert.includes = include;

/**
 * @param {Array.<*>|Object|string} actual
 * @param {*} expected
 * @param {string=} message
 * @return {void}
 */
function notInclude(_actual, _expected, _message) {}
assert.notInclude = notInclude;
assert.notIncludes = notInclude;

/**
 * @param {Array.<*>|Object|string} actual
 * @param {*} expected
 * @param {string=} message
 * @return {void}
 */
function deepInclude(_actual, _expected, _message) {}
assert.deepInclude = deepInclude;
assert.deepIncludes = deepInclude;

/**
 * @param {Array.<*>|Object|Function|string} actual
 * @param {string=} message
 * @return {void}
 */
function isEmpty(_actual, _message) {}
assert.isEmpty = isEmpty;

/**
 * @param {Array.<*>|Object|Function|string} actual
 * @param {string=} message
 * @return {void}
 */
function isNotEmpty(_actual, _message) {}
assert.isNotEmpty = isNotEmpty;

/**
 * @param {Array.<*>|Object|Function|string} actual
 * @param {number} expected
 * @param {string=} message
 * @return {void}
 */
function lengthOf(_actual, _expected, _message) {}
assert.lengthOf = lengthOf;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isArray(_actual, _message) {}
assert.isArray = isArray;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */

function isObject(_actual, _message) {}
assert.isObject = isObject;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isNumber(_actual, _message) {}
assert.isNumber = isNumber;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isBoolean(_actual, _message) {}
assert.isBoolean = isBoolean;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isNaN(_actual, _message) {}
assert.isNaN = isNaN;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isNull(_actual, _message) {}
assert.isNull = isNull;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isNotNull(_actual, _message) {}
assert.isNotNull = isNotNull;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isUndefined(_actual, _message) {}
assert.isUndefined = isUndefined;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isDefined(_actual, _message) {}
assert.isDefined = isDefined;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isString(_actual, _message) {}
assert.isString = isString;

/**
 * @param {*} actual
 * @param {string=} message
 * @return {void}
 */
function isFunction(_actual, _message) {}
assert.isFunction = isFunction;

/**
 * @param {*} actual
 * @param {string} expected
 * @param {string=} message
 * @return {void}
 */
function typeOf(_actual, _expected, _message) {}
assert.typeOf = typeOf;

/**
 * @param {*} actual
 * @param {Object} expected
 * @param {string=} message
 * @return {void}
 */
function instanceOf(_actual, _expected, _message) {}
assert.instanceOf = instanceOf;

/**
 * @type {Object}
 */
exports.options;

/**
 * @type {Object}
 */
exports.reporter;

/**
 * @type {Object}
 */
exports.console;

/**
 * @param {*} val
 * @return {string}
 */
exports.inspect = function (_val) {};

/**
 * @param {Object} obj
 * @param {Array.<string>} targets
 * @return {Object}
 */
exports.prepare = function (_obj, _targets) {};

/**
 * @param {Object} batch
 * @return {void}
 */
exports.tryEnd = function (_batch) {};

/**
 * @type {Array.<Object>}
 */
exports.suites;

/**
 * @param {Object} subject
 * @param {...*} args
 * @return {Object}
 */
exports.describe = function (_subject, _args) {};

/**
 * @type {string}
 */
exports.version;
