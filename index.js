'use strict';

var Plugin = require('./lib/plugin');

module.exports = function(patterns) {
  return function(chai, utils) {
    var Assertion = chai.Assertion;
    var plugin = new Plugin(chai, utils, patterns);

    Assertion.addChainableMethod('publicEql', function(expected) {
      plugin.test(expected, this);
    });
  };
};


