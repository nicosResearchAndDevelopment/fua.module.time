const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class gYearMonth extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdGYearMonth(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.gYearMonth);
    } // gYearMonth#constructor

} // gYearMonth

module.exports = gYearMonth;
