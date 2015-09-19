'use strict';

let equal = require('deep-equal');
let rejectKeys = require('../lib/reject-keys');
let _ = require('lodash');

module.exports = {
  compare: (expected, actual) => {
  	if (!_.isArray(expected) || !_.isArray(actual)) return false;
    if (expected.length !== actual.length) return false;
  	return _.every(expected, (a) => _.some(actual, (b) => equal(a, b)));
  },
  transform: rejectKeys,
  expectationMessage: 'expected #{act} to have same members #{exp}',
  expectationNotMessage: 'expected #{act} to not have same members #{exp}'
};
