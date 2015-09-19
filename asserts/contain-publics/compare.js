'use strict';

let _ = require('lodash');
let typeChecker = require('is-native-type');

let compare = (expected, actual) => {
  if (typeof(actual) !== typeof(expected)) return false;
  if (typeChecker.isScalar(expected)) return expected === actual;

  if (Array.isArray(expected)) {
    return _.every(expected, (a) => {
      return _.some(actual, (b) => compare(a, b));
    });
  }

  return _.keys(expected).every((key) => compare(expected[key], actual[key]));
};

module.exports = compare;
