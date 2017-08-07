var is = require('../utils/is');
var sanitizeSelectedAnnotations = require('./selected-annotations');

/**
 * Sanitize documentation for RAML.
 *
 * @param  {Array} documentation
 * @return {Array}
 */
module.exports = function (documentation, context) {
  return documentation.filter(function (document) {
    return is.string(document.title) && is.string(document.content);
  }).map(function (document) {
    var doc = {
      title:   document.title,
      content: document.content
    }
    if(context.version == '1.0' && document.selectedAnnotations && document.selectedAnnotations.length){
      sanitizeSelectedAnnotations(document.selectedAnnotations, doc);
    }
    return doc;
  });
};
