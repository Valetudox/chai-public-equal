'use strict';

class InterSector {

  constructor(a, b) {
    this._a = a;
    this._b = b;
  }

  get intersection() {
    return this._a - this._b;
  }

  a() { return this._a; }

}

class OtherInterSector extends InterSector {

  constructor(a, b) {
    super(a, b);
  }

  a() { return this._b; }

}

describe('Chai Public Equal', function() {

  describe('with classes', function() {

    it('should equal by their properties', function() {
      this.expect(new InterSector(2, 1)).to.publicEql(new InterSector(3, 2));
    });

    it('should not equal by their properties', function() {
      this.expect(new InterSector(2, 2)).to.not.publicEql(new InterSector(3, 2));
    });

    it('should ignore functions', function() {
      this.expect(new InterSector(2, 1)).to.publicEql(new OtherInterSector(3, 2));
    });

  });

});
