const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DateTimeDescription extends model.GeneralDateTimeDescription {

    #day   = null;
    #month = null;
    #year  = null;

    constructor(param) {
        super(param);
        const hasTRS = super.hasTRS.get();
        if (hasTRS !== model.Gregorian && hasTRS.id !== model.Gregorian.id)
            throw new Error('hasTRS must be Gregorian for DateTimeDescription');
        const day = param[util.timeIRI.day] || param[util.timeURI.day];
        if (day) this.#day = model.gDay.from(day);
        const month = param[util.timeIRI.month] || param[util.timeURI.month];
        if (month) this.#month = model.gMonth.from(month);
        const year = param[util.timeIRI.year] || param[util.timeURI.year];
        if (year) this.#year = model.gYear.from(year);
    } // TemporalPosition#constructor

    get hasTRS() {
        return model.Gregorian;
    }

    get day() {
        return this.#day;
    }

    get month() {
        return this.#month;
    }

    get year() {
        return this.#year;
    }

    toJSON() {
        const result                = super.toJSON();
        result[util.timeIRI.hasTRS] = model.Gregorian;
        if (this.#day) result[util.timeIRI.day] = this.#day;
        if (this.#month) result[util.timeIRI.month] = this.#month;
        if (this.#year) result[util.timeIRI.year] = this.#year;
        return result;
    } // TemporalPosition#toJSON

} // DateTimeDescription

module.exports = DateTimeDescription;
