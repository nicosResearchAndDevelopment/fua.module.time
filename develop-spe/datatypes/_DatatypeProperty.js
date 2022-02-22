const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

/**
 * @template {_Datatype} DatatypeClass
 */
class _DatatypeProperty {

    /** @type {Set<DatatypeClass>} */
    #references     = new Set();
    /** @type {typeof DatatypeClass} */
    #referenceType  = model._Datatype;
    #minCardinality = 0;
    #maxCardinality = Number.MAX_SAFE_INTEGER;
    #locked         = false;

    /**
     * @param {typeof DatatypeClass} [referenceType=_Datatype]
     * @param {number} [minCardinality=0]
     * @param {number} [maxCardinality=Number.MAX_SAFE_INTEGER]
     * @param {DatatypeClass|Array<DatatypeClass>|null} [defaultTarget=null]
     */
    constructor(referenceType, minCardinality, maxCardinality, defaultTarget) {
        if (util.isNotNull(referenceType)) {
            if (!util.isFunction(referenceType))
                throw new Error('expected referenceType to be a function');
            if (!model._Datatype.isPrototypeOf(referenceType))
                throw new Error('expected referenceType to be a subclass of _Datatype');
            this.#referenceType = referenceType;
        }
        if (util.isNotNull(minCardinality)) {
            if (!util.isInteger(minCardinality))
                throw new Error('expected minCardinality to be an integer');
            if (minCardinality < 0)
                throw new Error('expected minCardinality to be >= 0');
            if (minCardinality > Number.MAX_SAFE_INTEGER)
                throw new Error('expected minCardinality to be <= ' + Number.MAX_SAFE_INTEGER);
            this.#minCardinality = minCardinality;
        }
        if (util.isNotNull(maxCardinality)) {
            if (!util.isInteger(maxCardinality))
                throw new Error('expected maxCardinality to be an integer');
            if (maxCardinality < 1)
                throw new Error('expected maxCardinality to be >= 1');
            if (maxCardinality < this.#minCardinality)
                throw new Error('expected maxCardinality to be >= ' + this.#minCardinality);
            if (maxCardinality > Number.MAX_SAFE_INTEGER)
                throw new Error('expected maxCardinality to be <= ' + Number.MAX_SAFE_INTEGER);
            this.#maxCardinality = maxCardinality;
        }
        if (util.isNotNull(defaultTarget)) {
            this.set(defaultTarget);
        }
    } // _DatatypeProperty#constructor

    get locked() {
        return this.#locked;
    } // _DatatypeProperty#locked

    get empty() {
        return this.#references.size === 0;
    } // _DatatypeProperty#empty

    get size() {
        return this.#references.size
    } // _DatatypeProperty#size

    /**
     * @returns {DatatypeClass|Array<DatatypeClass>|null}
     */
    get() {
        if (this.#maxCardinality > 1) {
            return Array.from(this.#references);
        } else if (this.#references.size > 0) {
            return this.#references.values().next().value;
        } else {
            if (this.#minCardinality > 0)
                throw new Error('expected to be defined');
            return null;
        }
    } // _DatatypeProperty#set

    /**
     * @param {DatatypeClass|Array<DatatypeClass>|null} target
     * @returns {DatatypeClass|Array<DatatypeClass>|null}
     */
    set(target) {
        if (this.#locked)
            throw new Error('this property has been locked');
        if (util.isArray(target)) {
            if (target.length < this.#minCardinality)
                throw new Error('expected target to have a length of >= ' + this.#minCardinality);
            if (target.length > this.#maxCardinality)
                throw new Error('expected target to have a length of <= ' + this.#maxCardinality);
            target = target.map(entry => this.#referenceType.from(entry));
            this.#references.clear();
            target.forEach(entry => this.#references.add(entry));
            return target;
        } else {
            if (this.#maxCardinality > 1)
                throw new Error('expected target to be an array');
            if (target) {
                target = this.#referenceType.from(target);
                this.#references.clear();
                this.#references.add(target);
                return target;
            } else {
                if (this.#minCardinality > 0)
                    throw new Error('expected target to be not empty');
                this.#references.clear();
                return null;
            }
        }
    } // _DatatypeProperty#set

    /**
     * @returns {IterableIterator<DatatypeClass>}
     */
    entries() {
        return this.#references.values();
    } // _DatatypeProperty#entries

    /**
     * @param {DatatypeClass} target
     * @returns {DatatypeClass}
     */
    add(target) {
        if (this.#locked)
            throw new Error('this property has been locked');
        if (this.#references.size + 1 > this.#maxCardinality)
            throw new Error('expected to not have more entries than ' + this.#maxCardinality);
        target = this.#referenceType.from(target);
        this.#references.add(target);
        return target;
    } // _DatatypeProperty#add

    /**
     * @param {DatatypeClass} target
     * @returns {DatatypeClass}
     */
    remove(target) {
        if (this.#locked)
            throw new Error('this property has been locked');
        if (this.#references.size - 1 < this.#minCardinality)
            throw new Error('expected to not have less entries than ' + this.#minCardinality);
        target = this.#referenceType.from(target);
        this.#references.delete(target);
        return target;
    } // _DatatypeProperty#remove

    lock() {
        this.#locked = true;
        return this;
    } // _DatatypeProperty#lock

    /**
     * @returns {DatatypeClass|Array<DatatypeClass>|null}
     */
    toJSON() {
        if (this.#maxCardinality > 1) {
            const target = Array.from(this.#references);
            return target.map(entry => entry.toJSON());
        } else if (this.#references.size > 0) {
            const target = this.#references.values().next().value;
            return target.toJSON();
        } else {
            return null;
        }
    } // _DatatypeProperty#toJSON

} // _DatatypeProperty

module.exports = _DatatypeProperty;
