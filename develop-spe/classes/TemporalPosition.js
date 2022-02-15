const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalPosition extends model._Entity {

    #hasTRS = model.Gregorian;

    constructor(param) {
        super(param);
        this.#hasTRS = util.getProperty(param, 'hasTRS') || this.#hasTRS;
        util.assert(this.#hasTRS instanceof model.TRS, 'expected hasTRS to be a TRS');
    } // TemporalPosition#constructor

    get hasTRS() {
        return this.#hasTRS;
    }

    toJSON() {
        return util.cleanupProperties({
            ...super.toJSON(),
            [util.timeIRI('hasTRS')]: this.#hasTRS
        });
    } // TemporalPosition#toJSON

} // TemporalPosition

module.exports = TemporalPosition;
