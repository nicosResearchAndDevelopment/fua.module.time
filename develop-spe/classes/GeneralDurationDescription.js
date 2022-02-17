const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class GeneralDurationDescription extends model.TemporalDuration {

    #hasTRS  = model.Gregorian;
    #days    = null;
    #hours   = null;
    #minutes = null;
    #months  = null;
    #seconds = null;
    #weeks   = null;
    #years   = null;

    constructor(param) {
        super(param);
        const hasTRS = param[util.timeIRI.hasTRS] || param[util.timeURI.hasTRS];
        if (hasTRS) this.#hasTRS = model.TRS.from(hasTRS);
        const days = param[util.timeIRI.days] || param[util.timeURI.days];
        if (days) this.#days = model.decimal.from(days);
        const hours = param[util.timeIRI.hours] || param[util.timeURI.hours];
        if (hours) this.#hours = model.decimal.from(hours);
        const minutes = param[util.timeIRI.minutes] || param[util.timeURI.minutes];
        if (minutes) this.#minutes = model.decimal.from(minutes);
        const months = param[util.timeIRI.months] || param[util.timeURI.months];
        if (months) this.#months = model.decimal.from(months);
        const seconds = param[util.timeIRI.seconds] || param[util.timeURI.seconds];
        if (seconds) this.#seconds = model.decimal.from(seconds);
        const weeks = param[util.timeIRI.weeks] || param[util.timeURI.weeks];
        if (weeks) this.#weeks = model.decimal.from(weeks);
        const years = param[util.timeIRI.years] || param[util.timeURI.years];
        if (years) this.#years = model.decimal.from(years);
    } // GeneralDurationDescription#constructor

    get hasTRS() {
        return this.#hasTRS;
    }

    get days() {
        return this.#days;
    }

    get hours() {
        return this.#hours;
    }

    get minutes() {
        return this.#minutes;
    }

    get months() {
        return this.#months;
    }

    get seconds() {
        return this.#seconds;
    }

    get weeks() {
        return this.#weeks;
    }

    get years() {
        return this.#years;
    }

    toJSON() {
        const result                = super.toJSON();
        result[util.timeIRI.hasTRS] = this.#hasTRS;
        if (this.#hasTRS) result[util.timeIRI.hasTRS] = this.#hasTRS;
        if (this.#days) result[util.timeIRI.days] = this.#days;
        if (this.#hours) result[util.timeIRI.hours] = this.#hours;
        if (this.#minutes) result[util.timeIRI.minutes] = this.#minutes;
        if (this.#months) result[util.timeIRI.months] = this.#months;
        if (this.#seconds) result[util.timeIRI.seconds] = this.#seconds;
        if (this.#weeks) result[util.timeIRI.weeks] = this.#weeks;
        return result;
    } // GeneralDurationDescription#toJSON

} // GeneralDurationDescription

module.exports = GeneralDurationDescription;
