'use strict';

var equal = require('deep-equal');
var _ = require('lodash');

module.exports = {

  deepMatch: function(expected, actual) {
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
  },

  contain: function(expected, actual) {
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
  },

};
