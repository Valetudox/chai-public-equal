'use strict';

var chai = require('chai');
var publicEqual = require('./index')([/^_.+/, /^should/]);

describe('Chai Public Equal', function() {

  before(function() {
    chai.use(publicEqual);
  });

  it('should equal by their properties', function() {
    var actual = { a: 1 };
    var expected = { a: 1 };
    this.expect(actual).to.publicEql(expected);
  });

  it('should compare nested objects by value not reference', function() {
    var actual = { a: 1, nested: { aa: 2 } };
    var expected = { a: 1, nested: { aa: 2 } };
    this.expect(actual).to.publicEql(expected);
  });

  it('should ignore private properties', function() {
    var actual = { a: 1, _b: 2 };
    var expected = { a: 1, _b: 3 };
    this.expect(actual).to.publicEql(expected);
  });

  it('should ignore private properties on nested object', function() {
    var actual = { a: 1, nested: { aa: 2, _bb: 1 } };
    var expected = { a: 1, nested: { aa: 2, _bb: 2 } };
    this.expect(actual).to.publicEql(expected);
  });

  it('should ignore properties from the given patterns', function() {
    var actual = { a: 1, should: 5, b: { c: 1, should: 3 } };
    var expected = { a: 1, should: 5, b: { c: 1, should: 4 }  };
    this.expect(actual).to.publicEql(expected);
  });

  it('should work with chai negate', function() {
    var actual = { a: 1, _b: 2 };
    var expected = { a: 2, _b: 2 };
    this.expect(actual).to.not.publicEql(expected);
  });

  it('should work with chai negate with nested object', function() {
    var actual = { a: 1, b: { c: 1 }, _b: 2 };
    var expected = { a: 1, b: { c: 2 }, _b: 2 };
    this.expect(actual).to.not.publicEql(expected);
  });

});
