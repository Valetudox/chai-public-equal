'use strict';

var _ = require('lodash');
var equal = require('deep-equal');

module.exports = function(expected, actual) {
  if (typeof(actual) !== typeof(expected)) {
    return false;
  }
  if (typeof(expected) !== 'object' || expected === null) {
    return expected === actual;
  }
  if (!!expected && !actual) {
    return false;
  }

  return equal(expected, actual);
};
