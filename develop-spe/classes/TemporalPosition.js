const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalPosition extends model._Object {

    #hasTRS = new model._ObjectProperty(model.TRS, 1, 1, model.Gregorian);

    constructor(param) {
        super(param);
        const hasTRS = param[util.timeIRI.hasTRS] || param[util.timeURI.hasTRS];
        if (hasTRS) this.#hasTRS.set(hasTRS);
    } // TemporalPosition#constructor

    get hasTRS() {
        return this.#hasTRS;
    }

    toJSON() {
        const result                = super.toJSON();
        result[util.timeIRI.hasTRS] = this.#hasTRS.toJSON();
        return result;
    } // TemporalPosition#toJSON

} // TemporalPosition

module.exports = TemporalPosition;
