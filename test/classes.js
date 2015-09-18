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

class ExtendInterSector extends InterSector {

  constructor(a, b) {
    super(a, b);
  }


  get divide() {
    return this._a;
  }

}

class OtherInterSector extends InterSector {

  constructor(a, b) {
    super(a, b);
  }

  a() { return this._b; }

}
class ExtendInterSectorWithExtraFunction extends ExtendInterSector {

  constructor(a, b) {
    super(a, b);
  }

  a() { return this._b; }

}

module.exports = { InterSector, ExtendInterSector, OtherInterSector, ExtendInterSectorWithExtraFunction };