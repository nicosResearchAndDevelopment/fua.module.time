const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalEntity extends model._Class {

    #hasBeginning        = null;
    #hasEnd              = null;
    #hasTemporalDuration = null;
    #hasXSDDuration      = '';

    #after  = new Set();
    #before = new Set();

    constructor(param) {
        super(param);
        const hasBeginning = param[util.timeIRI.hasBeginning] || param[util.timeURI.hasBeginning];
        if (hasBeginning) this.#hasBeginning = model.Instant.from(hasBeginning);
        const hasEnd = param[util.timeIRI.hasEnd] || param[util.timeURI.hasEnd];
        if (hasEnd) this.#hasEnd = model.Instant.from(hasEnd);
        const hasTemporalDuration = param[util.timeIRI.hasTemporalDuration] || param[util.timeURI.hasTemporalDuration];
        if (hasTemporalDuration) this.#hasTemporalDuration = model.TemporalDuration.from(hasTemporalDuration);
        const hasXSDDuration = param[util.timeIRI.hasXSDDuration] || param[util.timeURI.hasXSDDuration];
        if (hasXSDDuration) this.#hasXSDDuration = model.duration.from(hasXSDDuration);
        const after = param[util.timeIRI.after] || param[util.timeURI.after];
        if (after) for (let entity of util.toArray(param.after)) {
            this.#after.add(model.TemporalEntity.from(after));
        }
        const before = param[util.timeIRI.before] || param[util.timeURI.before];
        if (before) for (let entity of util.toArray(param.before)) {
            this.#before.add(model.TemporalEntity.from(before));
        }
    } // TemporalEntity#constructor

    get hasBeginning() {
        return this.#hasBeginning;
    }

    get hasEnd() {
        return this.#hasEnd;
    }

    get hasTemporalDuration() {
        return this.#hasTemporalDuration;
    }

    get hasXSDDuration() {
        return this.#hasXSDDuration;
    }

    get after() {
        return Array.from(this.#after);
    }

    get before() {
        return Array.from(this.#before);
    }

    toJSON() {
        const result = super.toJSON();
        if (this.#after.size > 0) result[util.timeIRI.after] = Array.from(this.#after);
        if (this.#before.size > 0) result[util.timeIRI.before] = Array.from(this.#before);
        if (this.#hasBeginning) result[util.timeIRI.hasBeginning] = this.#hasBeginning;
        if (this.#hasEnd) result[util.timeIRI.hasEnd] = this.#hasEnd;
        if (this.#hasTemporalDuration) result[util.timeIRI.hasTemporalDuration] = this.#hasTemporalDuration;
        if (this.#hasXSDDuration) result[util.timeIRI.hasXSDDuration] = this.#hasXSDDuration;
        return result;
    } // TemporalEntity#toJSON

} // TemporalEntity

module.exports = TemporalEntity;
