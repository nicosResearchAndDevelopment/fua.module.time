const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class decimal extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdDecimal(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.decimal);
    } // decimal#constructor

} // decimal

module.exports = decimal;
