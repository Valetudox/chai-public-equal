'use strict';

let _ = require('lodash');

module.exports = (expected, actual) => {
  if (typeof(actual) !== typeof(expected)) return false;
  if (typeof(expected) !== 'object' || expected === null) return expected === actual;
  if (!!expected && !actual) return false;

  if (Array.isArray(expected)) {
    return _.every(expected, (a) => {
      return _.some(actual, (b) => {
        return module.exports(a, b);
      });
    });
  }

  return _.matches(expected)(actual);
};
