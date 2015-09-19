'use strict';

let _ = require('lodash');

module.exports = {
  compare: function(expected, actual) {
    return _.matches(expected)(actual);
  },
  expectationMessage: 'expected #{act} to contain public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not contain public properties #{exp}'
};
