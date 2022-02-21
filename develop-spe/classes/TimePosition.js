const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TimePosition extends model.TemporalPosition {

    #nominalPosition = new model._DatatypeProperty(model.string, 0, 1);
    #numericPosition = new model._DatatypeProperty(model.decimal, 0, 1);

    constructor(param) {
        super(param);
        const nominalPosition = param[util.timeIRI.nominalPosition] || param[util.timeURI.nominalPosition];
        if (nominalPosition) this.#nominalPosition.set(nominalPosition);
        const numericPosition = param[util.timeIRI.numericPosition] || param[util.timeURI.numericPosition];
        if (numericPosition) this.#numericPosition.set(numericPosition);
        else if (!nominalPosition) throw new Error('either nominalPosition or numericPosition is mandatory for TimePosition');
    } // TimePosition#constructor

    get nominalPosition() {
        return this.#nominalPosition;
    }

    get numericPosition() {
        return this.#numericPosition;
    }

    lock() {
        super.lock();
        this.#nominalPosition.lock();
        this.#numericPosition.lock();
        return this;
    } // TimePosition#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#nominalPosition.empty) result[util.timeIRI.nominalPosition] = this.#nominalPosition.toJSON();
        if (!this.#numericPosition.empty) result[util.timeIRI.numericPosition] = this.#numericPosition.toJSON();
        return result;
    } // TimePosition#toJSON

} // TimePosition

module.exports = TimePosition;
