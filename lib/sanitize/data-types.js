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

  function parsePrimitive(parseDataType, dataType, params) {
    if (params) {
      params.name = dataType.name
    }
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

    if (is.string(dataType.default)) {
      parseDataType.default = dataType.default;
    }

    if (is.string(dataType.exmaple)) {
      parseDataType.exmaple = dataType.exmaple;
    }

    if (is.string(dataType.pattern)) {
      parseDataType.pattern = dataType.pattern;
    }

    if (is.array(dataType.enum)) {
      parseDataType.enum = dataType.enum;
    }

    if (is.array(dataType.fileTypes)) {
      parseDataType.fileTypes = dataType.fileTypes;
    }
    return parseDataType;
  }

  function getNestedRoot (obj) {
    if(obj.items) {
      return getNestedRoot(obj.items)
    } else {
      return obj;
    }
  }

  function parseTypeArray (parsedData, data, params) {
    parsedData.type = data.type;
    parsedData.uniqueItems = data.uniqueItems ? true : false;
    if (is.number(data.minItems)) {
      parsedData.minItems = data.minItems;
    }
    if (is.number(data.maxItems)) {
      parsedData.maxItems = data.maxItems;
    }
    parsedData.items = {};
    if (data.type != 'array') {
      parsedData.type = 'array'
      parsePrimitive(parsedData.items, data.items, params);
    } else {
      parseTypeArray(parsedData.items, data.items, params)
    }
  }

  for(var i=0, length = dataTypes.length; i < length; i++) {
    var dataType = dataTypes[i]
    var typeName = dataType.name;
    var parseDataType = {};

    if (dataType.type == 'array') {
      parseDataType.type = dataType.type;
      parseDataType.uniqueItems = dataType.uniqueItems ? true : false;
      if (is.number(dataType.minItems)) {
        parseDataType.minItems = dataType.minItems;
      }
      if (is.number(dataType.maxItems)) {
        parseDataType.maxItems = dataType.maxItems;
      }
      parseDataType.items = {};
      var params = {};
      parseTypeArray(parseDataType.items, dataType.items, params);
      obj[params.name] = parseDataType;
    } else {
      parsePrimitive(parseDataType, dataType);
      obj[typeName] = parseDataType;
    }
  }

  return obj;
};
