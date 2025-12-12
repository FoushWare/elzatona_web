/*
 * Copyright 2009 The Closure Compiler Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Definitions for ECMAScript 5.
 * @see https://es5.github.io/
 * @externs
 */

/**
 * @param {Object|undefined} selfObj Specifies the object to which |this| should
 *     point when the function is run. If the value is null or undefined, it
 *     will default to the global object.
 * @param {...*} var_args Additional arguments that are partially
 *     applied to fn.
 * @return {!Function} A partially-applied form of the Function on which
 *     bind() was invoked as a method.
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
 */
Function.prototype.bind = function (_selfObj, _var_args) {};

/**
 * @this {String|string}
 * @return {string}
 * @nosideeffects
 * @see http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/Trim
 */
String.prototype.trim = function () {};

/**
 * @this {String|string}
 * @return {string}
 * @nosideeffects
 * @see http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/TrimLeft
 */
String.prototype.trimLeft = function () {};

/**
 * @this {String|string}
 * @return {string}
 * @nosideeffects
 * @see http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/TrimRight
 */
String.prototype.trimRight = function () {};

/**
 * A object property descriptor used by Object.create, Object.defineProperty,
 * Object.defineProperties, Object.getOwnPropertyDescriptor.
 *
 * Note: not a real constructor.
 * @constructor
 * @template THIS
 */
function ObjectPropertyDescriptor() {}

/** @type {*} */
ObjectPropertyDescriptor.prototype.value;

/** @type {(function(this: THIS):?)|undefined} */
ObjectPropertyDescriptor.prototype.get;

/** @type {(function(this: THIS, ?):void)|undefined} */
ObjectPropertyDescriptor.prototype.set;

/** @type {boolean|undefined} */
ObjectPropertyDescriptor.prototype.writable;

/** @type {boolean|undefined} */
ObjectPropertyDescriptor.prototype.enumerable;

/** @type {boolean|undefined} */
ObjectPropertyDescriptor.prototype.configurable;

/**
 * @param {Object} proto
 * @param {Object=} opt_properties  A map of ObjectPropertyDescriptors.
 * @return {!Object}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
 */
Object.create = function (_proto, _opt_properties) {};

/**
 * @param {!Object} obj
 * @param {string} prop
 * @param {!Object} descriptor A ObjectPropertyDescriptor.
 * @return {!Object}
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty
 */
Object.defineProperty = function (_obj, _prop, _descriptor) {};

/**
 * @param {!Object} obj
 * @param {!Object} props A map of ObjectPropertyDescriptors.
 * @return {!Object}
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperties
 */
Object.defineProperties = function (_obj, _props) {};

/**
 * @param {T} obj
 * @param {string} prop
 * @return {!ObjectPropertyDescriptor<T>|undefined}
 * @nosideeffects
 * @template T
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
 */
Object.getOwnPropertyDescriptor = function (_obj, _prop) {};

/**
 * @param {!Object} obj
 * @return {!Array<string>}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
 */
Object.keys = function (_obj) {};

/**
 * @param {!Object} obj
 * @return {!Array<string>}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
 */
Object.getOwnPropertyNames = function (_obj) {};

/**
 * @param {!Object} obj
 * @return {Object}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf
 */
Object.getPrototypeOf = function (_obj) {};

/**
 * @param {T} obj
 * @return {T}
 * @template T
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/preventExtensions
 */
Object.preventExtensions = function (_obj) {};

/**
 * @param {T} obj
 * @return {T}
 * @template T
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/seal
 */
Object.seal = function (_obj) {};

/**
 * @param {T} obj
 * @return {T}
 * @template T
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/freeze
 */
Object.freeze = function (_obj) {};

/**
 * @param {!Object} obj
 * @return {boolean}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/isExtensible
 */
Object.isExtensible = function (_obj) {};

/**
 * @param {!Object} obj
 * @return {boolean}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/isSealed
 */
Object.isSealed = function (_obj) {};

/**
 * @param {!Object} obj
 * @return {boolean}
 * @nosideeffects
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/isFrozen
 */
Object.isFrozen = function (_obj) {};

/**
 * @param {string=} opt_key The JSON key for this object.
 * @return {*} The serializable representation of this object. Note that this
 *     need not be a string. See http://goo.gl/PEUvs.
 * @see https://es5.github.io/#x15.12.3
 */
Object.prototype.toJSON = function (_opt_key) {};

/**
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/toISOString
 * @return {string}
 */
Date.prototype.toISOString = function () {};

/**
 * @param {*=} opt_ignoredKey
 * @return {string}
 * @override
 */
Date.prototype.toJSON = function (_opt_ignoredKey) {};

/**
 * @param {string} jsonStr The string to parse.
 * @param {(function(string, *) : *)=} opt_reviver
 * @return {*} The JSON object.
 * @throws {Error}
 */
JSON.parse = function (_jsonStr, _opt_reviver) {};

/**
 * @param {*} jsonObj Input object.
 * @param {(Array<string>|(function(string, *) : *)|null)=} opt_replacer
 * @param {(number|string)=} opt_space
 * @return {string} JSON string which represents jsonObj.
 * @throws {Error}
 */
JSON.stringify = function (_jsonObj, _opt_replacer, _opt_space) {};
