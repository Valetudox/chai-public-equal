'use strict';

var comparer = require('./../lib/comparer');

module.exports = {
  compare: comparer.deepMatch,
  expectationMessage: 'expected #{act} to have same public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not have same public properties #{exp}'
};
