const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class nonNegativeInteger extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdNonNegativeInteger(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.nonNegativeInteger);
    } // nonNegativeInteger#constructor

} // nonNegativeInteger

module.exports = nonNegativeInteger;
