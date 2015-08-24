'use strict';

var ObjectTransformer = require('./object-transformer');
var DEFAULT_PRIVATE_PATTERN = [/^_.+/];

var Plugin = function(chai, utils, patterns, assert) {
  this._flag = utils.flag;
  this._patterns = patterns || DEFAULT_PRIVATE_PATTERN;
  this._assertionPrototype = chai.Assertion.prototype;
  this._showDiff = chai.config.showDiff;
  this._assert = assert;
};

Plugin.prototype = {

  test: function(expected, actual) {
    var objectTransformer = new ObjectTransformer(this._patterns);
    var flaggedActual = this._flag(actual, 'object');
    var expectedWithoutPrivates = objectTransformer.rejectPrivateProperties(expected);
    var actualWithoutPrivates = objectTransformer.rejectPrivateProperties(flaggedActual);

    this._assertionPrototype.assert.call(actual,
      this._assert.compare(expectedWithoutPrivates, actualWithoutPrivates),
      this._assert.expectationMessage,
      this._assert.expectationNotMessage,
      expectedWithoutPrivates,
      actualWithoutPrivates,
      this._showDiff
    );
  }

};

module.exports = Plugin;
