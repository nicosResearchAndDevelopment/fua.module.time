const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

/**
 * @template {_Object} ObjectClass
 */
class _ObjectProperty {

    /** @type {Set<ObjectClass>} */
    #references     = new Set();
    /** @type {typeof ObjectClass} */
    #referenceType  = model._Object;
    #minCardinality = 0;
    #maxCardinality = Number.MAX_SAFE_INTEGER;
    #locked         = false;

    /**
     * @param {typeof ObjectClass} [referenceType=_Object]
     * @param {number} [minCardinality=0]
     * @param {number} [maxCardinality=Number.MAX_SAFE_INTEGER]
     * @param {ObjectClass|Array<ObjectClass>|null} [defaultTarget=null]
     */
    constructor(referenceType, minCardinality, maxCardinality, defaultTarget) {
        if (util.isNotNull(referenceType)) {
            if (!util.isFunction(referenceType))
                throw new Error('expected referenceType to be a function');
            if (!model._Object.isPrototypeOf(referenceType))
                throw new Error('expected referenceType to be a subclass of _Object');
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
    } // _ObjectProperty#constructor

    get locked() {
        return this.#locked;
    } // _ObjectProperty#locked

    get empty() {
        return this.#references.size === 0;
    } // _ObjectProperty#empty

    get size() {
        return this.#references.size
    } // _ObjectProperty#size

    /**
     * @returns {ObjectClass|Array<ObjectClass>|null}
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
    } // _ObjectProperty#set

    /**
     * @param {ObjectClass|Array<ObjectClass>|null} target
     * @returns {ObjectClass|Array<ObjectClass>|null}
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
    } // _ObjectProperty#set

    /**
     * @returns {IterableIterator<ObjectClass>}
     */
    entries() {
        return this.#references.values();
    } // _ObjectProperty#entries

    /**
     * @param {ObjectClass} target
     * @returns {ObjectClass}
     */
    add(target) {
        if (this.#locked)
            throw new Error('this property has been locked');
        if (this.#references.size + 1 > this.#maxCardinality)
            throw new Error('expected to not have more entries than ' + this.#maxCardinality);
        target = this.#referenceType.from(target);
        this.#references.add(target);
        return target;
    } // _ObjectProperty#add

    /**
     * @param {ObjectClass} target
     * @returns {ObjectClass}
     */
    remove(target) {
        if (this.#locked)
            throw new Error('this property has been locked');
        if (this.#references.size - 1 < this.#minCardinality)
            throw new Error('expected to not have less entries than ' + this.#minCardinality);
        target = this.#referenceType.from(target);
        this.#references.delete(target);
        return target;
    } // _ObjectProperty#remove

    lock() {
        this.#locked = true;
        return this;
    } // _ObjectProperty#lock

    /**
     * @returns {ObjectClass|Array<ObjectClass>|null}
     */
    toJSON() {
        if (this.#maxCardinality > 1) {
            const target = Array.from(this.#references);
            return target.map(entry => entry.id ? {'@id': entry.id} : entry.toJSON());
        } else if (this.#references.size > 0) {
            const target = this.#references.values().next().value;
            return target.id ? {'@id': target.id} : target.toJSON();
        } else {
            return null;
        }
    } // _ObjectProperty#toJSON

} // _ObjectProperty

module.exports = _ObjectProperty;
