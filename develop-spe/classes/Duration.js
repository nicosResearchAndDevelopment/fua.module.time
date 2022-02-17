const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class Duration extends model.TemporalDuration {

    #unitType        = null;
    #numericDuration = null;

    constructor(param) {
        super(param);
        const unitType = param[util.timeIRI.unitType] || param[util.timeURI.unitType];
        if (unitType) this.#unitType = model.TemporalUnit.from(unitType);
        else throw new Error('unitType is mandatory for Duration');
        const numericDuration = param[util.timeIRI.numericDuration] || param[util.timeURI.numericDuration];
        if (numericDuration) this.#numericDuration = model.decimal.from(numericDuration);
        else throw new Error('numericDuration is mandatory for Duration');
    } // Duration#constructor

    get unitType() {
        return this.#unitType;
    }

    get numericDuration() {
        return this.#numericDuration;
    }

    toJSON() {
        const result                         = super.toJSON();
        result[util.timeIRI.unitType]        = this.#unitType;
        result[util.timeIRI.numericDuration] = this.#numericDuration;
        return result;
    } // Duration#toJSON

} // Duration

module.exports = Duration;
