const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalEntity extends model._Object {

    #after                  = new model._ObjectProperty(model.TemporalEntity);
    #before                 = new model._ObjectProperty(model.TemporalEntity);
    #hasBeginning           = new model._ObjectProperty(model.Instant);
    #hasDuration            = new model._ObjectProperty(model.Duration);
    #hasDurationDescription = new model._ObjectProperty(model.GeneralDurationDescription);
    #hasEnd                 = new model._ObjectProperty(model.Instant);
    #hasTemporalDuration    = new model._ObjectProperty(model.TemporalDuration);
    #hasXSDDuration         = new model._DatatypeProperty(model.duration);

    constructor(param) {
        super(param);
        const after = param[util.timeIRI.after] || param[util.timeURI.after];
        if (after) this.#after.set(after);
        const before = param[util.timeIRI.before] || param[util.timeURI.before];
        if (before) this.#before.set(before);
        const hasBeginning = param[util.timeIRI.hasBeginning] || param[util.timeURI.hasBeginning];
        if (hasBeginning) this.#hasBeginning.set(hasBeginning);
        const hasDuration = param[util.timeIRI.hasDuration] || param[util.timeURI.hasDuration];
        if (hasDuration) this.#hasDuration.set(hasDuration);
        const hasDurationDescription = param[util.timeIRI.hasDurationDescription] || param[util.timeURI.hasDurationDescription];
        if (hasDurationDescription) this.#hasDurationDescription.set(hasDurationDescription);
        const hasEnd = param[util.timeIRI.hasEnd] || param[util.timeURI.hasEnd];
        if (hasEnd) this.#hasEnd.set(hasEnd);
        const hasTemporalDuration = param[util.timeIRI.hasTemporalDuration] || param[util.timeURI.hasTemporalDuration];
        if (hasTemporalDuration) this.#hasTemporalDuration.set(hasTemporalDuration);
        const hasXSDDuration = param[util.timeIRI.hasXSDDuration] || param[util.timeURI.hasXSDDuration];
        if (hasXSDDuration) this.#hasXSDDuration.set(hasXSDDuration);
    } // TemporalEntity#constructor

    get after() {
        return this.#after;
    }

    get before() {
        return this.#before;
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

    lock() {
        super.lock();
        this.#after.lock();
        this.#before.lock();
        this.#hasBeginning.lock();
        this.#hasDuration.lock();
        this.#hasDurationDescription.lock();
        this.#hasEnd.lock();
        this.#hasTemporalDuration.lock();
        this.#hasXSDDuration.lock();
        return this;
    } // TemporalEntity#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#after.empty) result[util.timeIRI.after] = this.#after.toJSON();
        if (!this.#before.empty) result[util.timeIRI.before] = this.#before.toJSON();
        if (!this.#hasBeginning.empty) result[util.timeIRI.hasBeginning] = this.#hasBeginning.toJSON();
        if (!this.#hasDuration.empty) result[util.timeIRI.hasDuration] = this.#hasDuration.toJSON();
        if (!this.#hasDurationDescription.empty) result[util.timeIRI.hasDurationDescription] = this.#hasDurationDescription.toJSON();
        if (!this.#hasEnd.empty) result[util.timeIRI.hasEnd] = this.#hasEnd.toJSON();
        if (!this.#hasTemporalDuration.empty) result[util.timeIRI.hasTemporalDuration] = this.#hasTemporalDuration.toJSON();
        if (!this.#hasXSDDuration.empty) result[util.timeIRI.hasXSDDuration] = this.#hasXSDDuration.toJSON();
        return result;
    } // TemporalEntity#toJSON

} // TemporalEntity

module.exports = TemporalEntity;
