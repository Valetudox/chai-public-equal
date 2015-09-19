'use strict';

let _ = require('lodash');
let rejectKeys = require('../../lib/reject-keys');
let compare = require('./compare');

module.exports = {
  compare: compare,
  transform: rejectKeys,
  expectationMessage: 'expected #{act} to contain public properties #{exp}',
  expectationNotMessage: 'expected #{act} to not contain public properties #{exp}'
};
