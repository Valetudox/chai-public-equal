'use strict';

var _ = require('lodash');
var getAllPropertyNames = require('getallpropertynames');

module.exports = function(pattern) {
  var rejectKeys = function(obj) {
    var allowedKeys = _.reject(getAllPropertyNames(obj), function(key) {
      return pattern.test(key);
    });

    return _.transform(allowedKeys, function(objWithoutRejectedKeys, key) {
      var value = objWithoutRejectedKeys[key];
      if (typeof(value) === 'object') {
        objWithoutRejectedKeys[key] = rejectKeys(value);
      }
    }, _.pick(obj, allowedKeys));
  };

  return rejectKeys;
};
