/*
 * Copyright 2017 The Closure Compiler Authors.
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
 * @fileoverview Externs for jQuery 3.1
 *
 * Note that some functions use different return types depending on the number
 * of parameters passed in. In these cases, you may need to annotate the type
 * of the result in your code, so the JSCompiler understands which type you're
 * expecting. For example:
 *    <code>var elt = /** @type {Element} * / (foo.get(0));</code>
 *
 * @see http://api.jquery.com/
 * @externs
 */

/**
 * @typedef {(Window|Document|Element|Array<Element>|string|jQuery|
 *     NodeList)}
 */
var _jQuerySelector;

/** @typedef {function(...)|Array<function(...)>} */
var _jQueryCallback;

/**
 * @record
 */
function jQueryAjaxSettings() {}

/** @type {(Object<string, string>|undefined)} */
jQueryAjaxSettings.prototype.accepts;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.async;

/** @type {(function(jQuery.jqXHR, (jQueryAjaxSettings|Object<string, *>))|undefined)} */
jQueryAjaxSettings.prototype.beforeSend;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.cache;

/** @type {(function(jQuery.jqXHR, string)|undefined)} */
jQueryAjaxSettings.prototype.complete;

/** @type {(Object<string, RegExp>|undefined)} */
jQueryAjaxSettings.prototype.contents;

/** @type {(?string|boolean|undefined)} */
jQueryAjaxSettings.prototype.contentType;

/** @type {(Object<?, ?>|jQueryAjaxSettings|undefined)} */
jQueryAjaxSettings.prototype.context;

/** @type {(Object<string, Function>|undefined)} */
jQueryAjaxSettings.prototype.converters;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.crossDomain;

/** @type {(Object<?, ?>|?string|Array<?>|undefined)} */
jQueryAjaxSettings.prototype.data;

/** @type {(function(string, string):?|undefined)} */
jQueryAjaxSettings.prototype.dataFilter;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.dataType;

/** @type {(function(jQuery.jqXHR, string, string)|undefined)} */
jQueryAjaxSettings.prototype.error;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.global;

/** @type {(Object<?, ?>|undefined)} */
jQueryAjaxSettings.prototype.headers;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.ifModified;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.isLocal;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.jsonp;

/** @type {(?string|function()|undefined)} */
jQueryAjaxSettings.prototype.jsonpCallback;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.mimeType;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.password;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.processData;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.scriptCharset;

/** @type {(Object<number, function()>|undefined)} */
jQueryAjaxSettings.prototype.statusCode;

/** @type {(function(?, string, jQuery.jqXHR)|undefined)} */
jQueryAjaxSettings.prototype.success;

/** @type {(?number|undefined)} */
jQueryAjaxSettings.prototype.timeout;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.traditional;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.type;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.url;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.username;

/** @type {(function():(ActiveXObject|XMLHttpRequest)|undefined)} */
jQueryAjaxSettings.prototype.xhr;

/** @type {(Object<?, ?>|undefined)} */
jQueryAjaxSettings.prototype.xhrFields;

/**
 * @record
 * @extends {jQueryAjaxSettings}
 */
function jQueryAjaxSettingsExtra() {}

/** @type {Object<string, boolean>} */
jQueryAjaxSettingsExtra.prototype.flatOptions;

/** @type {Object<string, string>} */
jQueryAjaxSettingsExtra.prototype.responseFields;

/**
 * @record
 */
function jQueryAjaxTransport() {}

/** @return {undefined} */
jQueryAjaxTransport.abort = function () {};

/**
 * @param {!IObject<string,string>} headers
 * @param {function(number, string, !IObject<string,string>=, string=):undefined} completeCallback
 * @return {undefined}
 */
jQueryAjaxTransport.send = function (_headers, _completeCallback) {};

/**
 * @constructor
 * @param {(jQuerySelector|Object|function())=} arg1
 * @param {(Element|jQuery|Document|
 *     Object<string, (string|function(!jQuery.Event))>)=} arg2
 * @throws {Error} on invalid selector
 * @return {!jQuery}
 * @implements {Iterable}
 */
function jQuery(_arg1, _arg2) {}

/**
 * @const
 */
var $ = jQuery;

/**
 * @param {jQuerySelector} arg1
 * @param {Element=} context
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.add = function (_arg1, _context) {};

/**
 * @param {jQuerySelector=} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.addBack = function (_arg1) {};

/**
 * @param {(string|function(number,String))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.addClass = function (_arg1) {};

/**
 * @param {(string|Element|Array<Element>|jQuery|function(this:Element,number,string):(string|!Element|!jQuery))} arg1
 * @param {...(string|Element|Array<Element>|jQuery)} content
 * @return {!jQuery}
 */
jQuery.prototype.after = function (_arg1, _content) {};

/**
 * @param {(string|jQueryAjaxSettings|Object<string,*>)} arg1
 * @param {(jQueryAjaxSettings|Object<string, *>)=} settings
 * @return {!jQuery.jqXHR}
 */
jQuery.ajax = function (_arg1, _settings) {};

/**
 * @param {function(!jQuery.Event,XMLHttpRequest,(jQueryAjaxSettings|Object<string, *>))} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxComplete = function (_handler) {};

/**
 * @param {function(!jQuery.Event,jQuery.jqXHR,(jQueryAjaxSettings|Object<string, *>),*)} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxError = function (_handler) {};

/**
 * @param {(string|function((jQueryAjaxSettings|Object<string, *>),(jQueryAjaxSettings|Object<string, *>),jQuery.jqXHR))} dataTypes
 * @param {function((jQueryAjaxSettings|Object<string, *>),(jQueryAjaxSettings|Object<string, *>),jQuery.jqXHR)=} handler
 * @return {undefined}
 */
jQuery.ajaxPrefilter = function (_dataTypes, _handler) {};

/**
 * @param {function(!jQuery.Event,jQuery.jqXHR,(jQueryAjaxSettings|Object<string, *>))} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxSend = function (_handler) {};

/** @const {jQueryAjaxSettingsExtra|Object<string, *>} */
jQuery.ajaxSettings;

/** @param {jQueryAjaxSettings|Object<string, *>} options */
jQuery.ajaxSetup = function (_options) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxStart = function (_handler) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxStop = function (_handler) {};

/**
 * @param {function(!jQuery.Event,XMLHttpRequest,(jQueryAjaxSettings|Object<string, *>), ?)} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxSuccess = function (_handler) {};

/**
 * @param {string} dataType
 * @param {function(!jQueryAjaxSettingsExtra, !jQueryAjaxSettings, !jQuery.jqXHR):(!jQueryAjaxTransport|undefined)} handler
 * @return {undefined}
 */
jQuery.ajaxTransport = function (_dataType, _handler) {};

/**
 * @deprecated Please use .addBack(selector) instead.
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.andSelf = function () {};

/**
 * @param {Object<string,*>} properties
 * @param {(string|number|function()|Object<string,*>)=} arg2
 * @param {(string|function())=} easing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.animate = function (_properties, _arg2, _easing, _complete) {};

/**
 * @param {(string|Element|Array<Element>|jQuery|function(number,string))} arg1
 * @param {...(string|Element|Array<Element>|jQuery)} content
 * @return {!jQuery}
 */
jQuery.prototype.append = function (_arg1, _content) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.appendTo = function (_target) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|boolean|function(number,string))=} arg2
 * @return {(string|!jQuery)}
 */
jQuery.prototype.attr = function (_arg1, _arg2) {};

/**
 * @param {(string|Element|Array<Element>|jQuery|function(this:Element,number,string=):(string|!Element|!jQuery))} arg1
 * @param {...(string|Element|Array<Element>|jQuery)} content
 * @return {!jQuery}
 */
jQuery.prototype.before = function (_arg1, _content) {};

/**
 * @param {(string|Object<string, function(!jQuery.Event)>)} arg1
 * @param {(Object<string, *>|function(!jQuery.Event)|boolean)=} eventData
 * @param {(function(!jQuery.Event)|boolean)=} arg3
 * @return {!jQuery}
 * @deprecated Please use .on instead.
 */
jQuery.prototype.bind = function (_arg1, _eventData, _arg3) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.blur = function (_arg1, _handler) {};

/**
 * @constructor
 * @private
 */
jQuery.callbacks = function () {};

/**
 * @param {string=} flags
 * @return {!jQuery.callbacks}
 */
jQuery.Callbacks = function (_flags) {};

/**
 * @param {jQueryCallback} callbacks
 * @return {!jQuery.callbacks}
 */
jQuery._callbacks.prototype.add = function (_callbacks) {};

/** @return {!jQuery.callbacks} */
jQuery.callbacks.prototype.disable = function () {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.disabled = function () {};

/** @return {!jQuery.callbacks} */
jQuery.callbacks.prototype.empty = function () {};

/**
 * @param {...*} var_args
 * @return {!jQuery.callbacks}
 */
jQuery.callbacks.prototype.fire = function (_var_args) {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.fired = function () {};

/**
 * @param {...*} var_args
 * @return {!jQuery.callbacks}
 */
jQuery.callbacks.prototype.fireWith = function (_var_args) {};

/**
 * @param {function()=} callback
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.has = function (_callback) {};

/** @return {!jQuery.callbacks} */
jQuery.callbacks.prototype.lock = function () {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.locked = function () {};

/**
 * @param {(function()|Array<function()>)} callbacks
 * @return {!jQuery.callbacks}
 */
jQuery._callbacks.prototype.remove = function (_callbacks) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.change = function (_arg1, _handler) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.children = function (_selector) {};

/**
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.clearQueue = function (_queueName) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.click = function (_arg1, _handler) {};

/**
 * @param {boolean=} withDataAndEvents
 * @param {boolean=} deepWithDataAndEvents
 * @return {!jQuery}
 * @suppress {checkTypes} see https://code.google.com/p/closure-compiler/issues/detail?id=583
 */
jQuery.prototype.clone = function (_withDataAndEvents, _deepWithDataAndEvents) {};

/**
 * @param {jQuerySelector} arg1
 * @param {Element=} context
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.closest = function (_arg1, _context) {};

/**
 * @param {Element} container
 * @param {Element} contained
 * @return {boolean}
 * @nosideeffects
 */
jQuery.contains = function (_container, _contained) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.contents = function () {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|function(number,*))=} arg2
 * @return {(string|!jQuery)}
 * @throws {Error}
 */
jQuery.prototype.css = function (_arg1, _arg2) {};

/** @type {Object<string, *>} */
jQuery.cssHooks;

/**
 * @param {Element} elem
 * @param {string=} key
 * @param {*=} value
 * @return {*}
 */
jQuery.data = function (_elem, _key, _value) {};

/**
 * @param {(string|Object<string, *>)=} arg1
 * @param {*=} value
 * @return {*}
 */
jQuery.prototype.data = function (_arg1, _value) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.dblclick = function (_arg1, _handler) {};

/**
 * @constructor
 * @implements {jQuery.Promise}
 * @param {function()=} opt_fn
 * @see http://api.jquery.com/category/deferred-object/
 */
jQuery.deferred = function (_opt_fn) {};

/**
 * @constructor
 * @extends {jQuery.deferred}
 * @param {function()=} opt_fn
 * @return {!jQuery.Deferred}
 */
jQuery.Deferred = function (_opt_fn) {};

/**
 * @override
 * @param {jQueryCallback} alwaysCallbacks
 * @param {...jQueryCallback} alwaysCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.always = function (
  _alwaysCallbacks,
  _alwaysCallbacks2,
) {};

/**
 * @override
 * @param {function()} failCallback
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.catch = function (_failCallback) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {...jQueryCallback} doneCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.done = function (_doneCallbacks, _doneCallbacks2) {};

/**
 * @override
 * @param {jQueryCallback} failCallbacks
 * @param {...jQueryCallback} failCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.fail = function (_failCallbacks, _failCallbacks2) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.notify = function (_var_args) {};

/**
 * @param {Object} context
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.notifyWith = function (_context, _var_args) {};

/**
 * @deprecated Please use deferred.then() instead.
 * @override
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.pipe = function (
  _doneFilter,
  _failFilter,
  _progressFilter,
) {};

/**
 * @override
 * @param {jQueryCallback} progressCallbacks
 * @param {...jQueryCallback} progressCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.progress = function (
  _progressCallbacks,
  _progressCallbacks2,
) {};

/**
 * @override
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.promise = function (_target) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.reject = function (_var_args) {};

/**
 * @param {Object} context
 * @param {Array<*>=} args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.rejectWith = function (_context, _args) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.resolve = function (_var_args) {};

/**
 * @param {Object} context
 * @param {Array<*>=} args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.resolveWith = function (_context, _args) {};

/**
 * @override
 * @return {string}
 * @nosideeffects
 */
jQuery.deferred.prototype.state = function () {};

/**
 * @override
 * @param {function()} doneCallbacks
 * @param {function()=} failCallbacks
 * @param {function()=} progressFilter
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.then = function (
  _doneCallbacks,
  _failCallbacks,
  _progressFilter,
) {};

/**
 * @param {number} duration
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.delay = function (_duration, _queueName) {};

/**
 * @param {string} selector
 * @param {(string|Object<string,*>)} arg2
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg3
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 * @deprecated Please use .on instead.
 */
jQuery.prototype.delegate = function (_selector, _arg2, _arg3, _handler) {};

/**
 * @param {Element} elem
 * @param {string=} queueName
 * @return {undefined}
 */
jQuery.dequeue = function (_elem, _queueName) {};

/**
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.dequeue = function (_queueName) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 */
jQuery.prototype.detach = function (_selector) {};

/**
 * @param {Object} collection
 * @param {function((number|string),?)} callback
 * @return {Object}
 */
jQuery.each = function (_collection, _callback) {};

/**
 * @param {function(number,Element)} fnc
 * @return {!jQuery}
 */
jQuery.prototype.each = function (_fnc) {};

/** @return {!jQuery} */
jQuery.prototype.empty = function () {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.end = function () {};

/**
 * @param {number} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.eq = function (_arg1) {};

/**
 * @param {string} message
 * @throws {Error}
 */
jQuery.error = function (_message) {};

/**
 * @param {string} arg1
 * @return {string}
 */
jQuery.escapeSelector = function (_arg1) {};

/** @const */
jQuery.event = {};

/** @type {Object<string, Object>} */
jQuery.event.special;

/**
 * @constructor
 * @param {string} eventType
 * @param {Object=} properties
 * @return {!jQuery.Event}
 */
jQuery.Event = function (_eventType, _properties) {};

/** @type {boolean} */
jQuery.Event.prototype.altKey;

/** @type {boolean} */
jQuery.Event.prototype.bubbles;

/** @type {number} */
jQuery.Event.prototype.button;

/** @type {number} */
jQuery.Event.prototype.buttons;

/** @type {boolean} */
jQuery.Event.prototype.cancelable;

/** @type {number} */
jQuery.Event.prototype.charCode;

/** @type {number} */
jQuery.Event.prototype.clientX;

/** @type {number} */
jQuery.Event.prototype.clientY;

/** @type {boolean} */
jQuery.Event.prototype.ctrlKey;

/** @type {Element} */
jQuery.Event.prototype.currentTarget;

/** @type {Object<string, *>} */
jQuery.Event.prototype.data;

/** @type {Element} */
jQuery.Event.prototype.delegateTarget;

/** @type {number} */
jQuery.Event.prototype.detail;

/** @type {number} */
jQuery.Event.prototype.eventPhase;

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isDefaultPrevented = function () {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isImmediatePropagationStopped = function () {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isPropagationStopped = function () {};

/** @type {number} */
jQuery.Event.prototype.keyCode;

/** @type {boolean} */
jQuery.Event.prototype.metaKey;

/** @type {string} */
jQuery.Event.prototype.namespace;

/** @type {number} */
jQuery.Event.prototype.offsetX;

/** @type {number} */
jQuery.Event.prototype.offsetY;

/** @type {Event} */
jQuery.Event.prototype.originalEvent;

/** @type {Element} */
jQuery.Event.prototype.originalTarget;

/** @type {number} */
jQuery.Event.prototype.pageX;

/** @type {number} */
jQuery.Event.prototype.pageY;

/** @return {undefined} */
jQuery.Event.prototype.preventDefault = function () {};

/** @type {Object<string, *>} */
jQuery.Event.prototype.props;

/** @type {Element} */
jQuery.Event.prototype.relatedTarget;

/** @type {*} */
jQuery.Event.prototype.result;

/** @type {number} */
jQuery.Event.prototype.screenX;

/** @type {number} */
jQuery.Event.prototype.screenY;

/** @type {boolean} */
jQuery.Event.prototype.shiftKey;

/** @return {undefined} */
jQuery.Event.prototype.stopImmediatePropagation = function () {};

/** @return {undefined} */
jQuery.Event.prototype.stopPropagation = function () {};

/** @type {Element} */
jQuery.Event.prototype.target;

/** @type {number} */
jQuery.Event.prototype.timeStamp;

/** @type {Element} */
jQuery.Event.prototype.toElement;

/** @type {string} */
jQuery.Event.prototype.type;

/** @type {Window} */
jQuery.Event.prototype.view;

/** @type {number} */
jQuery.Event.prototype.which;

/**
 * @param {(Object|boolean)} arg1
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.extend = function (_arg1, _var_args) {};

/**
 * @param {(Object|boolean)} arg1
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.prototype.extend = function (_arg1, _var_args) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeIn = function (_duration, _arg2, _callback) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeOut = function (_duration, _arg2, _callback) {};

/**
 * @param {(string|number)} duration
 * @param {number} opacity
 * @param {(function()|string)=} arg3
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeTo = function (_duration, _opacity, _arg3, _callback) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(string|function())=} easing
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeToggle = function (_duration, _easing, _callback) {};

/**
 * @param {(jQuerySelector|function(number,Element))} arg1
 * @return {!jQuery}
 * @see http://api.jquery.com/filter/
 */
jQuery.prototype.filter = function (_arg1) {};

/**
 * @param {jQuerySelector} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.find = function (_arg1) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.first = function () {};

/** @see http://docs.jquery.com/Plugins/Authoring */
jQuery.fn = jQuery.prototype;

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focus = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focusin = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focusout = function (_arg1, _handler) {};

/** @const */
jQuery.fx = {};

/** @type {number} */
jQuery.fx.interval;

/** @type {boolean} */
jQuery.fx.off;

/**
 * @param {(string|jQueryAjaxSettings|Object<string,*>)} url
 * @param {(Object<string,*>|string|
 *     function(string,string,jQuery.jqXHR))=} data
 * @param {(function(string,string,jQuery.jqXHR)|string|null)=} success
 * @param {string=} dataType
 * @return {!jQuery.jqXHR}
 */
jQuery.get = function (_url, _data, _success, _dataType) {};

/**
 * @param {number=} index
 * @return {(Element|Array<Element>)}
 * @nosideeffects
 */
jQuery.prototype.get = function (_index) {};

/**
 * @param {string} url
 * @param {(Object<string,*>|
 *     function(Object<string,*>,string,jQuery.jqXHR))=} data
 * @param {function(Object<string,*>,string,jQuery.jqXHR)=} success
 * @return {!jQuery.jqXHR}
 * @see http://api.jquery.com/jquery.getjson/#jQuery-getJSON-url-data-success
 */
jQuery.getJSON = function (_url, _data, _success) {};

/**
 * @param {string} url
 * @param {function(Node,string,jQuery.jqXHR)=} success
 * @return {!jQuery.jqXHR}
 */
jQuery.getScript = function (_url, _success) {};

/** @param {string} code */
jQuery.globalEval = function (_code) {};

/**
 * @template T
 * @param {!Array<T>} arr
 * @param {function(*,number)} fnc
 * @param {boolean=} invert
 * @return {!Array<T>}
 */
jQuery.grep = function (_arr, _fnc, _invert) {};

/**
 * @param {(string|Element)} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.has = function (_arg1) {};

/**
 * @param {string} className
 * @return {boolean}
 * @nosideeffects
 */
jQuery.prototype.hasClass = function (_className) {};

/**
 * @param {!Element} elem
 * @return {boolean}
 * @nosideeffects
 */
jQuery.hasData = function (_elem) {};

/**
 * @param {(string|number|function(number,number))=} arg1
 * @return {(number|undefined|!jQuery)}
 */
jQuery.prototype.height = function (_arg1) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.hide = function (_duration, _arg2, _callback) {};

/**
 * @param {boolean} hold
 * @return {undefined}
 * @deprecated
 */
jQuery.holdReady = function (_hold) {};

/**
 * @param {function(!jQuery.Event)} arg1
 * @param {function(!jQuery.Event)=} handlerOut
 * @return {!jQuery}
 */
jQuery.prototype.hover = function (_arg1, _handlerOut) {};

/**
 * @param {(string|function(number,string))=} arg1
 * @return {(string|!jQuery)}
 */
jQuery.prototype.html = function (_arg1) {};

/**
 * @param {string} html
 * @nosideeffects
 * @return {string}
 */
jQuery.htmlPrefilter = function (_html) {};

/**
 * @param {*} value
 * @param {Array<*>} arr
 * @param {number=} fromIndex
 * @return {number}
 * @nosideeffects
 */
jQuery.inArray = function (_value, _arr, _fromIndex) {};

/**
 * @param {jQuerySelector=} arg1
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.index = function (_arg1) {};

/**
 * @param {(number|string|function(number,number):(number|string))=} value
 * @return {(number|undefined|jQuery)}
 */
jQuery.prototype.innerHeight = function (_value) {};

/**
 * @param {(number|string|function(number,number):(number|string))=} value
 * @return {(number|undefined|jQuery)}
 */
jQuery.prototype.innerWidth = function (_value) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.insertAfter = function (_target) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.insertBefore = function (_target) {};

/**
 * @param {jQuerySelector|function(number,Element):boolean} arg1
 * @return {boolean}
 */
jQuery.prototype.is = function (_arg1) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 * @deprecated Please use Array.isArray(obj) instead.
 */
jQuery.isArray = function (_obj) {};

/**
 * @param {Object} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isEmptyObject = function (_obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isFunction = function (_obj) {};

/**
 * @param {*} value
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isNumeric = function (_value) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isPlainObject = function (_obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isWindow = function (_obj) {};

/**
 * @param {Element} node
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isXMLDoc = function (_node) {};

/** @type {string} */
jQuery.prototype.jquery;

/**
 * @constructor
 * @extends {XMLHttpRequest}
 * @implements {jQuery.Promise}
 * @private
 * @see http://api.jquery.com/jQuery.ajax/#jqXHR
 */
jQuery.jqXHR = function () {};

/**
 * @override
 * @param {string=} statusText
 * @return {!jQuery.jqXHR}
 * @suppress {checkTypes} to avoid warning about XMLHttpRequest abort method missmatch
 */
jQuery.jqXHR.prototype.abort = function (_statusText) {};

/**
 * @override
 * @param {jQueryCallback} alwaysCallbacks
 * @param {...jQueryCallback} alwaysCallbacks2
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.always = function (_alwaysCallbacks, _alwaysCallbacks2) {};

/**
 * @override
 * @param {function()} failCallback
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.catch = function (_failCallback) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {...jQueryCallback} doneCallbacks2
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.done = function (_doneCallbacks, _doneCallbacks2) {};

/**
 * @override
 * @param {jQueryCallback} failCallbacks
 * @param {...jQueryCallback} failCallbacks2
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.fail = function (_failCallbacks, _failCallbacks2) {};

/**
 * @deprecated
 * @override
 */
jQuery.jqXHR.prototype.onreadystatechange = function (_callback) {};

/**
 * @override
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.pipe = function (
  _doneFilter,
  _failFilter,
  _progressFilter,
) {};

/**
 * @override
 * @param {jQueryCallback} progressCallbacks
 * @param {...jQueryCallback} progressCallbacks2
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.progress = function (
  _progressCallbacks,
  _progressCallbacks2,
) {};

/**
 * @override
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.jqXHR.prototype.promise = function (_target) {};

/**
 * @override
 * @return {string}
 * @nosideeffects
 */
jQuery.jqXHR.prototype.state = function () {};

/**
 * @param {Object<number, function()>} map
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.statusCode = function (_map) {};

/**
 * @override
 * @param {function()} doneCallback
 * @param {function()=} failCallback
 * @param {function()=} progressCallback
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.then = function (
  _doneCallback,
  _failCallback,
  _progressCallback,
) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keydown = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keypress = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keyup = function (_arg1, _handler) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.last = function () {};

/** @type {number} */
jQuery.prototype.length;

/**
 * @param {*} obj
 * @return {Array<*>}
 * @nosideeffects
 */
jQuery.makeArray = function (_obj) {};

/**
 * @template T
 * @param {(Array<T>|Object<string, T>)} arg1
 * @param {(function(T,number)|function(T,(string|number)))} callback
 * @return {Array<T>}
 */
jQuery.map = function (_arg1, _callback) {};

/**
 * @param {function(number,Element)} callback
 * @return {!jQuery}
 */
jQuery.prototype.map = function (_callback) {};

/**
 * @param {Array<*>} first
 * @param {Array<*>} second
 * @return {Array<*>}
 */
jQuery.merge = function (_first, _second) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mousedown = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseenter = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseleave = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mousemove = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseout = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseover = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseup = function (_arg1, _handler) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.next = function (_selector) {};

/**
 * @param {string=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.nextAll = function (_selector) {};

/**
 * @param {jQuerySelector=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.nextUntil = function (_arg1, _filter) {};

/**
 * @param {boolean=} removeAll
 * @return {Object}
 */
jQuery.noConflict = function (_removeAll) {};

/**
 * @return {undefined}
 * @nosideeffects
 */
jQuery.noop = function () {};

/**
 * @param {(jQuerySelector|function(this:Element,number,Element=):boolean)} arg1
 * @return {!jQuery}
 */
jQuery.prototype.not = function (_arg1) {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.now = function () {};

/**
 * @param {(string|Object<string,*>)=} arg1
 * @param {(string|function(!jQuery.Event))=} selector
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.off = function (_arg1, _selector, _handler) {};

/**
 * @param {({left:number,top:number}|
 *     function(number,{top:number,left:number}))=} arg1
 * @return {({left:number,top:number}|undefined|!jQuery)}
 * @throws {Error}
 */
jQuery.prototype.offset = function (_arg1) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.offsetParent = function () {};

/**
 * @param {(string|Object<string,function(!jQuery.Event)>)} events
 * @param {*=} selector or data or handler
 * @param {*=} data or handler
 * @param {function(!jQuery.Event)=} handler
 * @throws {Error}
 * @return {!jQuery}
 */
jQuery.prototype.on = function (_events, _selector, _data, _handler) {};

/**
 * @param {(string|Object<string,function(!jQuery.Event)>)} events
 * @param {*=} selector or data or handler
 * @param {*=} data or handler
 * @param {function(!jQuery.Event)=} handler
 * @throws {Error}
 * @return {!jQuery}
 */
jQuery.prototype.one = function (_events, _selector, _data, _handler) {};

/**
 * @param {boolean|number|string|function(number,number):(number|string)=} includeMargin
 * @return {number|undefined|jQuery}
 */
jQuery.prototype.outerHeight = function (_includeMargin) {};

/**
 * @param {boolean|number|string|function(number,number):(number|string)=} includeMargin
 * @return {number|undefined|jQuery}
 */
jQuery.prototype.outerWidth = function (_includeMargin) {};

/**
 * @param {(Object<string, *>|Array<Object<string, *>>)} obj
 * @param {boolean=} traditional
 * @return {string}
 */
jQuery.param = function (_obj, _traditional) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parent = function (_selector) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parents = function (_selector) {};

/**
 * @param {jQuerySelector=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parentsUntil = function (_arg1, _filter) {};

/**
 * @param {string} data
 * @param {(Element|boolean)=} context
 * @param {boolean=} keepScripts
 * @return {Array<Element>}
 */
jQuery.parseHTML = function (_data, _context, _keepScripts) {};

/**
 * @param {string} json
 * @return {string|number|Object<string, *>|Array<?>|boolean}
 * @deprecated Please use JSON.parse() instead.
 */
jQuery.parseJSON = function (_json) {};

/**
 * @param {string} data
 * @return {Document}
 */
jQuery.parseXML = function (_data) {};

/**
 * @return {{left:number,top:number}}
 * @nosideeffects
 */
jQuery.prototype.position = function () {};

/**
 * @param {(string|jQueryAjaxSettings|Object<string,*>)} url
 * @param {(Object<string,*>|string|
 *     function(string,string,jQuery.jqXHR))=} data
 * @param {(function(string,string,jQuery.jqXHR)|string|null)=} success
 * @param {string=} dataType
 * @return {!jQuery.jqXHR}
 */
jQuery.post = function (_url, _data, _success, _dataType) {};
/**
 * @param {(string|Element|jQuery|function(number,string))} arg1
 * @param {(string|Element|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.prepend = function (_arg1, _content) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.prependTo = function (_target) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prev = function (_selector) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prevAll = function (_selector) {};

/**
 * @param {jQuerySelector=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prevUntil = function (_arg1, _filter) {};

/**
 * @param {(string|Object)=} type
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.prototype.promise = function (_type, _target) {};

/**
 * @interface
 * @private
 * @see http://api.jquery.com/Types/#Promise
 */
jQuery.Promise = function () {};

/**
 * @param {jQueryCallback} alwaysCallbacks
 * @param {...jQueryCallback} alwaysCallbacks2
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.always = function (
  _alwaysCallbacks,
  _alwaysCallbacks2,
) {};

/**
 * @param {jQueryCallback} doneCallbacks
 * @param {...jQueryCallback} doneCallbacks2
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.done = function (_doneCallbacks, _doneCallbacks2) {};

/**
 * @param {function()} failCallback
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.catch = function (_failCallback) {};

/**
 * @param {jQueryCallback} failCallbacks
 * @param {...jQueryCallback} failCallbacks2
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.fail = function (_failCallbacks, _failCallbacks2) {};

/**
 * @deprecated Please use deferred.then() instead.
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.pipe = function (
  _doneFilter,
  _failFilter,
  _progressFilter,
) {};

/**
 * @param {jQueryCallback} progressCallbacks
 * @param {...jQueryCallback} progressCallbacks2
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.progress = function (
  _progressCallbacks,
  _progressCallbacks2,
) {};

/**
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.promise = function (_target) {};

/**
 * @return {string}
 * @nosideeffects
 */
jQuery.Promise.prototype.state = function () {};

/**
 * @param {function()} doneCallbacks
 * @param {function()=} failCallbacks
 * @param {function()=} progressCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.then = function (
  _doneCallbacks,
  _failCallbacks,
  _progressCallbacks,
) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|boolean|function(number,String))=} arg2
 * @return {(string|boolean|!jQuery)}
 */
jQuery.prototype.prop = function (_arg1, _arg2) {};

/**
 * @param {...*} var_args
 * @return {function()}
 */
jQuery.proxy = function (_var_args) {};

/**
 * @param {Array<Element>} elements
 * @param {string=} name
 * @param {Array<*>=} args
 * @return {!jQuery}
 */
jQuery.prototype.pushStack = function (_elements, _name, _args) {};

/**
 * @param {(string|Array<function()>|function(function()))=} queueName
 * @param {(Array<function()>|function(function()))=} arg2
 * @return {(Array<Element>|!jQuery)}
 */
jQuery.prototype.queue = function (_queueName, _arg2) {};

/**
 * @param {Element} elem
 * @param {string=} queueName
 * @param {(Array<function()>|function())=} arg3
 * @return {(Array<Element>|!jQuery)}
 */
jQuery.queue = function (_elem, _queueName, _arg3) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 * @deprecated Please use the $(handler) instead.
 */
jQuery.prototype.ready = function (_handler) {};

/**
 * Handles errors thrown synchronously in functions wrapped in jQuery().
 * @param {Error} handler
 * @since 3.1
 * @see https://api.jquery.com/jQuery.readyException/
 */
jQuery.readyException = function (_handler) {};

/**
 * @param {string=} selector
 * @return {!jQuery}
 */
jQuery.prototype.remove = function (_selector) {};

/**
 * @param {string} attributeName
 * @return {!jQuery}
 */
jQuery.prototype.removeAttr = function (_attributeName) {};

/**
 * @param {(string|function(number,string))=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.removeClass = function (_arg1) {};

/**
 * @param {(string|Array<string>)=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.removeData = function (_arg1) {};

/**
 * @param {Element} elem
 * @param {string=} name
 * @return {!jQuery}
 */
jQuery.removeData = function (_elem, _name) {};

/**
 * @param {string} propertyName
 * @return {!jQuery}
 */
jQuery.prototype.removeProp = function (_propertyName) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.replaceAll = function (_target) {};

/**
 * @param {(string|Element|jQuery|function())} arg1
 * @return {!jQuery}
 */
jQuery.prototype.replaceWith = function (_arg1) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.resize = function (_arg1, _handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.scroll = function (_arg1, _handler) {};

/**
 * @param {number=} value
 * @return {(number|!jQuery)}
 */
jQuery.prototype.scrollLeft = function (_value) {};

/**
 * @param {number=} value
 * @return {(number|!jQuery)}
 */
jQuery.prototype.scrollTop = function (_value) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.select = function (_arg1, _handler) {};

/**
 * @return {string}
 * @nosideeffects
 */
jQuery.prototype.serialize = function () {};

/**
 * @return {Array<Object<string, *>>}
 * @nosideeffects
 */
jQuery.prototype.serializeArray = function () {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.show = function (_duration, _arg2, _callback) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.siblings = function (_selector) {};

/**
 * @deprecated Please use the .length property instead.
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.size = function () {};

/**
 * @param {number} start
 * @param {number=} end
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.slice = function (_start, _end) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideDown = function (
  _optionsOrDuration,
  _completeOrEasing,
  _complete,
) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideToggle = function (
  _optionsOrDuration,
  _completeOrEasing,
  _complete,
) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideUp = function (
  _optionsOrDuration,
  _completeOrEasing,
  _complete,
) {};

/**
 * @param {(boolean|string)=} arg1
 * @param {boolean=} arg2
 * @param {boolean=} jumpToEnd
 * @return {!jQuery}
 */
jQuery.prototype.stop = function (_arg1, _arg2, _jumpToEnd) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.submit = function (_arg1, _handler) {};

/**
 * @record
 */
function jQuerySupport() {}

/** @type {boolean} */
jQuerySupport.prototype.boxModel;

/** @type {boolean} */
jQuerySupport.prototype.changeBubbles;

/** @type {boolean} */
jQuerySupport.prototype.cors;

/** @type {boolean} */
jQuerySupport.prototype.cssFloat;

/** @type {boolean} */
jQuerySupport.prototype.hrefNormalized;

/** @type {boolean} */
jQuerySupport.prototype.htmlSerialize;

/** @type {boolean} */
jQuerySupport.prototype.leadingWhitespace;

/** @type {boolean} */
jQuerySupport.prototype.noCloneEvent;

/** @type {boolean} */
jQuerySupport.prototype.opacity;

/** @type {boolean} */
jQuerySupport.prototype.style;

/** @type {boolean} */
jQuerySupport.prototype.submitBubbles;

/** @type {boolean} */
jQuerySupport.prototype.tbody;

/**
 * @type {!jQuerySupport}
 * @deprecated Please try to use feature detection instead.
 */
jQuery.support;

/**
 * @param {(string|number|boolean|function(number,string))=} arg1
 * @return {(string|!jQuery)}
 */
jQuery.prototype.text = function (_arg1) {};

/**
 * @return {Array<Element>}
 * @nosideeffects
 */
jQuery.prototype.toArray = function () {};

/**
 * Refers to the method from the Effects category. There used to be a toggle
 * method on the Events category which was removed starting version 1.9.
 * @param {(number|string|Object<string,*>|boolean)=} arg1
 * @param {(function()|string)=} arg2
 * @param {function()=} arg3
 * @return {!jQuery}
 */
jQuery.prototype.toggle = function (_arg1, _arg2, _arg3) {};

/**
 * @param {(string|function(number,string,boolean))} arg1
 * @param {boolean=} flag
 * @return {!jQuery}
 */
jQuery.prototype.toggleClass = function (_arg1, _flag) {};

/**
 * @param {(string|jQuery.Event)} arg1
 * @param {...*} var_args
 * @return {!jQuery}
 */
jQuery.prototype.trigger = function (_arg1, _var_args) {};

/**
 * @param {string|jQuery.Event} eventType
 * @param {Array<*>=} extraParameters
 * @return {*}
 */
jQuery.prototype.triggerHandler = function (_eventType, _extraParameters) {};

/**
 * @param {string} str
 * @return {string}
 * @nosideeffects
 */
jQuery.trim = function (_str) {};

/**
 * @param {*} obj
 * @return {string}
 * @nosideeffects
 */
jQuery.type = function (_obj) {};

/**
 * @param {(string|function(!jQuery.Event)|jQuery.Event)=} arg1
 * @param {(function(!jQuery.Event)|boolean)=} arg2
 * @return {!jQuery}
 * @deprecated Please use .off instead.
 */
jQuery.prototype.unbind = function (_arg1, _arg2) {};

/**
 * @param {string=} arg1
 * @param {(string|Object<string,*>)=} arg2
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 * @deprecated Please use .off instead.
 */
jQuery.prototype.undelegate = function (_arg1, _arg2, _handler) {};

/**
 * @param {Array<Element>} arr
 * @return {Array<Element>}
 * @deprecated Please use .uniqueSort instead.
 */
jQuery.unique = function (_arr) {};

/**
 * @param {Array<Element>} arr
 * @return {Array<Element>}
 */
jQuery.uniqueSort = function (_arr) {};

/**
 * @param  {jQuerySelector=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.unwrap = function (_arg1) {};

/**
 * @param {(string|Array<string>|function(number,*))=} arg1
 * @return {(string|number|Array<string>|!jQuery)}
 */
jQuery.prototype.val = function (_arg1) {};

/**
 * Note: The official documentation (https://api.jquery.com/jQuery.when/) says
 * jQuery.when accepts deferreds, but it actually accepts any type, e.g.:
 *
 * jQuery.when(jQuery.ready, jQuery.ajax(''), jQuery('#my-element'), 1)
 *
 * If an argument is not an "observable" (a promise-like object) it is wrapped
 * into a promise.
 * @param {*} deferred
 * @param {...*} deferreds
 * @return {!jQuery.Promise}
 */
jQuery.when = function (_deferred, _deferreds) {};

/**
 * @param {(string|number|function(number,number))=} arg1
 * @return {(number|undefined|!jQuery)}
 */
jQuery.prototype.width = function (_arg1) {};

/**
 * @param {(jQuerySelector|function(number))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.wrap = function (_arg1) {};

/**
 * @param {jQuerySelector} wrappingElement
 * @return {!jQuery}
 */
jQuery.prototype.wrapAll = function (_wrappingElement) {};

/**
 * @param {(jQuerySelector|function(number))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.wrapInner = function (_arg1) {};
