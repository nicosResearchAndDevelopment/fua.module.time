const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^---(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class gDay extends model._Datatype {

    #day    = 1;
    #hour   = 0;
    #minute = 0;

    constructor(param) {
        super(param);
        const [match, DD, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(super.value) || [];
        if (!match) throw new Error('expected value to be an ' + util.xsdIRI.gDay);

        this.#day = parseInt(DD);

        if (tz_sign) {
            this.#hour -= parseInt(tz_sign + tz_hh);
            this.#minute -= parseInt(tz_sign + tz_mm);
        } else if (!utc_tag) {
            const offset = new Date(0).getTimezoneOffset();
            this.#hour -= Math.floor(offset / 60);
            this.#minute -= offset % 60;
        }
    } // gDay#constructor

    get day() {
        return this.#day;
    }

    get hour() {
        return this.#hour;
    }

    get minute() {
        return this.#minute;
    }

} // gDay

module.exports = gDay;
