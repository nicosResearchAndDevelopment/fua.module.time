const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;

class decimal extends model._Datatype {

    #number = 0;

    constructor(param) {
        super(param);
        if (!pattern.test(this.value)) throw new Error('expected value to be an ' + util.xsdIRI.decimal);
        this.#number = parseFloat(this.value);
    } // decimal#constructor

    get number() {
        return this.#number;
    }

} // decimal

module.exports = decimal;
