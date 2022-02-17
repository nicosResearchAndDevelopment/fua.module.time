const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TimeZone extends model._Class {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for TimeZone');
    } // TimeZone#constructor

} // TimeZone

module.exports = TimeZone;
