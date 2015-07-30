'use strict';

var _ = require('lodash');
var getAllPropertyNames = require('getallpropertynames');

var RejectKeys = function(patterns) {
  this._patterns = patterns;
};

RejectKeys.prototype = {

  rejectPrivateProperties: function(obj) {
    var keysToKeep = this._getPublicKeys(obj);
    var objWithoutRejectedKeys = _.pick(obj, keysToKeep);

    return _.transform(objWithoutRejectedKeys, this._rejectFromObjectProperties.bind(this));
  },


  _getPublicKeys(obj) {
    return _.reject(getAllPropertyNames(obj), this._hasPrivateKey.bind(this));
  },


  _rejectFromObjectProperties: function(result, value, key) {
    if (typeof(value) === 'object') {
      return result[key] = this.rejectPrivateProperties(value);
    }
    if (typeof(value) !== 'function') {
      return result[key] = value;
    }
  },


  _hasPrivateKey(key) {
    return _.some(this._patterns, function(pattern) {
      return pattern.test(key);
    });
  }

};

module.exports = RejectKeys;
