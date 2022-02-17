const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class _Datatype {

    static get id() {
        return this.name;
    }

    static from(param) {
        if (this === _Datatype)
            throw new Error('abstract class cannot be constructed');
        if (param instanceof this) return param;
        if (param instanceof _Datatype)
            throw new Error('expected param to be an instance of ' + this.id + ', but got instance of ' + param.type);
        return new this(param);
    }

    #type  = '';
    #value = '';

    constructor(param) {
        if (new.target === _Datatype)
            throw new Error('abstract class cannot be constructed');
        if (util.isObject(param)) {
            if (param['@type'] && ![util.xsdIRI(new.target.id), util.xsdURI(new.target.id)].includes(param['@type']))
                throw new Error('expected param @type to be ' + util.xsdIRI(new.target.id));
            param = param['@value'];
        }
        if (!util.isString(param))
            throw new Error('expected param @value to be a string');

        this.#type  = new.target.id;
        this.#value = param;
    } // _Datatype#constructor

    get type() {
        return this.#type;
    }

    get value() {
        return this.#value;
    }

    valueOf() {
        return this.#value;
    } // _Datatype#valueOf

    toJSON() {
        return {
            '@type':  util.xsdIRI(this.#type),
            '@value': this.#value
        };
    } // _Datatype#toJSON

} // _Datatype

module.exports = _Datatype;
