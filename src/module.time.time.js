const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

class Time {

    #trs = '';

    constructor(trs = 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian') {
        _.assert(_.isString(trs), 'expected trs to be a string');
        this.#trs = trs;
    } // Time#constructor

    // TODO methods

} // Time

module.exports = Time;
