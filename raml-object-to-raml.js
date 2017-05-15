var sanitize  = require('./lib/sanitize');
var stringify = require('./lib/stringify');

/**
 * Transform a RAML object into a RAML string.
 *
 * @param  {Object} obj
 * @param {String} param
 * @return {String}
 */
module.exports = function (obj, param) {
  if (param) {
    return '#%RAML 1.0\n' + stringify(sanitize(obj, param));
  }
  return '#%RAML 0.8\n' + stringify(sanitize(obj));
};
