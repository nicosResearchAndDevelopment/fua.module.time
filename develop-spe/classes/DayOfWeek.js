const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DayOfWeek extends model._Class {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for DayOfWeek');
    } // DayOfWeek#constructor

} // DayOfWeek

module.exports = DayOfWeek;
