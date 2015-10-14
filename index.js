'use strict';

var Plugin = require('./lib/plugin');
var _ = require('lodash');

var asserts = {
  publicEql: require('./asserts/public-eql'),
  containPublics: require('./asserts/contain-publics'),
  sameElements: require('./asserts/same-elements')
};

module.exports = function(patterns) {
  return function(chai, utils) {
    var Assertion = chai.Assertion;

    _.forEach(asserts, function(asserter, name) {
      var assertPlugin = Plugin.create(chai, utils, patterns, asserter);

      Assertion.addChainableMethod(name, function(expected) {
        assertPlugin.test(expected, this);
      });
    });
  };
};

