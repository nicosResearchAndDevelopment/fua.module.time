const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class _Entity {

    static id() {
        return util.timeIRI(this.constructor.name);
    }

    #id   = '';
    #type = '';

    constructor(param) {
        util.assert(new.target !== _Entity, 'abstract class');
        this.#id = util.getProperty(param, 'id') || this.#id;
        util.assert(!this.#id || util.isIRIString(id), 'expected id to be an iri string');
        this.#type = new.target.name || this.#type;
    } // _Entity#constructor

    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    toJSON() {
        return util.cleanupProperties({
            '@id':   this.#id,
            '@type': util.timeIRI(this.#type)
        });
    } // _Entity#toJSON

} // _Entity

module.exports = _Entity;
