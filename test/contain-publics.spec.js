'use strict';

let InterSector = require('./classes').InterSector;
let ExtendInterSector = require('./classes').ExtendInterSector;
let OtherInterSector = require('./classes').OtherInterSector;
let ExtendInterSectorWithExtraFunction = require('./classes').ExtendInterSectorWithExtraFunction;

describe('#containPublics', function() {

  describe('with objects', function() {

    it('should contains by their properties', function() {
      let actual = { a: 1, b: 2, c: null };
      let expected = { a: 1, c: null };
      this.expect(actual).to.containPublics(expected);
    });

    it('should compare nested objects by value not reference', function() {
      let actual = { a: 1, b: 2, nested: { aa: 2 } };
      let expected = { a: 1, nested: { aa: 2 } };
      this.expect(actual).to.containPublics(expected);
    });

    it('should ignore private properties', function() {
      let actual = { a: 1, _b: 2, c: 5 };
      let expected = { a: 1, _b: 3 };
      this.expect(actual).to.containPublics(expected);
    });

    it('should ignore functions', function() {
      let actual = { a: 1, b: 2, c: function() { return 1; } };
      let expected = { a: 1, c: function() { return 2; } };
      this.expect(actual).to.containPublics(expected);
    });

    it('should ignore functions on nested object', function() {
      let actual = { a: 1, d: 3, b: { d: 1, c: function() { return 1; }  } };
      let expected = { a: 1, b: { d: 1, c: function() { return 2; } } };
      this.expect(actual).to.containPublics(expected);
    });

    it('should ignore private properties on nested object', function() {
      let actual = { a: 1, b: 2, nested: { aa: 2, _bb: 1 } };
      let expected = { a: 1, nested: { aa: 2, _bb: 2 } };
      this.expect(actual).to.containPublics(expected);
    });

    it('should ignore properties from the given patterns', function() {
      let actual = { a: 1, d: 2, should: 5, b: { c: 1, should: 3, e: 5 } };
      let expected = { a: 1, should: 5, b: { c: 1, should: 4, e: 5 }  };
      this.expect(actual).to.containPublics(expected);
    });

    it('should work with chai negate', function() {
      let actual = { a: 1, _b: 2 };
      let expected = { a: 1, _b: 2, c: 2 };
      this.expect(actual).to.not.containPublics(expected);
    });

    it('should work with chai negate with nested object', function() {
      let actual = { a: 1, b: { c: 1 }, _b: 2 };
      let expected = { a: 1, b: { c: 1, d: 5 }, _b: 2 };
      this.expect(actual).to.not.containPublics(expected);
    });

  });

  describe('with classes', function () {

    it('should equal by their properties', function () {
      this.expect(new ExtendInterSector(2, 1)).to.containPublics(new InterSector(3, 2));
    });

    it('should not equal by their properties', function () {
      this.expect(new ExtendInterSector(2, 2)).to.not.containPublics(new InterSector(3, 2));
    });

    it('should ignore functions', function () {
      this.expect(new OtherInterSector(2, 1)).to.containPublics(new InterSector(3, 2));
    });

  });

});