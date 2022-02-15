const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TemporalEntity extends model._Entity {

    // #after               = new Set();
    // #before              = new Set();
    #hasBeginning        = null;
    #hasEnd              = null;
    #hasTemporalDuration = null;
    #hasXSDDuration      = '';

    constructor(param) {
        super(param);
        // const after = util.getProperty(param, 'after');
        // if (after) for (let entity of util.toArray(param.after)) {
        //     util.assert(entity instanceof model.TemporalEntity, 'expected param after to be a TemporalEntity');
        //     this.#after.add(entity);
        // }
        // if (param?.before) for (let before of util.toArray(param.before)) {
        //     util.assert(param.before instanceof model.TemporalEntity, 'expected param before to be a TemporalEntity');
        //     this.#before.add(before);
        // }
        this.#hasBeginning = util.getProperty(param, 'hasBeginning') || this.#hasBeginning;
        util.assert(!this.#hasBeginning || this.#hasBeginning instanceof model.Instant, 'expected hasBeginning to be an Instant');
        this.#hasEnd = util.getProperty(param, 'hasEnd') || this.#hasEnd;
        util.assert(!this.#hasEnd || this.#hasEnd instanceof model.Instant, 'expected hasEnd to be an Instant');
        this.#hasTemporalDuration = util.getProperty(param, 'hasTemporalDuration') || this.#hasTemporalDuration;
        util.assert(!this.#hasTemporalDuration || this.#hasTemporalDuration instanceof model.TemporalDuration, 'expected hasTemporalDuration to be an Instant');
        this.#hasXSDDuration = util.getProperty(param, 'hasXSDDuration') || this.#hasXSDDuration;
        util.assert(!this.#hasXSDDuration || util.isXsdDuration(param.hasXSDDuration), 'expected hasXSDDuration to be an xsd:duration');

    } // TemporalEntity#constructor

    // get after() {
    //     return Array.from(this.#after);
    // }
    //
    // get before() {
    //     return Array.from(this.#before);
    // }

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

    toJSON() {
        return util.cleanupProperties({
            ...super.toJSON(),
            [util.timeIRI('hasBeginning')]:        this.#hasBeginning,
            [util.timeIRI('hasEnd')]:              this.#hasEnd,
            [util.timeIRI('hasTemporalDuration')]: this.#hasTemporalDuration,
            [util.timeIRI('hasXSDDuration')]:      this.#hasXSDDuration
        });
    } // TemporalEntity#toJSON

} // TemporalEntity

module.exports = TemporalEntity;
