const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class _Entity {

    static from(param) {
        if (this === _Entity)
            throw new Error('abstract class cannot be constructed');
        if (param instanceof this) return param;
        if (param instanceof _Entity)
            throw new Error('expected param to be an instance of ' + this.name + ', but got instance of ' + param.type);
        return new this(param);
    }

    #id   = '';
    #type = '';

    constructor(param) {
        if (new.target === _Entity)
            throw new Error('abstract class cannot be constructed');
        if (!util.isObject(param))
            throw new Error('expected param to be an object');
        if (param['@type'] && param['@type'] !== util.timeIRI(new.target.name))
            throw new Error('expected param @type to be ' + util.timeIRI(new.target.name));
        if (param['@id'] && !util.isIRIString(param['@id']))
            throw new Error('expected param @id to be an iri string');

        this.#id   = param['@id'] || '';
        this.#type = new.target.name;
    } // _Entity#constructor

    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    toJSON() {
        const result = {'@type': util.timeIRI(this.#type)};
        if (this.#id) result['@id'] = this.#id;
        return result;
    } // _Entity#toJSON

} // _Entity

module.exports = _Entity;
