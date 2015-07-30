'use strict';

var _ = require('lodash');

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

  return _.matches(expected)(actual);
};
