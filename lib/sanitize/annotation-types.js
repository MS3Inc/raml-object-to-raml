
/**
 * Sanitize a annotationTypes-like object.
 *
 * @param  {Object} annotationTypes
 * @return {Object}
 */

module.exports = function (annotationTypes, context) {
  var obj = {};
  for(var i=0, length = annotationTypes.length; i < length; i++) {
    var annotationType = annotationTypes[i]
    var typeName = annotationType.name;

    delete annotationType.name;
    obj[typeName] = annotationType;
  }
  return obj;
};
