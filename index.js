'use strict';

let Plugin = require('./lib/plugin');
let _ = require('lodash');

const asserts = {
  publicEql: require('./asserts/public-eql'),
  containPublics: require('./asserts/contain-publics'),
  sameElements: require('./asserts/same-elements')
};

module.exports = (patterns) => {
  return (chai, utils) => {
    let Assertion = chai.Assertion;

    _.forEach(asserts, (asserter, name) => {
      let assertPlugin = Plugin.create(chai, utils, patterns, asserter);

      Assertion.addChainableMethod(name, function(expected) {
        assertPlugin.test(expected, this);
      });
    });
  };
};

