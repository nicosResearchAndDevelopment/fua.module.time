const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class _Object {

    static get id() {
        return this.name;
    }

    static from(param) {
        if (this === _Object)
            throw new Error('abstract class cannot be constructed');
        if (param instanceof this) return param;
        if (param instanceof _Object)
            throw new Error('expected param to be an instance of ' + this.id + ', but got instance of ' + param.type);
        return new this(param);
    }

    #type = '';
    #id   = '';

    constructor(param) {
        if (new.target === _Object)
            throw new Error('abstract class cannot be constructed');
        if (!util.isObject(param))
            throw new Error('expected param to be an object');
        if (param['@type'] && ![util.timeIRI(new.target.id), util.timeURI(new.target.id)].includes(param['@type']))
            throw new Error('expected param @type to be ' + util.timeIRI(new.target.id));
        if (param['@id'] && !util.isIRIString(param['@id']))
            throw new Error('expected param @id to be an iri string');

        this.#type = new.target.id;
        this.#id   = param['@id'] || '';
    } // _Object#constructor

    get type() {
        return this.#type;
    }

    get id() {
        return this.#id;
    }

    toJSON() {
        const result = {'@type': util.timeIRI(this.#type)};
        if (this.#id) result['@id'] = this.#id;
        return result;
    } // _Object#toJSON

} // _Object

module.exports = _Object;
