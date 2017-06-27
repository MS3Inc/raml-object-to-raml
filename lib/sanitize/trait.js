var is                 = require('../utils/is');
var sanitizeResponses  = require('./responses');
var sanitizeParameters = require('./parameters');
var sanitizeSecuredBy  = require('./secured-by');
var sanitizeSelectedAnnotations = require('./selected-annotations');

/**
 * Sanitize a trait-like object.
 *
 * @param  {Object} trait
 * @return {Object}
 */
module.exports = function (trait, context) {
  var obj = {};

  if (is.string(trait.usage)) {
    obj.usage = trait.usage;
  }

  if(context.version == '1.0' && trait.selectedAnnotations && trait.selectedAnnotations.length){
    sanitizeSelectedAnnotations(trait.selectedAnnotations, obj);
  }

  if (is.string(trait.description)) {
    obj.description = trait.description;
  }

  if (is.object(trait.headers)) {
    obj.headers = sanitizeParameters(trait.headers, context);
  }

  if (is.object(trait.queryParameters)) {
    obj.queryParameters = sanitizeParameters(trait.queryParameters, context);
  }

  if (is.object(trait.body)) {
    obj.body = trait.body;
  }

  if (is.object(trait.responses)) {
    obj.responses = sanitizeResponses(trait.responses, context);
  }

  if (is.array(trait.securedBy)) {
    obj.securedBy = sanitizeSecuredBy(trait.securedBy, context);
  }

  return obj;
};
