'use strict';

let _ = require('lodash');
let rejectKeys = require('../lib/reject-keys');

module.exports = {
  compare: function(expected, actual) {
    return _.matches(expected)(actual);
  },
  transform: function(patterns, obj) {
	return rejectKeys(obj, patterns);
  },
  expectationMessage: 'expected #{act} to contain public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not contain public properties #{exp}'
};
