'use strict';

let DEFAULT_PRIVATE_PATTERN = [/^_.+/];

class Plugin {

  constructor(chai, utils, patterns, assert) {
    this._flag = utils.flag;
    this._patterns = patterns || DEFAULT_PRIVATE_PATTERN;
    this._assertionPrototype = chai.Assertion.prototype;
    this._showDiff = chai.config.showDiff;
    this._assert = assert;
  }


  test(expected, actual) {
    let flaggedActual = this._flag(actual, 'object');
    let transformedExpected = this._assert.transform(expected, this._patterns);
    let transformedActual = this._assert.transform(flaggedActual, this._patterns);

    this._assertionPrototype.assert.call(actual,
      this._assert.compare(transformedExpected, transformedActual),
      this._assert.expectationMessage,
      this._assert.expectationNotMessage,
      transformedExpected,
      transformedActual,
      this._showDiff
    );
  }

}

module.exports = Plugin;
