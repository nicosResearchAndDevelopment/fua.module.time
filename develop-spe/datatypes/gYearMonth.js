const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class gYearMonth extends model._Datatype {

    #year   = 1970;
    #month  = 1;
    #hour   = 0;
    #minute = 0;

    constructor(param) {
        super(param);
        const [match, YYYY, MM, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected value to be an ' + util.xsdIRI.gYearMonth);

        this.#year  = parseInt(YYYY);
        this.#month = parseInt(MM);

        if (tz_sign) {
            this.#hour -= parseInt(tz_sign + tz_hh);
            this.#minute -= parseInt(tz_sign + tz_mm);
        } else if (!utc_tag) {
            const offset = new Date(0).getTimezoneOffset();
            this.#hour -= Math.floor(offset / 60);
            this.#minute -= offset % 60;
        }
    } // gYearMonth#constructor

    get year() {
        return this.#year;
    }

    get month() {
        return this.#month;
    }

    get hour() {
        return this.#hour;
    }

    get minute() {
        return this.#minute;
    }

} // gYearMonth

module.exports = gYearMonth;
