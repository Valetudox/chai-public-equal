'use strict';

var _ = require('lodash');
var rejectKeys = require('../../lib/reject-keys');
var compare = require('./compare');

module.exports = {
  compare: compare,
  transform: rejectKeys,
  expectationMessage: 'expected #{act} to contain public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not contain public properties #{exp}'
};
