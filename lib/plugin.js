'use strict';

var compare = require('./compare');
var ObjectTransformer = require('./object-transformer');

var Plugin = function(chai, utils, patterns) {
  this._chai = chai;
  this._utils = utils;
  this._patterns = patterns || [/^_.+/];
  this._assertionPrototype = chai.Assertion.prototype;
};

Plugin.prototype = {

  test: function(expected, actual) {
    var objectTransformer = new ObjectTransformer(this._patterns);
    var flaggedActual = this._utils.flag(actual, 'object');
    var expectedWithoutPrivates = objectTransformer.rejectPrivateProperties(expected);
    var actualWithoutPrivates = objectTransformer.rejectPrivateProperties(flaggedActual);

    this._assertionPrototype.assert.call(actual,
      compare(expectedWithoutPrivates, actualWithoutPrivates),
      'expected #{act} to have same public properties #{exp}',
      'expected #{act} to not have same public properties #{exp}',
      expectedWithoutPrivates,
      actualWithoutPrivates,
      this._chai.config.showDiff
    );
  }

};

module.exports = Plugin;
