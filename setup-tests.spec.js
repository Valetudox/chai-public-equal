'use strict';

var chai = require('chai');
var publicEqual = require('./index');

before(function() {
  chai.use(publicEqual);
});

beforeEach(function() {
  this.expect = chai.expect;
});
