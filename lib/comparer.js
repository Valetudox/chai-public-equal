'use strict';

var equal = require('deep-equal');
var _ = require('lodash');

module.exports = {

  deepMatch: function(expected, actual) {
    return equal(expected, actual);
  },

  contain: function(expected, actual) {
    return _.matches(expected)(actual);
  }

};
