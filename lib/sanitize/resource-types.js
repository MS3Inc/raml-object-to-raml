var is            = require('../utils/is');
var sanitizeTrait = require('./trait');
var sanitizeSelectedAnnotations = require('./selected-annotations')

/**
 * Escape characters used inside a method name for the regexp.
 *
 * @param  {String} str
 * @return {String}
 */
var escape = function (str) {
  return str.replace(/([\-])/g, '\\$1');
};

/**
 * Check if the key is potentially a method name.
 *
 * @type {RegExp}
 */
var METHOD_KEY_REGEXP = /^(?:GET|HEAD|POST|PUT|PATCH|DELETE|OPTIONS)\??$/i;

/**
 * Sanitize resource types suitable for RAML.
 *
 * @param  {Array} resourceTypes
 * @return {Array}
 */
module.exports = function (resourceTypes, context) {
  var array = [];

  resourceTypes.forEach(function (resourceTypeMap) {
    Object.keys(resourceTypeMap).forEach(function (type) {
      var obj          = {};
      var child        = obj[type] = {};
      var resourceType = resourceTypeMap[type];

      if(context.version == '1.0' && resourceType.selectedAnnotations && resourceType.selectedAnnotations.length){
        sanitizeSelectedAnnotations(resourceType.selectedAnnotations, child);
      }

      Object.keys(resourceType).forEach(function (key) {
        var value = resourceType[key];
        var keys  = ['type', 'usage', 'description'];

        if (METHOD_KEY_REGEXP.test(key)) {
          child[key] = value == null ? value : sanitizeTrait(value, context);
        }

        // Allow usage and description strings alongside methods.
        if (~keys.indexOf(key) && is.string(value)) {
          child[key] = value;
        }
      });

      array.push(obj);
    });
  });

  if (context.version == '1.0') {
    var object = {}
    array.forEach(function(rt) {
      var name = Object.keys(rt)[0]
      object[name] = rt[name];
    }, this);

    return object;
  }

  return array;
};
