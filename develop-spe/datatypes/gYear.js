const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^(-?[1-9][0-9]*)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;

class gYear extends model._Datatype {

    #year   = 1970;
    #hour   = 0;
    #minute = 0;

    constructor(param) {
        super(param);
        const [match, YYYY, tz_sign, tz_hh, tz_mm, utc_tag] = pattern.exec(super.value) || [];
        if (!match) throw new Error('expected value to be an ' + util.xsdIRI.gYear);

        this.#year = parseInt(YYYY);

        if (tz_sign) {
            this.#hour -= parseInt(tz_sign + tz_hh);
            this.#minute -= parseInt(tz_sign + tz_mm);
        } else if (!utc_tag) {
            const offset = new Date(0).getTimezoneOffset();
            this.#hour -= Math.floor(offset / 60);
            this.#minute -= offset % 60;
        }
    } // gYear#constructor

    get year() {
        return this.#year;
    }

    get hour() {
        return this.#hour;
    }

    get minute() {
        return this.#minute;
    }

} // gYear

module.exports = gYear;
