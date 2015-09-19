'use strict';

let ObjectTransformer = require('./object-transformer');
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
    let objectTransformer = new ObjectTransformer(this._patterns);
    let flaggedActual = this._flag(actual, 'object');
    let expectedWithoutPrivates = objectTransformer.rejectPrivateProperties(expected);
    let actualWithoutPrivates = objectTransformer.rejectPrivateProperties(flaggedActual);

    this._assertionPrototype.assert.call(actual,
      this._assert.compare(expectedWithoutPrivates, actualWithoutPrivates),
      this._assert.expectationMessage,
      this._assert.expectationNotMessage,
      expectedWithoutPrivates,
      actualWithoutPrivates,
      this._showDiff
    );
  }

}

module.exports = Plugin;
