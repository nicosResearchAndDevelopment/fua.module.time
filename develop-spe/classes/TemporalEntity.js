const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalEntity {

    #after               = new Set();
    #before              = new Set();
    #hasBeginning        = null;
    #hasEnd              = null;
    #hasTemporalDuration = null;
    #hasXSDDuration      = '';

    constructor(property) {
        if (property?.after) for (let after of util.toArray(property.after)) {
            util.assert(property.after instanceof model.TemporalEntity, 'expected property after to be a TemporalEntity');
            this.#after.add(after);
        }
        if (property?.before) for (let before of util.toArray(property.before)) {
            util.assert(property.before instanceof model.TemporalEntity, 'expected property before to be a TemporalEntity');
            this.#before.add(before);
        }
        if (property?.hasBeginning) {
            util.assert(property.hasBeginning instanceof model.Instant, 'expected property hasBeginning to be an Instant');
            this.#hasBeginning = property.hasBeginning;
        }
        if (property?.hasEnd) {
            util.assert(property.hasEnd instanceof model.Instant, 'expected property hasEnd to be an Instant');
            this.#hasEnd = property.hasEnd;
        }
        if (property?.hasTemporalDuration) {
            util.assert(property.hasTemporalDuration instanceof model.TemporalDuration, 'expected property hasTemporalDuration to be a TemporalDuration');
            this.#hasTemporalDuration = property.hasTemporalDuration;
        }
        if (property?.hasXSDDuration) {
            util.assert(util.isXsdDuration(property.hasXSDDuration), 'expected property hasXSDDuration to be an xsd:duration');
            this.#hasXSDDuration = property.hasXSDDuration;
        }
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

    get hasEnd() {
        return this.#hasEnd;
    }

    get hasTemporalDuration() {
        return this.#hasTemporalDuration;
    }

    get hasXSDDuration() {
        return this.#hasXSDDuration;
    }

} // TemporalEntity

module.exports = TemporalEntity;
