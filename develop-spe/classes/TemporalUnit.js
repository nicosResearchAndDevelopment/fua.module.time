const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalUnit extends model.TemporalDuration {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for TemporalUnit');
    } // TemporalUnit#constructor

} // TemporalUnit

module.exports = TemporalUnit;
