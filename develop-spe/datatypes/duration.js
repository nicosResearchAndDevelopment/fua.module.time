const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/;

class duration extends model._Datatype {

    #sign         = 1;
    #years        = 0;
    #months       = 0;
    #days         = 0;
    #hours        = 0;
    #minutes      = 0;
    #seconds      = 0;
    #milliseconds = 0;

    constructor(param) {
        super(param);
        const [match, sign, YYYY, MM, DD, hh, mm, ss_ms] = pattern.exec(super.value) || [];
        if (!match) throw new Error('expected value to be an ' + util.xsdIRI.duration);

        if (sign === '-') this.#sign = -1;
        if (YYYY) this.#years = parseInt(YYYY);
        if (MM) this.#months = parseInt(MM);
        if (DD) this.#days = parseInt(DD);
        if (hh) this.#hours = parseInt(hh);
        if (mm) this.#minutes = parseInt(mm);
        if (ss_ms) {
            this.#seconds      = parseInt(ss_ms);
            this.#milliseconds = Math.round(1000 * (parseFloat(ss_ms) - this.#seconds));
        }
    } // duration#constructor

    get sign() {
        return this.#sign;
    }

    get years() {
        return this.#years;
    }

    get months() {
        return this.#months;
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

    get seconds() {
        return this.#seconds;
    }

    get milliseconds() {
        return this.#milliseconds;
    }

} // duration

module.exports = duration;
