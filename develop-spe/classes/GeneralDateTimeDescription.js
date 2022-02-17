const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class GeneralDateTimeDescription extends model.TemporalPosition {

    // #dayOfWeek = null;

    constructor(param) {
        super(param);
        // const dayOfWeek = param[util.timeIRI.dayOfWeek] || param[util.timeURI.dayOfWeek];
        // if (dayOfWeek) this.#dayOfWeek = model.decimal.from(dayOfWeek);
    } // GeneralDateTimeDescription#constructor

} // GeneralDateTimeDescription

module.exports = GeneralDateTimeDescription;
