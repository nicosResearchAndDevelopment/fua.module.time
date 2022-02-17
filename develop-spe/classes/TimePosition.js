const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TimePosition extends model.TemporalPosition {

    #nominalPosition = null;
    #numericPosition = null;

    constructor(param) {
        super(param);
        const nominalPosition = param[util.timeIRI.nominalPosition] || param[util.timeURI.nominalPosition];
        if (nominalPosition) this.#nominalPosition = model.string.from(nominalPosition);
        const numericPosition = param[util.timeIRI.numericPosition] || param[util.timeURI.numericPosition];
        if (numericPosition) this.#numericPosition = model.decimal.from(numericPosition);
        else if (!nominalPosition) throw new Error('either nominalPosition or numericPosition is mandatory for TimePosition');
    } // TimePosition#constructor

    get nominalPosition() {
        return this.#nominalPosition;
    }

    get numericPosition() {
        return this.#numericPosition;
    }

    toJSON() {
        const result = super.toJSON();
        if (this.#nominalPosition) result[util.timeIRI.nominalPosition] = this.#nominalPosition;
        if (this.#numericPosition) result[util.timeIRI.numericPosition] = this.#numericPosition;
        return result;
    } // TimePosition#toJSON

} // TimePosition

module.exports = TimePosition;
