const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class _Datatype {

    static get id() {
        if (this === _Datatype) return '';
        return this.name;
    }

    static from(param) {
        if (param instanceof this) return param;
        if (param instanceof _Datatype)
            throw new Error('expected param to be an instance of ' + this.id + ', but got instance of ' + param.type);
        return new this(param);
    }

    #type  = '';
    #value = '';

    constructor(param) {
        // if (new.target === _Datatype)
        //     throw new Error('abstract class cannot be constructed');
        if (util.isObject(param)) {
            if (param['@type'] && new.target.id && ![util.xsdIRI(new.target.id), util.xsdURI(new.target.id)].includes(param['@type']))
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

    equals(other) {
        return (other instanceof _Datatype) && (this === other || this.type === other.type && this.value === other.value);
    } // _Datatype#equals

    valueOf() {
        return this.#value;
    } // _Datatype#valueOf

    toString() {
        return this.#value;
    } // _Datatype#valueOf

    toJSON() {
        const result = {};
        if (this.#type) result['@type'] = util.xsdIRI(this.#type);
        result['@value'] = this.#value;
        return result;
    } // _Datatype#toJSON

} // _Datatype

module.exports = _Datatype;
