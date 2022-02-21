const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TimeZone extends model._Object {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for TimeZone');
    } // TimeZone#constructor

    equals(other) {
        return (other instanceof TimeZone) && (this === other || this.id === other.id);
    } // TimeZone#equals

} // TimeZone

module.exports = TimeZone;
