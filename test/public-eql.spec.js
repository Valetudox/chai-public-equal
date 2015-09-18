'use strict';

let InterSector = require('./classes').InterSector;
let ExtendInterSector = require('./classes').ExtendInterSector;
let OtherInterSector = require('./classes').OtherInterSector;
let ExtendInterSectorWithExtraFunction = require('./classes').ExtendInterSectorWithExtraFunction;

describe('#publicEql', function() {

  describe('with classes', function () {

    it('should equal by their properties', function () {
      this.expect(new InterSector(2, 1)).to.publicEql(new InterSector(3, 2));
    });

    it('should not equal by their properties', function () {
      this.expect(new InterSector(2, 2)).to.not.publicEql(new InterSector(3, 2));
    });

    it('should ignore functions', function () {
      this.expect(new InterSector(2, 1)).to.publicEql(new OtherInterSector(3, 2));
    });

  });

  describe('With objects', function() {

    it('should equal by their properties', function() {
      let actual = { a: 1, c: null };
      let expected = { a: 1, c: null };
      this.expect(actual).to.publicEql(expected);
    });

    it('should compare nested objects by value not reference', function() {
      let actual = { a: 1, nested: { aa: 2 } };
      let expected = { a: 1, nested: { aa: 2 } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore private properties', function() {
      let actual = { a: 1, _b: 2 };
      let expected = { a: 1, _b: 3 };
      this.expect(actual).to.publicEql(expected);
    });

    it('should match all the property', function() {
      let first = { a: 1, b: 2, c: 3 };
      let second = { a: 1, b: 2 };
      this.expect(first).to.not.publicEql(second);
      this.expect(second).to.not.publicEql(first);
    });

    it('should ignore functions', function() {
      let actual = { a: 1, c: function() { return 1; } };
      let expected = { a: 1, c: function() { return 2; } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore functions on nested object', function() {
      let actual = { a: 1, b: { d: 1, c: function() { return 1; }  } };
      let expected = { a: 1, b: { d: 1, c: function() { return 2; } } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore private properties on nested object', function() {
      let actual = { a: 1, nested: { aa: 2, _bb: 1 } };
      let expected = { a: 1, nested: { aa: 2, _bb: 2 } };
      this.expect(actual).to.publicEql(expected);
    });

    it('should ignore properties from the given patterns', function() {
      let actual = { a: 1, should: 5, b: { c: 1, should: 3, e: 5 } };
      let expected = { a: 1, should: 5, b: { c: 1, should: 4, e: 5 }  };
      this.expect(actual).to.publicEql(expected);
    });

    it('should work with chai negate', function() {
      let actual = { a: 1, _b: 2 };
      let expected = { a: 2, _b: 2 };
      this.expect(actual).to.not.publicEql(expected);
    });

    it('should work with chai negate with nested object', function() {
      let actual = { a: 1, b: { c: 1 }, _b: 2 };
      let expected = { a: 1, b: { c: 2 }, _b: 2 };
      this.expect(actual).to.not.publicEql(expected);
    });

    it('should work with nested arrays full of scalars', function() {
      let actual = { a: 1, b: { c: 1 }, _b: 2, d: [1, 2] };
      let expected = { a: 1, b: { c: 1 }, _b: 2, d: [1 ,2] };
      this.expect(actual).to.publicEql(expected);
    });

    it('should work with arrays full of scalars', function() {
      let actual = [1, 2];
      let expected = [1, 2]
      this.expect(actual).to.publicEql(expected);
    });

    it('should work with nested arrays full of scalars and chai negate', function() {
      let actual = { a: 1, b: { c: 1 }, _b: 2, d: [1] };
      let expected = { a: 1, b: { c: 2 }, _b: 2, d: [1 ,2] };
      this.expect(actual).to.not.publicEql(expected);
    });

    it('should work with nested arrays full of objects', function() {
      let actual = { a: 1, b: { c: 1 }, _b: 2, d: [{ e: 'a', f: 2, _g: 4 }] };
      let expected = { a: 1, b: { c: 1 }, _b: 2, d: [{ e: 'a', f: 2, _p: 4 }] };
      this.expect(actual).to.publicEql(expected);
    });

    it('should work with arrays full of objects', function() {
      let actual = [{ a: 1, _b: 2 }];
      let expected = [{ a: 1, _b: 3 }];
      this.expect(actual).to.publicEql(expected);
    });

    it('should work with arrays full of objects and chai negate', function() {
      let actual = [{ a: 1, _b: 2 }];
      let expected = [{ a: 2, _b: 3 }];
      this.expect(actual).to.not.publicEql(expected);
    });

    it('should work with nested arrays full of objects and chai negate', function() {
      let actual = { a: 1, b: { c: 1 }, _b: 2, d: [{ e: 'a', f: 2 }] };
      let expected = { a: 1, b: { c: 1 }, _b: 2, d: [{ e: 'a', f: 3 }] };
      this.expect(actual).to.not.publicEql(expected);
    });

  });

});  

