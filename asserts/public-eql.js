'use strict';

let equal = require('deep-equal');
let rejectKeys = require('../lib/reject-keys');

module.exports = {
  compare: function(expected, actual) {
    return equal(expected, actual);
  },
  transform: rejectKeys,
  expectationMessage: 'expected #{act} to have same public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not have same public properties #{exp}'
};
