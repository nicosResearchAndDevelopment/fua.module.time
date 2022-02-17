const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalEntity extends model._Class {

    #after                  = new Set();
    #before                 = new Set();
    #hasBeginning           = null;
    #hasDuration            = null;
    #hasDurationDescription = null;
    #hasEnd                 = null;
    #hasTemporalDuration    = null;
    #hasXSDDuration         = null;

    constructor(param) {
        super(param);
        const after = param[util.timeIRI.after] || param[util.timeURI.after];
        if (after) for (let entity of util.toArray(param.after)) {
            this.#after.add(model.TemporalEntity.from(after));
        }
        const before = param[util.timeIRI.before] || param[util.timeURI.before];
        if (before) for (let entity of util.toArray(param.before)) {
            this.#before.add(model.TemporalEntity.from(before));
        }
        const hasBeginning = param[util.timeIRI.hasBeginning] || param[util.timeURI.hasBeginning];
        if (hasBeginning) this.#hasBeginning = model.Instant.from(hasBeginning);
        const hasDuration = param[util.timeIRI.hasDuration] || param[util.timeURI.hasDuration];
        if (hasDuration) this.#hasDuration = model.Duration.from(hasDuration);
        const hasDurationDescription = param[util.timeIRI.hasDurationDescription] || param[util.timeURI.hasDurationDescription];
        if (hasDurationDescription) this.#hasDurationDescription = model.GeneralDurationDescription.from(hasDurationDescription);
        const hasEnd = param[util.timeIRI.hasEnd] || param[util.timeURI.hasEnd];
        if (hasEnd) this.#hasEnd = model.Instant.from(hasEnd);
        const hasTemporalDuration = param[util.timeIRI.hasTemporalDuration] || param[util.timeURI.hasTemporalDuration];
        if (hasTemporalDuration) this.#hasTemporalDuration = model.TemporalDuration.from(hasTemporalDuration);
        const hasXSDDuration = param[util.timeIRI.hasXSDDuration] || param[util.timeURI.hasXSDDuration];
        if (hasXSDDuration) this.#hasXSDDuration = model.duration.from(hasXSDDuration);
    } // TemporalEntity#constructor

    get after() {
        return Array.from(this.#after);
    }

    get before() {
        return Array.from(this.#before);
    }

    get hasBeginning() {
        return this.#hasBeginning;
    }

    get hasDuration() {
        return this.#hasDuration;
    }

    get hasDurationDescription() {
        return this.#hasDurationDescription;
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

    toJSON() {
        const result = super.toJSON();
        if (this.#after.size > 0) result[util.timeIRI.after] = Array.from(this.#after);
        if (this.#before.size > 0) result[util.timeIRI.before] = Array.from(this.#before);
        if (this.#hasBeginning) result[util.timeIRI.hasBeginning] = this.#hasBeginning;
        if (this.#hasDuration) result[util.timeIRI.hasDuration] = this.#hasDuration;
        if (this.#hasDurationDescription) result[util.timeIRI.hasDurationDescription] = this.#hasDurationDescription;
        if (this.#hasEnd) result[util.timeIRI.hasEnd] = this.#hasEnd;
        if (this.#hasTemporalDuration) result[util.timeIRI.hasTemporalDuration] = this.#hasTemporalDuration;
        if (this.#hasXSDDuration) result[util.timeIRI.hasXSDDuration] = this.#hasXSDDuration;
        return result;
    } // TemporalEntity#toJSON

} // TemporalEntity

module.exports = TemporalEntity;
