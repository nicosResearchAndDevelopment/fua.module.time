const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class GeneralDurationDescription extends model.TemporalDuration {

    #hasTRS  = new model._ObjectProperty(model.TRS, 1, 1, model.Gregorian);
    #days    = new model._DatatypeProperty(model.decimal, 0, 1);
    #hours   = new model._DatatypeProperty(model.decimal, 0, 1);
    #minutes = new model._DatatypeProperty(model.decimal, 0, 1);
    #months  = new model._DatatypeProperty(model.decimal, 0, 1);
    #seconds = new model._DatatypeProperty(model.decimal, 0, 1);
    #weeks   = new model._DatatypeProperty(model.decimal, 0, 1);
    #years   = new model._DatatypeProperty(model.decimal, 0, 1);

    constructor(param) {
        super(param);
        const hasTRS = param[util.timeIRI.hasTRS] || param[util.timeURI.hasTRS];
        if (hasTRS) this.#hasTRS.set(hasTRS);
        const days = param[util.timeIRI.days] || param[util.timeURI.days];
        if (days) this.#days.set(days);
        const hours = param[util.timeIRI.hours] || param[util.timeURI.hours];
        if (hours) this.#hours.set(hours);
        const minutes = param[util.timeIRI.minutes] || param[util.timeURI.minutes];
        if (minutes) this.#minutes.set(minutes);
        const months = param[util.timeIRI.months] || param[util.timeURI.months];
        if (months) this.#months.set(months);
        const seconds = param[util.timeIRI.seconds] || param[util.timeURI.seconds];
        if (seconds) this.#seconds.set(seconds);
        const weeks = param[util.timeIRI.weeks] || param[util.timeURI.weeks];
        if (weeks) this.#weeks.set(weeks);
        const years = param[util.timeIRI.years] || param[util.timeURI.years];
        if (years) this.#years.set(years);
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

    lock() {
        super.lock();
        this.#hasTRS.lock();
        this.#days.lock();
        this.#hours.lock();
        this.#minutes.lock();
        this.#months.lock();
        this.#seconds.lock();
        this.#weeks.lock();
        this.#years.lock();
        return this;
    } // GeneralDurationDescription#lock

    toJSON() {
        const result                = super.toJSON();
        result[util.timeIRI.hasTRS] = this.#hasTRS.toJSON();
        if (!this.#days.empty) result[util.timeIRI.days] = this.#days.toJSON();
        if (!this.#hours.empty) result[util.timeIRI.hours] = this.#hours.toJSON();
        if (!this.#minutes.empty) result[util.timeIRI.minutes] = this.#minutes.toJSON();
        if (!this.#months.empty) result[util.timeIRI.months] = this.#months.toJSON();
        if (!this.#seconds.empty) result[util.timeIRI.seconds] = this.#seconds.toJSON();
        if (!this.#weeks.empty) result[util.timeIRI.weeks] = this.#weeks.toJSON();
        if (!this.#years.empty) result[util.timeIRI.years] = this.#years.toJSON();
        return result;
    } // GeneralDurationDescription#toJSON

} // GeneralDurationDescription

module.exports = GeneralDurationDescription;
