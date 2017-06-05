var extend             = require('xtend/mutable');
var is                 = require('../utils/is');
var sanitizeTrait      = require('./trait');
var sanitizeParameters = require('./parameters');
var sanitizeSecuredBy       = require('./secured-by');
var sanitizeSelectedAnnotations = require('./selected-annotations');

/**
 * Sanitize a method into RAML structure for stringification.
 *
 * @param  {Object} method
 * @return {Object}
 */
var sanitizeMethods = function (methods) {
  var obj = {};

  methods.forEach(function (method) {
    var child = obj[method.method.toLowerCase()] = {};

    if (is.array(method.is)) {
      child.is = method.is;
    }

    extend(child, sanitizeTrait(method));
  });

  return obj;
};

/**
 * Sanitize the resources array to the correct RAML structure.
 *
 * @param  {Array}  resources
 * @return {Object}
 */
module.exports = function sanitizeResources (resources, context) {
  var obj = {};

  resources.forEach(function (resource) {
    var child = obj;

    if (resource.relativeUri) {
      child = obj[resource.relativeUri] = obj[resource.relativeUri] || {};
    }

    if(context.version == '1.0' && resource.selectedAnnotations && resource.selectedAnnotations.length){
      sanitizeSelectedAnnotations(resource.selectedAnnotations, child);
    }

    if (is.string(resource.displayName)) {
      child.displayName = resource.displayName;
    }

    if (is.string(resource.type) || is.object(resource.type)) {
      child.type = resource.type;
    }

    if (is.array(resource.securedBy)) {
      child.securedBy = sanitizeSecuredBy(resource.securedBy, context);
    }

    if (is.array(resource.is)) {
      child.is = resource.is;
    }

    if (is.string(resource.description)) {
      child.description = resource.description;
    }

    if (resource.uriParameters) {
      child.uriParameters = sanitizeParameters(resource.uriParameters, context);
    }

    if (is.array(resource.methods)) {
      extend(child, sanitizeMethods(resource.methods, context));
    }

    if (is.array(resource.resources)) {
      extend(child, sanitizeResources(resource.resources, context));
    }
  });

  return obj;
};
