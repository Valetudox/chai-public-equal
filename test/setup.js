'use strict';

let chai = require('chai');
let publicEqual = require('../index')([/^_.+/, /^should/]);

before(function() {
  chai.use(publicEqual);
});

beforeEach(function() {
  this.expect = chai.expect;
});
