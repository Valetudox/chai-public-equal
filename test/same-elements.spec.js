'use strict';

describe('#sameElements', function() {

  describe('with scalars', function() {

    it('should be true with empty arrays', function() {
      this.expect([]).to.have.sameElements([]);
    });

    it('should be false with different values', function() {
      this.expect([1]).to.not.have.sameElements([2]);
      this.expect([1, 2, '3']).to.not.have.sameElements([1, 2, '4']);
    });

    it('should be true with same reference', function() {
      let array = [1, 2, '3'];
      this.expect(array).to.have.sameElements(array);
    });

    it('should be true with same elements but different reference', function() {
      this.expect([1, 2, '3']).to.have.sameElements([1, 2, '3']);
    });  

    it('should be true with same elements but different ordering', function() {
      this.expect([1, 2, '3']).to.have.sameElements(['3', 1, 2]);
    });

  });

  describe('with objects and arrays', function() {

    it('should be true if the given objects are same but the order is different in the first level', function() {
      this.expect(
        [1, 2, { a: 1, b: 2, c: [1, 2, { h: 5 }] }]
      ).to.have.sameElements(
        [{ a: 1, b: 2, c: [1, 2, { h: 5 }] }, 2, 1]
      );
    });  

    it('should keep strict the ordering after the first level', function() {
      this.expect(
        [1, 2, { a: 1, b: 2, c: [1, 2, { h: 5 }] }]
      ).to.not.have.sameElements(
        [1, 2, { a: 1, b: 2, c: [2, 1, { h: 5 }] }]
      );
    });  

  });

});