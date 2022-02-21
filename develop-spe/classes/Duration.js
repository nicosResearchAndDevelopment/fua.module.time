const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class Duration extends model.TemporalDuration {

    #unitType        = new model._ObjectProperty(model.TemporalUnit, 1, 1);
    #numericDuration = new model._DatatypeProperty(model.decimal, 1, 1);

    constructor(param) {
        super(param);
        const unitType = param[util.timeIRI.unitType] || param[util.timeURI.unitType];
        if (unitType) this.#unitType.set(unitType);
        else throw new Error('unitType is mandatory for Duration');
        const numericDuration = param[util.timeIRI.numericDuration] || param[util.timeURI.numericDuration];
        if (numericDuration) this.#numericDuration.set(numericDuration);
        else throw new Error('numericDuration is mandatory for Duration');
    } // Duration#constructor

    get unitType() {
        return this.#unitType;
    }

    get numericDuration() {
        return this.#numericDuration;
    }

    lock() {
        super.lock();
        this.#unitType.lock();
        this.#numericDuration.lock();
        return this;
    } // Duration#lock

    toJSON() {
        const result                         = super.toJSON();
        result[util.timeIRI.unitType]        = this.#unitType.toJSON();
        result[util.timeIRI.numericDuration] = this.#numericDuration.toJSON();
        return result;
    } // Duration#toJSON

} // Duration

module.exports = Duration;
