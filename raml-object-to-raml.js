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
  if (!context || !context.version) {
     var context = {}
     context.version = "0.8";
  }
  return '#%RAML ' + context.version + '\n' + stringify(sanitize(obj, context));
};
