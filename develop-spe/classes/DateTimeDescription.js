const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DateTimeDescription extends model.GeneralDateTimeDescription {

    #day   = new model._DatatypeProperty(model.gDay, 0, 1);
    #month = new model._DatatypeProperty(model.gMonth, 0, 1);
    #year  = new model._DatatypeProperty(model.gYear, 0, 1);

    constructor(param) {
        super(param);
        const hasTRS = super.hasTRS.get();
        if (!model.Gregorian.equals(hasTRS))
            throw new Error('hasTRS must be Gregorian for DateTimeDescription');
        if (hasTRS !== model.Gregorian) super.hasTRS.set(model.Gregorian);
        super.hasTRS.lock();
        const day = param[util.timeIRI.day] || param[util.timeURI.day];
        if (day) this.#day.set(day);
        const month = param[util.timeIRI.month] || param[util.timeURI.month];
        if (month) this.#month.set(month);
        const year = param[util.timeIRI.year] || param[util.timeURI.year];
        if (year) this.#year.set(year);
    } // TemporalPosition#constructor

    get day() {
        return this.#day;
    }

    get month() {
        return this.#month;
    }

    get year() {
        return this.#year;
    }

    lock() {
        super.lock();
        this.#day.lock();
        this.#month.lock();
        this.#year.lock();
        return this;
    } // TemporalPosition#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#day.empty) result[util.timeIRI.day] = this.#day.toJSON();
        if (!this.#month.empty) result[util.timeIRI.month] = this.#month.toJSON();
        if (!this.#year.empty) result[util.timeIRI.year] = this.#year.toJSON();
        return result;
    } // TemporalPosition#toJSON

} // DateTimeDescription

module.exports = DateTimeDescription;
