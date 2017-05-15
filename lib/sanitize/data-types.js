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
module.exports = function (dataTypes) {
  var obj = {};

  for(var i=0, length = dataTypes.length; i < length; i++) {
    var dataType = dataTypes[i]
    var typeName = dataType.name;
    var parseDataType = {};

    if (is.string(dataType.type)) {
      parseDataType.type = dataType.type;
    }

    if (is.string(dataType.description)) {
      parseDataType.description = dataType.description;
    }

    if (is.string(dataType.format)) {
      parseDataType.format = dataType.format;
    }

    if (is.number(dataType.minLength)) {
      parseDataType.minLength = dataType.minLength;
    }

    if (is.number(dataType.maxLength)) {
      parseDataType.maxLength = dataType.maxLength;
    }

    if (is.number(dataType.minimum)) {
      parseDataType.minimum = dataType.minimum;
    }

    if (is.number(dataType.maximum)) {
      parseDataType.maximum = dataType.maximum;
    }

    if (is.array(dataType.enum)) {
      parseDataType.enum = dataType.enum;
    }

    if (is.array(dataType.fileTypes)) {
      parseDataType.fileTypes = dataType.fileTypes;
    }

    obj[typeName] = parseDataType;
  }

  return obj;
};
