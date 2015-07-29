'use strict';

var chai = require('chai');
var publicEqual = require('./index')([/^_.+/, /^should/]);

describe('Chai Public Equal', function() {

  before(function() {
    chai.use(publicEqual);
  });

  it('should equal by their properties', function() {
    var expected = { a: 1 };
    var actual = { a: 1 };
    this.expect(expected).to.publicEql(actual);
  });

  it('should compare nested objects by value not reference', function() {
    var expected = { a: 1, nested: { aa: 2 } };
    var actual = { a: 1, nested: { aa: 2 } };
    this.expect(expected).to.publicEql(actual);
  });

  it('should ignore private properties', function() {
    var expected = { a: 1, _b: 2 };
    var actual = { a: 1, _b: 3 };
    this.expect(expected).to.publicEql(actual);
  });

  it('should ignore private properties on nested object too', function() {
    var expected = { a: 1, nested: { aa: 2, _bb: 1 } };
    var actual = { a: 1, nested: { aa: 2, _bb: 2 } };
    this.expect(expected).to.publicEql(actual);
  });

  it('should ignore properties from the given patterns', function() {
    var expected = { a: 1, should: 5, b: { c: 1, should: 3 } };
    var actual = { a: 1, should: 5, b: { c: 1, should: 4 }  };
    this.expect(expected).to.publicEql(actual);
  });

  it('should work with chai negate', function() {
    var expected = { a: 1, _b: 2 };
    var actual = { a: 2, _b: 2 };
    this.expect(expected).to.not.publicEql(actual);
  });

});
