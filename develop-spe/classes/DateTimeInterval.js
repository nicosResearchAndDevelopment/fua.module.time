const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DateTimeInterval extends model.ProperInterval {

    #hasDateTimeDescription = null;

    constructor(param) {
        super(param);
        const hasDateTimeDescription = param[util.timeIRI.hasDateTimeDescription] || param[util.timeURI.hasDateTimeDescription];
        if (hasDateTimeDescription) this.#hasDateTimeDescription = model.GeneralDateTimeDescription.from(hasDateTimeDescription);
    } // DateTimeInterval#constructor

    get hasDateTimeDescription() {
        return this.#hasDateTimeDescription;
    }

    toJSON() {
        const result = super.toJSON();
        if (this.#hasDateTimeDescription) result[util.timeIRI.hasDateTimeDescription] = this.#hasDateTimeDescription;
        return result;
    } // DateTimeInterval#toJSON

} // DateTimeInterval

module.exports = DateTimeInterval;
