/**
 * Sanitize a annotationTypes-like object.
 *
 * @param  {Object} annotationTypes
 * @return {Object}
 */

module.exports = function (annotationTypes, target) {
  annotationTypes.forEach(function(type) {
      var name = '('+ Object.keys(type)[0] + ')';
      target[name] = type[Object.keys(type)[0]];
  }, this);
};
