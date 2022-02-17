const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class gMonth extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdGMonth(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.gMonth);
    } // gMonth#constructor

} // gMonth

module.exports = gMonth;
