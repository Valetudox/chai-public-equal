'use strict';

var _ = require('lodash');
var rejectKeys = require('./reject-keys')(/^_.+/);

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

  return _.matches(rejectKeys(expected))(rejectKeys(actual));
};
