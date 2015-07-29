'use strict';

var _ = require('lodash');
var rejectKeysFactory = require('./reject-keys');

module.exports = function(patterns) {
  return function(expected, actual) {

    if (typeof(actual) !== typeof(expected)) {
      return false;
    }
    if (typeof(expected) !== 'object' || expected === null) {
      return expected === actual;
    }
    if (!!expected && !actual) {
      return false;
    }

    var rejectKeys = rejectKeysFactory(patterns);
    return _.matches(rejectKeys(expected))(rejectKeys(actual));
  };
};
