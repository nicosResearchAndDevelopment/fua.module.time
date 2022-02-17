const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalPosition extends model._Class {

    #hasTRS = model.Gregorian;

    constructor(param) {
        super(param);
        const hasTRS = param[util.timeIRI.hasTRS] || param[util.timeURI.hasTRS];
        if (hasTRS) this.#hasTRS = model.TRS.from(hasTRS);
    } // TemporalPosition#constructor

    get hasTRS() {
        return this.#hasTRS;
    }

    toJSON() {
        const result                = super.toJSON();
        result[util.timeIRI.hasTRS] = this.#hasTRS;
        return result;
    } // TemporalPosition#toJSON

} // TemporalPosition

module.exports = TemporalPosition;
