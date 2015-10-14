'use strict';

var equal = require('deep-equal');
var rejectKeys = require('../lib/reject-keys');

module.exports = {
  compare: equal,
  transform: rejectKeys,
  expectationMessage: 'expected #{act} to have same public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not have same public properties #{exp}'
};
