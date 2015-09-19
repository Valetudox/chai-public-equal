'use strict';

let _ = require('lodash');
let getAllPropertyNames = require('getallpropertynames');

class RejectKeys {

  constructor(patterns) {
    this._patterns = patterns;  
  }

  rejectPrivateProperties(obj) {
    if (!_.isObject(obj)) return obj;
    if (_.isArray(obj)) return obj.map((item) => this.rejectPrivateProperties(item));
    
    let keysToKeep = this._getPublicKeys(obj);
    let objWithoutRejectedKeys = _.pick(obj, keysToKeep);
    return _.reduce(objWithoutRejectedKeys, this._rejectFromObjectProperties.bind(this), {});
  }


  _getPublicKeys(obj) {
    return _.reject(getAllPropertyNames(obj), this._hasPrivateKey.bind(this));
  }


  _rejectFromObjectProperties(result, value, key) {
    if (_.isArray(value)) {
      result[key] = value.map((v) => this.rejectPrivateProperties(value))
    } else if (value !== null && typeof(value) === 'object') {
      result[key] = this.rejectPrivateProperties(value);
    } else if (typeof(value) !== 'function') {
      result[key] = value;
    }
    return result;
  }


  _hasPrivateKey(key) {
    return _.some(this._patterns, (pattern) => pattern.test(key));
  }


  static Create(patterns) {
    return new RejectKeys(patterns);
  }

};

module.exports = (obj, patterns) => RejectKeys.Create(patterns).rejectPrivateProperties(obj);

