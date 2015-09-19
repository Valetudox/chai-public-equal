'use strict';

describe('#publicEql', function() {  

  describe('With simple objects', function() {

    it('should equal by their properties', function() {
      this.expect({ a: 1, c: null }).to.publicEql({ c: null, a: 1 });
      this.expect({ a: 1, c: null }).to.not.publicEql({ a: 1, c: 2 });
    });

    it('should ignore private properties', function() {
      this.expect(
        { a: 1, _b: 2 }
      ).to.publicEql(
        { a: 1, _b: 3 }
      );
    });

    it('should ignore the properties which are based on the given pattenrs', function() {
      this.expect(
        { a: 1, should: 2 }
      ).to.publicEql(
        { a: 1, should: 3 }
      );
    });

    it('should match all the property', function() {
      this.expect(
        { a: 1, b: 2, c: 3 }
      ).to.not.publicEql(
        { a: 1, b: 2 }
      );
      this.expect(
        { a: 1, b: 2 }
      ).to.not.publicEql(
        { a: 1, b: 2, c: 3 }
      );
    });

    it('should ignore functions', function() {
      this.expect(
        { a: 1, c: function() { return 1; } }
      ).to.publicEql(
        { a: 1, c: function() { return 2; } }
      );      
    });

  });

  describe('With nested objects', function() {

    it('should compare by value not reference', function() {
      this.expect(
        { a: 1, nested: { aa: 2 } }
      ).to.publicEql(
        { a: 1, nested: { aa: 2 } }
      );
      this.expect(
        { a: 1, nested: { aa: 1 } }
      ).to.not.publicEql(
        { a: 1, nested: { aa: 2 } }
      );
    });

    it('should ignore private properties on nested object', function() {
      this.expect(
        { a: 1, nested: { aa: 2, _bb: 1 } }
      ).to.publicEql(
        { a: 1, nested: { aa: 2, _bb: 2 } }
      );
    });

    it('should match all the property on nested object', function() {
      this.expect(
        { a: 1, b: 2, c: { d: 1, h: 2 } }
      ).to.not.publicEql(
        { a: 1, b: 2, c: { d: 1 } }
      );
      this.expect(
        { a: 1, b: 2, c: { d: 1 } }
      ).to.not.publicEql(
        { a: 1, b: 2, c: { d: 1, h: 2 } }
      );
    });

    it('should ignore functions on nested object', function() {      
      this.expect(
        { a: 1, b: { d: 1, c: function() { return 1; }  } }
      ).to.publicEql(
        { a: 1, b: { d: 1, c: function() { return 2; } } }
      );
    });

    it('should work with nested arrays full of scalars', function() {
      this.expect(
        { a: 1, d: [1, 2] }
      ).to.publicEql(
        { a: 1, d: [1 ,2] }
      );
      this.expect(
        { a: 1, d: [1, 2, 3] }
      ).to.not.publicEql(
        { a: 1, d: [1 ,2] }
      );
      this.expect(
        { a: 1, d: [1, 2] }
      ).to.not.publicEql(
        { a: 1, d: [1 ,2, 3] }
      );
    });

    it('should work with nested arrays full of objects', function() {
      this.expect(
        { a: 1, d: [{ e: 'a', _g: 4 }] }
      ).to.publicEql(
        { a: 1, d: [{ e: 'a', _p: 4 }] }
      );
      this.expect(
        { a: 1, d: [{ e: 'a' }] }
      ).to.not.publicEql(
        { a: 1, d: [{ e: 'b' }] }
      );
    });    

  });

  describe('with arrays', function() {

    it('should work with arrays full of scalars', function() {
      this.expect(
        [2, 1]
      ).to.publicEql(
        [2, 1]
      );      
      this.expect(
        [3]
      ).to.not.publicEql(
        [4]
      );
    });

    it('should work with arrays full of objects', function() {
      this.expect(
        [{ a: 1, _b: 2 }, { c: 1 }]
      ).to.publicEql(
        [{ a: 1, _b: 3 }, { c: 1 }]
      );
      this.expect(
        [{ a: 1, _b: 2 }]
      ).to.not.publicEql(
        [{ a: 2, _b: 3 }]
      );
    });

    it('should not ignore the order', function() {
      this.expect(
        [2, 1]
      ).to.not.publicEql(
        [1, 2]
      );
      this.expect(
        [{ a: 1 }, { b: 2 }]
      ).not.to.publicEql(
        [{ b: 2 }, { a: 1 }]
      );
    });

  });

  describe('with classes', function () {

    let InterSector = require('./classes').InterSector;
    let ExtendInterSector = require('./classes').ExtendInterSector;
    let OtherInterSector = require('./classes').OtherInterSector;
    let ExtendInterSectorWithExtraFunction = require('./classes').ExtendInterSectorWithExtraFunction;

    it('should equal by their properties', function () {
      this.expect(new InterSector(2, 1)).to.publicEql(new InterSector(3, 2));
      this.expect(new InterSector(2, 1)).to.publicEql({ intersection: 1 });
      this.expect(new InterSector(2, 2)).to.not.publicEql(new InterSector(3, 2));
      this.expect(new InterSector(2, 1)).to.not.publicEql({ intersection: 2 });
    });

    it('should ignore functions', function () {
      this.expect(new InterSector(2, 1)).to.publicEql(new OtherInterSector(3, 2));
    });

  });

});  

