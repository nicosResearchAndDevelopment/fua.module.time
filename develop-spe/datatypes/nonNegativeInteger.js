const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    pattern = /^\+?\d+$/;

class nonNegativeInteger extends model._Datatype {

    #number = 0;

    constructor(param) {
        super(param);
        if (!pattern.test(this.value)) throw new Error('expected value to be an ' + util.xsdIRI.nonNegativeInteger);
        this.#number = parseInt(this.value);
    } // nonNegativeInteger#constructor

    get number() {
        return this.#number;
    }

} // nonNegativeInteger

module.exports = nonNegativeInteger;
