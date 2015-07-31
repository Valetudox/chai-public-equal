'use strict';

var chai = require('chai');
var publicEqual = require('../index')([/^_.+/, /^should/]);

before(function() {
  chai.use(publicEqual);
});

beforeEach(function() {
  this.expect = chai.expect;
});
