'use strict';

describe('#containPublics', function() {

  describe('With simple objects', function() {

    it('should equal by their properties', function() {
      this.expect({ a: 1 }).to.containPublics({ a: 1 });
      this.expect({ a: 1, c: null }).to.containPublics({ a: 1 });
      this.expect({ a: 1 }).to.not.containPublics({ a: 1, c: null });
      this.expect({ a: 1 }).to.not.containPublics({ a: 2 });
    });

    it('should ignore private properties', function() {
      this.expect(
        { a: 1, _b: 2, c: 4 }
      ).to.containPublics(
        { a: 1, _b: 3 }
      );
    });

    it('should ignore the properties which are based on the given pattenrs', function() {
      this.expect(
        { a: 1, should: 2, c: 4 }
      ).to.containPublics(
        { a: 1, should: 3 }
      );
    });

    it('should ignore functions', function() {
      this.expect(
        { a: 1, b: 3, c: function() { return 1; } }
      ).to.containPublics(
        { a: 1, c: function() { return 2; } }
      );      
    });

  });

  describe('With nested objects', function() {

    it('should compare by value not reference', function() {
      this.expect(
        { a: 1, nested: { aa: 2, bb: 2 } }
      ).to.containPublics(
        { a: 1, nested: { aa: 2 } }
      );
      this.expect(
        { a: 1, nested: { aa: 1 } }
      ).to.not.containPublics(
        { a: 1, nested: { aa: 2 } }
      );
      this.expect(
        { a: 1, nested: { aa: 2 } }
      ).to.not.containPublics(
        { a: 1, nested: { aa: 2, bb: 2 } }
      );
    });

    it('should ignore private properties on nested object', function() {
      this.expect(
        { a: 1, nested: { aa: 2, _bb: 1, cc: 3 } }
      ).to.containPublics(
        { a: 1, nested: { aa: 2, _bb: 2 } }
      );
    });

    it('should ignore functions on nested object', function() {      
      this.expect(
        { a: 1, b: { d: 1, c: function() { return 1; }  } }
      ).to.containPublics(
        { a: 1, b: { d: 1, c: function() { return 2; } } }
      );
    });

    it('should work with nested arrays full of scalars', function() {
      this.expect(
        { a: 1, d: [1, 2] }
      ).to.containPublics(
        { a: 1, d: [1 ,2] }
      );
      this.expect(
        { a: 1, d: [1, 2, 3] }
      ).to.containPublics(
        { a: 1, d: [1 ,2] }
      );
      this.expect(
        { a: 1, d: [1, 2] }
      ).to.not.containPublics(
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
      ).to.not.containPublics(
        { a: 1, d: [{ e: 'b' }] }
      );
    });    

  });

  describe('with arrays', function() {

    describe('full of scalars', function() {

      it('should check for contains', function() {
        this.expect(
          [2, 1, 3]
        ).to.containPublics(
          [2, 1]
        );      
        this.expect(
          [2, 1]
        ).to.not.containPublics(
          [2, 1, 3]
        );      
      });

      it.skip('should ignore the order', function() {
        this.expect(
          [2, 1, 3]
        ).to.containPublics(
          [3, 1]
        );      
      });

    });

  });

  describe('with classes', function () {

    let InterSector = require('./classes').InterSector;
    let ExtendInterSector = require('./classes').ExtendInterSector;
    let OtherInterSector = require('./classes').OtherInterSector;
    let ExtendInterSectorWithExtraFunction = require('./classes').ExtendInterSectorWithExtraFunction;

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