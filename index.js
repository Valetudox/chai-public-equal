'use strict';

var compare = require('./lib/compare');
var ObjectTransformer = require('./lib/object-transformer');

module.exports = function(patterns) {
  patterns = patterns || [/^_.+/];

  return function(chai, utils) {
    var Assertion = chai.Assertion;
    var assertionPrototype = Assertion.prototype;

    Assertion.addChainableMethod('publicEql', function(expected) {
      var showDiff = chai.config.showDiff;
      var objectTransformer = new ObjectTransformer(patterns);
      var actual = utils.flag(this, 'object');
      var expectedWithoutPrivates = objectTransformer.rejectPrivateProperties(expected);
      var actualWithoutPrivates = objectTransformer.rejectPrivateProperties(actual);

      assertionPrototype.assert.call(this,
        compare(expectedWithoutPrivates, actualWithoutPrivates),
        'expected #{act} to have same public properties #{exp}',
        'expected #{act} to not have same public properties #{exp}',
        expectedWithoutPrivates,
        actualWithoutPrivates,
        showDiff
      );
    });
  };
};


