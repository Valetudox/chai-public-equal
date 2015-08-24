'use strict';

var Plugin = require('./lib/plugin');
var publicEqlAssert = require('./asserts/public-eql');
var containPublicsAssert = require('./asserts/contain-publics');

module.exports = function(patterns) {
  return function(chai, utils) {
    var Assertion = chai.Assertion;
    var publicEqlAssertPlugin = new Plugin(chai, utils, patterns, publicEqlAssert);
    var containPublicsAssertPlugin = new Plugin(chai, utils, patterns, containPublicsAssert);

    Assertion.addChainableMethod('publicEql', function(expected) {
      publicEqlAssertPlugin.test(expected, this);
    });

    Assertion.addChainableMethod('containPublics', function(expected) {
      containPublicsAssertPlugin.test(expected, this);
    });
  };
};


