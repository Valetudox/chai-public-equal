'use strict';

var _ = require('lodash');
var getAllPropertyNames = require('getallpropertynames');

var RejectKeys = function(patterns) {
  this._patterns = patterns;
};

RejectKeys.prototype =  {

  rejectPrivateProperties: function(obj) {
    if (!_.isObject(obj)) return obj;
    if (_.isArray(obj)) return obj.map(function(item) {
      return this.rejectPrivateProperties(item);
    }.bind(this));
    
    var keysToKeep = this._getPublicKeys(obj);
    var objWithoutRejectedKeys = _.pick(obj, keysToKeep);
    return _.reduce(objWithoutRejectedKeys, this._rejectFromObjectProperties.bind(this), {});
  },


  _getPublicKeys: function(obj) {
    return _.reject(getAllPropertyNames(obj), this._hasPrivateKey.bind(this));
  },


  _rejectFromObjectProperties: function(result, value, key) {
    if (_.isArray(value)) {
      result[key] = value.map(function(v) {
        return this.rejectPrivateProperties(v);
      }.bind(this));
    } else if (value !== null && typeof(value) === 'object') {
      result[key] = this.rejectPrivateProperties(value);
    } else if (typeof(value) !== 'function') {
      result[key] = value;
    }
    return result;
  },


  _hasPrivateKey: function(key) {
    return _.some(this._patterns, function(pattern) {
      return pattern.test(key);
    });
  }

};

RejectKeys.create = function(patterns) {
  return new RejectKeys(patterns);
};

module.exports = function(obj, patterns) {
  return RejectKeys.create(patterns).rejectPrivateProperties(obj);
};

