'use strict';

var _ = require('lodash');
var getAllPropertyNames = require('getallpropertynames');

var pickPublicKeys = function(obj) {
  var publicKeys = _.reject(getAllPropertyNames(obj), function(key) {
    return  _.startsWith(key, '_')
  });

  var objWithoutPublicKeys = _.pick(obj, publicKeys);

  publicKeys.forEach(function(key) {
    let value = objWithoutPublicKeys[key];
    if (typeof(value) === 'object') {
      objWithoutPublicKeys[key] = pickPublicKeys(value);
    }
  });

  return objWithoutPublicKeys;
};

module.exports = pickPublicKeys;
