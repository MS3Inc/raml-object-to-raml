var sanitizeSelectedAnnotations = require('./selected-annotations');
/**
 * Sanitize the responses object.
 *
 * @param  {Object} responses
 * @return {Object}
 */
module.exports = function (responses, context) {
  var obj = {};

  Object.keys(responses).forEach(function (code) {
    if (!/^\d{3}$/.test(code)) {
      return;
    }

    obj[code] = responses[code];

    if(context.version == '1.0' && responses[code].selectedAnnotations && responses[code].selectedAnnotations.length){
      sanitizeSelectedAnnotations(responses[code].selectedAnnotations, obj[code]);
    }
    delete obj[code].selectedAnnotations;
    if (responses[code].body && Object.keys(responses[code].body) && Object.keys(responses[code].body).length) {
      var bodyKey = Object.keys(responses[code].body)[0];
      if (context.version == '1.0' && responses[code].body[bodyKey].selectedAnnotations && responses[code].body[bodyKey].selectedAnnotations.length) {
        sanitizeSelectedAnnotations(responses[code].body[bodyKey].selectedAnnotations, obj[code].body[bodyKey]);
      }
      delete obj[code].body[bodyKey].selectedAnnotations;
    }
  });

  return obj;
};
