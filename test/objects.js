'use strict';

describe('Chai Public Equal', function() {

  describe('With objects', function() {

    it('should equal by their properties', function() {
      var actual = { a: 1, c: null };
      var expected = { a: 1, c: null };
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

    it('should match all the property', function() {
      var first = { a: 1, b: 2, c: 3 };
      var second = { a: 1, b: 2 };
      this.expect(first).to.not.publicEql(second);
      this.expect(second).to.not.publicEql(first);
    });

    it('should ignore functions', function() {
      var actual = { a: 1, c: function() { return 1; } };
      var expected = { a: 1, c: function() { return 2; } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore functions on nested object', function() {
      var actual = { a: 1, b: { d: 1, c: function() { return 1; }  } };
      var expected = { a: 1, b: { d: 1, c: function() { return 2; } } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore private properties on nested object', function() {
      var actual = { a: 1, nested: { aa: 2, _bb: 1 } };
      var expected = { a: 1, nested: { aa: 2, _bb: 2 } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore properties from the given patterns', function() {
      var actual = { a: 1, should: 5, b: { c: 1, should: 3, e: 5 } };
      var expected = { a: 1, should: 5, b: { c: 1, should: 4, e: 5 }  };
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

});
