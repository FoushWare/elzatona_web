/*
 * Copyright 2016 Semmle
 */

/**
 * @fileoverview Definitions approved for inclusion in ECMAScript 2017.
 * @see https://github.com/tc39/proposals/blob/master/finished-proposals.md
 * @externs
 */

/**
 * @param {*} obj
 * @return {!Array}
 * @nosideeffects
 */
Object.values = function (_obj) {};

/**
 * @param {*} obj
 * @return {!Array.<Array>}
 * @nosideeffects
 */
Object.entries = function (_obj) {};

/**
 * @param {number} maxLength
 * @param {string=} fillString
 * @return {string}
 * @nosideeffects
 */
String.prototype.padStart = function (_maxLength, _fillString) {};

/**
 * @param {number} maxLength
 * @param {string=} fillString
 * @return {string}
 * @nosideeffects
 */
String.prototype.padEnd = function (_maxLength, _fillString) {};

/**
 * @param {!Object} obj
 * @return {!Array.<!ObjectPropertyDescriptor>}
 * @nosideeffects
 */
Object.getOwnPropertyDescriptors = function (_obj) {};
