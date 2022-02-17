const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class GeneralDateTimeDescription extends model.TemporalPosition {

    #dayOfWeek   = null;
    #monthOfYear = null;
    #timeZone    = null;
    #unitType    = null;
    #day         = null;
    #dayOfYear   = null;
    #hour        = null;
    #minute      = null;
    #month       = null;
    #second      = null;
    #week        = null;
    #year        = null;

    constructor(param) {
        super(param);
        const dayOfWeek = param[util.timeIRI.dayOfWeek] || param[util.timeURI.dayOfWeek];
        if (dayOfWeek) this.#dayOfWeek = model.DayOfWeek.from(dayOfWeek);
        const monthOfYear = param[util.timeIRI.monthOfYear] || param[util.timeURI.monthOfYear];
        if (monthOfYear) this.#monthOfYear = model.MonthOfYear.from(monthOfYear);
        const timeZone = param[util.timeIRI.timeZone] || param[util.timeURI.timeZone];
        if (timeZone) this.#timeZone = model.TimeZone.from(timeZone);
        const unitType = param[util.timeIRI.unitType] || param[util.timeURI.unitType];
        if (unitType) this.#unitType = model.TemporalUnit.from(unitType);
        else throw new Error('unitType is mandatory for GeneralDateTimeDescription');
        const day = param[util.timeIRI.day] || param[util.timeURI.day];
        if (day) this.#day = day;
        const dayOfYear = param[util.timeIRI.dayOfYear] || param[util.timeURI.dayOfYear];
        if (dayOfYear) this.#dayOfYear = model.nonNegativeInteger.from(dayOfYear);
        const hour = param[util.timeIRI.hour] || param[util.timeURI.hour];
        if (hour) this.#hour = model.nonNegativeInteger.from(hour);
        const minute = param[util.timeIRI.minute] || param[util.timeURI.minute];
        if (minute) this.#minute = model.nonNegativeInteger.from(minute);
        const month = param[util.timeIRI.month] || param[util.timeURI.month];
        if (month) this.#month = month;
        const second = param[util.timeIRI.second] || param[util.timeURI.second];
        if (second) this.#second = model.decimal.from(second);
        const week = param[util.timeIRI.week] || param[util.timeURI.week];
        if (week) this.#week = model.nonNegativeInteger.from(week);
        const year = param[util.timeIRI.year] || param[util.timeURI.year];
        if (year) this.#year = year;
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

    toJSON() {
        const result = super.toJSON();
        if (this.#dayOfWeek) result[util.timeIRI.dayOfWeek] = this.#dayOfWeek;
        if (this.#monthOfYear) result[util.timeIRI.monthOfYear] = this.#monthOfYear;
        if (this.#timeZone) result[util.timeIRI.timeZone] = this.#timeZone;
        result[util.timeIRI.unitType] = this.#unitType;
        if (this.#day) result[util.timeIRI.day] = this.#day;
        if (this.#dayOfYear) result[util.timeIRI.dayOfYear] = this.#dayOfYear;
        if (this.#hour) result[util.timeIRI.hour] = this.#hour;
        if (this.#minute) result[util.timeIRI.minute] = this.#minute;
        if (this.#month) result[util.timeIRI.month] = this.#month;
        if (this.#second) result[util.timeIRI.second] = this.#second;
        if (this.#week) result[util.timeIRI.week] = this.#week;
        if (this.#year) result[util.timeIRI.year] = this.#year;
        return result;
    } // GeneralDateTimeDescription#toJSON

} // GeneralDateTimeDescription

module.exports = GeneralDateTimeDescription;
