var sanitize  = require('./lib/sanitize');
var stringify = require('./lib/stringify');

/**
 * Transform a RAML object into a RAML string.
 *
 * @param  {Object} obj
 * @param {String} param
 * @return {String}
 */
module.exports = function (obj, context) {
  if (!context) {
    var context = {}
    context.version = "0.8";
    return '#%RAML 0.8\n' + stringify(sanitize(obj, context));
  } else if (context && context.version == '1.0') {
      return '#%RAML 1.0\n' + stringify(sanitize(obj, context));
  }
};
