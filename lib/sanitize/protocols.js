var is = require('../utils/is');

/**
 * Sanitize protocols.
 *
 * @param  {Array} protocols
 * @return {Array}
 */
module.exports = function (protocols, context) {
    return protocols.filter(function (value) {
        return is.string(value) && ~['HTTP', 'HTTPS'].indexOf(value);
    });
}
