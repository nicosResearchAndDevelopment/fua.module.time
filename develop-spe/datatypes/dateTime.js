const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class dateTime extends model._Datatype {

    #year        = 1970;
    #month       = 1;
    #day         = 1;
    #hour        = 0;
    #minute      = 0;
    #second      = 0;
    #millisecond = 0;

    constructor(param) {
        super(param);
        const [match, YYYY, MM, DD, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(super.value) || [];
        if (!match) throw new Error('expected value to be an ' + util.xsdIRI.dateTime);

        this.#year        = parseInt(YYYY);
        this.#month       = parseInt(MM);
        this.#day         = parseInt(DD);
        this.#hour        = parseInt(hh);
        this.#minute      = parseInt(mm);
        this.#second      = parseInt(ss_ms);
        this.#millisecond = Math.round(1000 * (parseFloat(ss_ms) - this.#second));

        if (tz_sign) {
            this.#hour -= parseInt(tz_sign + tz_hh);
            this.#minute -= parseInt(tz_sign + tz_mm);
        } else if (!utc_tag) {
            const offset = new Date(0).getTimezoneOffset();
            this.#hour -= Math.floor(offset / 60);
            this.#minute -= offset % 60;
        }
    } // dateTime#constructor

    get year() {
        return this.#year;
    }

    get month() {
        return this.#month;
    }

    get day() {
        return this.#day;
    }

    get hour() {
        return this.#hour;
    }

    get minute() {
        return this.#minute;
    }

    get second() {
        return this.#second;
    }

    get millisecond() {
        return this.#millisecond;
    }

} // dateTime

module.exports = dateTime;
