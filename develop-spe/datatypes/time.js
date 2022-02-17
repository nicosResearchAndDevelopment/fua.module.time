const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class time extends model._Datatype {

    #hour        = 0;
    #minute      = 0;
    #second      = 0;
    #millisecond = 0;

    constructor(param) {
        super(param);
        const [match, hh, mm, ss_ms, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(this.value) || [];
        if (!match) throw new Error('expected value to be an ' + util.xsdIRI.time);
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
    } // time#constructor

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

} // time

module.exports = time;
