'use strict';

var comparer = require('./../lib/comparer');

module.exports = {
  compare: comparer.contain,
  expectationMessage: 'expected #{act} to contain public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not contain public properties #{exp}'
};
