const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalPosition {

    #hasTRS = model.Gregorian;

    constructor(property) {
        if (property?.hasTRS) {
            util.assert(property.hasTRS instanceof model.TRS, 'expected property hasTRS to be a TRS');
            this.#hasTRS = property.hasTRS;
        }
    } // TemporalPosition#constructor

    get hasTRS() {
        return this.#hasTRS;
    }

} // TemporalPosition

module.exports = TemporalPosition;
