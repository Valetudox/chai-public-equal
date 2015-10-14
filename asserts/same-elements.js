'use strict';

var equal = require('deep-equal');
var rejectKeys = require('../lib/reject-keys');
var _ = require('lodash');

module.exports = {
  compare: function(expected, actual) {
  	if (!_.isArray(expected) || !_.isArray(actual)) return false;
    if (expected.length !== actual.length) return false;
  	return _.every(expected, function(a) {
      return _.some(actual, function(b) {
        return equal(a, b)
      });
    });
  },
  transform: rejectKeys,
  expectationMessage: 'expected #{act} to have same members #{exp}',
  expectationNotMessage: 'expected #{act} to not have same members #{exp}'
};
