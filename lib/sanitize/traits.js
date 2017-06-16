var sanitizeTrait = require('./trait');
var sanitizeSelectedAnnotations = require('./selected-annotations');

/**
 * Sanitize traits into an array of keyed maps.
 *
 * @param  {Array} traits
 * @return {Array}
 */
module.exports = function (traits, context) {
  var array = [];

  traits.forEach(function (traitMap) {
    Object.keys(traitMap).forEach(function (key) {
      var obj = {};

      obj[key] = sanitizeTrait(traitMap[key], context);

      if(context.version == '1.0' && traitMap[key].selectedAnnotations && traitMap[key].selectedAnnotations.length){
        sanitizeSelectedAnnotations(traitMap[key].selectedAnnotations, obj[key]);
      }

      array.push(obj);
    });
  });


  if (context.version == '1.0') {
    var object = {}
    array.forEach(function(trait) {
      var name = Object.keys(trait)[0]
      object[name] = trait[name];
    }, this);

    return object;
  }

  return array;
};
