'use strict';

var _ = require('lodash');
var typeChecker = require('is-native-type');

let compare = (expected, actual) => {
  if (typeof(actual) !== typeof(expected)) return false;
  if (typeChecker.isScalar(expected)) return expected === actual;

  if (Array.isArray(expected)) {
    return _.every(expected, function(a) {
      return _.some(actual, function(b) {
        return compare(a, b);
      });
    });
  }

  return _.keys(expected).every(function(key) {
    return compare(expected[key], actual[key]);
  });
};

module.exports = compare;
