'use strict';

var compare = require('./lib/compare');

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;
  var assertionPrototype = Assertion.prototype;

  Assertion.addChainableMethod('publicEql', function (expected) {
    var actual = utils.flag(this, 'object');
    var showDiff = chai.config.showDiff;

    assertionPrototype.assert.call(this,
      compare(expected, actual),
      'expected #{act} to contain public property values #{exp}',
      'expected #{act} to not contain public property values #{exp}',
      expected,
      actual,
      showDiff
    );
  });
};


