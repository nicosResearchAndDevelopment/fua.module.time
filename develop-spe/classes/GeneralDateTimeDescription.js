const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class GeneralDateTimeDescription extends model.TemporalPosition {

    #dayOfWeek   = new model._ObjectProperty(model.DayOfWeek, 0, 1);
    #monthOfYear = new model._ObjectProperty(model.MonthOfYear, 0, 1);
    #timeZone    = new model._ObjectProperty(model.TimeZone, 0, 1);
    #unitType    = new model._ObjectProperty(model.TemporalUnit, 1, 1);
    #day         = new model._DatatypeProperty(null, 0, 1);
    #dayOfYear   = new model._DatatypeProperty(model.nonNegativeInteger, 0, 1);
    #hour        = new model._DatatypeProperty(model.nonNegativeInteger, 0, 1);
    #minute      = new model._DatatypeProperty(model.nonNegativeInteger, 0, 1);
    #month       = new model._DatatypeProperty(null, 0, 1);
    #second      = new model._DatatypeProperty(model.decimal, 0, 1);
    #week        = new model._DatatypeProperty(model.nonNegativeInteger, 0, 1);
    #year        = new model._DatatypeProperty(null, 0, 1);

    constructor(param) {
        super(param);
        const dayOfWeek = param[util.timeIRI.dayOfWeek] || param[util.timeURI.dayOfWeek];
        if (dayOfWeek) this.#dayOfWeek.set(dayOfWeek);
        const monthOfYear = param[util.timeIRI.monthOfYear] || param[util.timeURI.monthOfYear];
        if (monthOfYear) this.#monthOfYear.set(monthOfYear);
        const timeZone = param[util.timeIRI.timeZone] || param[util.timeURI.timeZone];
        if (timeZone) this.#timeZone.set(timeZone);
        const unitType = param[util.timeIRI.unitType] || param[util.timeURI.unitType];
        if (unitType) this.#unitType.set(unitType);
        else throw new Error('unitType is mandatory for GeneralDateTimeDescription');
        const day = param[util.timeIRI.day] || param[util.timeURI.day];
        if (day) this.#day.set(day);
        const dayOfYear = param[util.timeIRI.dayOfYear] || param[util.timeURI.dayOfYear];
        if (dayOfYear) this.#dayOfYear.set(dayOfYear);
        const hour = param[util.timeIRI.hour] || param[util.timeURI.hour];
        if (hour) this.#hour.set(hour);
        const minute = param[util.timeIRI.minute] || param[util.timeURI.minute];
        if (minute) this.#minute.set(minute);
        const month = param[util.timeIRI.month] || param[util.timeURI.month];
        if (month) this.#month.set(month);
        const second = param[util.timeIRI.second] || param[util.timeURI.second];
        if (second) this.#second.set(second);
        const week = param[util.timeIRI.week] || param[util.timeURI.week];
        if (week) this.#week.set(week);
        const year = param[util.timeIRI.year] || param[util.timeURI.year];
        if (year) this.#year.set(year);
    } // GeneralDateTimeDescription#constructor

    get dayOfWeek() {
        return this.#dayOfWeek;
    }

    get monthOfYear() {
        return this.#monthOfYear;
    }

    get timeZone() {
        return this.#timeZone;
    }

    get unitType() {
        return this.#unitType;
    }

    get day() {
        return this.#day;
    }

    get dayOfYear() {
        return this.#dayOfYear;
    }

    get hour() {
        return this.#hour;
    }

    get minute() {
        return this.#minute;
    }

    get month() {
        return this.#month;
    }

    get second() {
        return this.#second;
    }

    get week() {
        return this.#week;
    }

    get year() {
        return this.#year;
    }

    lock() {
        super.lock();
        this.#dayOfWeek.lock();
        this.#monthOfYear.lock();
        this.#timeZone.lock();
        this.#unitType.lock();
        this.#day.lock();
        this.#dayOfYear.lock();
        this.#hour.lock();
        this.#minute.lock();
        this.#month.lock();
        this.#second.lock();
        this.#week.lock();
        this.#year.lock();
        return this;
    } // GeneralDateTimeDescription#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#dayOfWeek.empty) result[util.timeIRI.dayOfWeek] = this.#dayOfWeek.toJSON();
        if (!this.#monthOfYear.empty) result[util.timeIRI.monthOfYear] = this.#monthOfYear.toJSON();
        if (!this.#timeZone.empty) result[util.timeIRI.timeZone] = this.#timeZone.toJSON();
        result[util.timeIRI.unitType] = this.#unitType.toJSON();
        if (!this.#day.empty) result[util.timeIRI.day] = this.#day.toJSON();
        if (!this.#dayOfYear.empty) result[util.timeIRI.dayOfYear] = this.#dayOfYear.toJSON();
        if (!this.#hour.empty) result[util.timeIRI.hour] = this.#hour.toJSON();
        if (!this.#minute.empty) result[util.timeIRI.minute] = this.#minute.toJSON();
        if (!this.#month.empty) result[util.timeIRI.month] = this.#month.toJSON();
        if (!this.#second.empty) result[util.timeIRI.second] = this.#second.toJSON();
        if (!this.#week.empty) result[util.timeIRI.week] = this.#week.toJSON();
        if (!this.#year.empty) result[util.timeIRI.year] = this.#year.toJSON();
        return result;
    } // GeneralDateTimeDescription#toJSON

} // GeneralDateTimeDescription

module.exports = GeneralDateTimeDescription;
