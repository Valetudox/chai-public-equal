'use strict';

describe('Chai Public Equal', function() {

  it('should equal by their properties', function() {
    var expected = { a: 1 };
    var actual = { a: 1 };
    this.expect(expected).to.eqlPublic(actual);
  });

  it('should compare nested objects by value not reference', function() {
    var expected = { a: 1, nested: { aa: 2 } };
    var actual = { a: 1, nested: { aa: 2 } };
    this.expect(expected).to.eqlPublic(actual);
  });

  it('should ignore private properties', function() {
    var expected = { a: 1, _b: 2 };
    var actual = { a: 1, _b: 3 };
    this.expect(expected).to.eqlPublic(actual);
  });

  it('should ignore private properties on nested object too', function() {
    var expected = { a: 1, nested: { aa: 2, _bb: 1 } };
    var actual = { a: 1, nested: { aa: 2, _bb: 2 } };
    this.expect(expected).to.eqlPublic(actual);
  });

  it('should work with chai negate', function() {
    var expected = { a: 1, _b: 2 };
    var actual = { a: 2, _b: 2 };
    this.expect(expected).to.not.eqlPublic(actual);
  });

});
