var is                 = require('../utils/is');
var sanitizeResponses  = require('./responses');
var sanitizeParameters = require('./parameters');
var sanitizeSecuredBy  = require('./secured-by');

/**
 * Sanitize a dataTypes-like object.
 *
 * @param  {Object} dataTypes
 * @return {Object}
 */

module.exports = function (dataTypes, context) {
  var obj = {};
  for(var i=0, length = dataTypes.length; i < length; i++) {
    var dataType = dataTypes[i]
    var typeName = dataType.name;

    delete dataType.name
    obj[typeName] = dataType;
  }
  return obj;
};
