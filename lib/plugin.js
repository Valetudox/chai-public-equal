'use strict';

var compare = require('./compare');
var ObjectTransformer = require('./object-transformer');
var DEFAULT_PRIVATE_PATTERN = [/^_.+/];

var Plugin = function(chai, utils, patterns) {
  this._flag = utils.flag;
  this._patterns = patterns || DEFAULT_PRIVATE_PATTERN;
  this._assertionPrototype = chai.Assertion.prototype;
  this._showDiff = chai.config.showDiff;
};

Plugin.prototype = {

  test: function(expected, actual) {
    var objectTransformer = new ObjectTransformer(this._patterns);
    var flaggedActual = this._flag(actual, 'object');
    var expectedWithoutPrivates = objectTransformer.rejectPrivateProperties(expected);
    var actualWithoutPrivates = objectTransformer.rejectPrivateProperties(flaggedActual);

    this._assertionPrototype.assert.call(actual,
      compare(expectedWithoutPrivates, actualWithoutPrivates),
      'expected #{act} to have same public properties #{exp}',
      'expected #{act} to not have same public properties #{exp}',
      expectedWithoutPrivates,
      actualWithoutPrivates,
      this._showDiff
    );
  }

};

module.exports = Plugin;
