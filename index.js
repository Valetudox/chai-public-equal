'use strict';

let Plugin = require('./lib/plugin');
let publicEqlAssert = require('./asserts/public-eql');
let containPublicsAssert = require('./asserts/contain-publics');

module.exports = (patterns) => {
  return (chai, utils) => {
    let Assertion = chai.Assertion;
    let publicEqlAssertPlugin = new Plugin(chai, utils, patterns, publicEqlAssert);
    let containPublicsAssertPlugin = new Plugin(chai, utils, patterns, containPublicsAssert);

    Assertion.addChainableMethod('publicEql', function(expected) {
      publicEqlAssertPlugin.test(expected, this);
    });

    Assertion.addChainableMethod('containPublics', function(expected) {
      containPublicsAssertPlugin.test(expected, this);
    });
  };
};

