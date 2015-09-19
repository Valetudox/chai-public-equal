'use strict';

let equal = require('deep-equal');

module.exports = {
  compare: function(expected, actual) {
    return equal(expected, actual);
  },
  expectationMessage: 'expected #{act} to have same public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not have same public properties #{exp}'
};
