(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Helper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
function isObject(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
};
function isArray(value) {

  if (!Array.isArray) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.prototype.toString.call(value) === '[object Array]';
  } else {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Array.isArray(value);
  }
};
function arrayIndex(arr, search) {

  if (!Array.prototype.indexOf) {

    for (var i = 0, ii = arr.length; i < ii; i++) {
      if (arr[i] === search) {
        return i;
      }
    }

    return -1;
  } else {
    return arr.indexOf(search);
  }
};
function keys(obj) {

  if (!Object.keys) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  } else {
    return Object.keys(obj);
  }
};
function fullExtend(dest, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; i++) {
    var obj = objs[i];

    if (!isObject(obj)) dest = obj;

    var objKeys = keys(obj);

    for (var j = 0, jj = objKeys.length; j < jj; j++) {
      var key = objKeys[j];
      var val = obj[key];

      if (isObject(val) && deep) {
        if (!isObject(dest[key])) dest[key] = isArray(val) ? [] : {};
        fullExtend(dest[key], [val], true);
      } else {
        dest[key] = val;
      }
    }
  }

  return dest;
};
function lowCopy(dest, val) {
  return fullExtend(dest, [val], false);
};
function deepCopy(dest, val) {
  return fullExtend(dest, [val], true);
};

module.exports = {
  deepCopy: deepCopy,
  lowCopy: lowCopy,
  isObject: isObject,
  isArray: isArray,
  keys: keys,
  arrayIndex: arrayIndex
};

},{}],2:[function(require,module,exports){
'use strict';

var helpers = require('./helpers.js'),
    version = require('./version.js');

helpers.version = version;

module.exports = helpers;

},{"./helpers.js":1,"./version.js":3}],3:[function(require,module,exports){
"use strict";

module.exports = { "full": "1.0.0", "major": "1", "minor": "0", "dot": "0", "author": "danjford <github.com/danjford>" };

},{}]},{},[2])(2)
});