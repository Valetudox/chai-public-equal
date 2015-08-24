'use strict';

var Plugin = require('./lib/plugin');
var publicEqlAssert = require('./asserts/public-eql');

module.exports = function(patterns) {
  return function(chai, utils) {
    var Assertion = chai.Assertion;
    var publicEqlAssertPlugin = new Plugin(chai, utils, patterns, publicEqlAssert);

    Assertion.addChainableMethod('publicEql', function(expected) {
      publicEqlAssertPlugin.test(expected, this);
    });
  };
};


