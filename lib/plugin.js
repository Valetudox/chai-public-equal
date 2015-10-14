'use strict';

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
    var flaggedActual = this._flag(actual, 'object');
    var transformedExpected = this._assert.transform(expected, this._patterns);
    var transformedActual = this._assert.transform(flaggedActual, this._patterns);

    this._assertionPrototype.assert.call(actual,
      this._assert.compare(transformedExpected, transformedActual),
      this._assert.expectationMessage,
      this._assert.expectationNotMessage,
      transformedExpected,
      transformedActual,
      this._showDiff
    );
  }

};

Plugin.create = function(chai, utils, patterns, assert) {
  return new Plugin(chai, utils, patterns, assert);
};

module.exports = Plugin;
