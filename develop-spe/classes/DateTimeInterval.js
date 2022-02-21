const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DateTimeInterval extends model.ProperInterval {

    #hasDateTimeDescription = new model._ObjectProperty(model.GeneralDateTimeDescription);

    constructor(param) {
        super(param);
        const hasDateTimeDescription = param[util.timeIRI.hasDateTimeDescription] || param[util.timeURI.hasDateTimeDescription];
        if (hasDateTimeDescription) this.#hasDateTimeDescription.set(hasDateTimeDescription);
    } // DateTimeInterval#constructor

    get hasDateTimeDescription() {
        return this.#hasDateTimeDescription;
    }

    lock() {
        super.lock();
        this.#hasDateTimeDescription.lock();
        return this;
    } // DateTimeInterval#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#hasDateTimeDescription.empty) result[util.timeIRI.hasDateTimeDescription] = this.#hasDateTimeDescription.toJSON();
        return result;
    } // DateTimeInterval#toJSON

} // DateTimeInterval

module.exports = DateTimeInterval;
