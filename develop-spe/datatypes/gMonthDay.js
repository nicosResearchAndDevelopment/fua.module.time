const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class gMonthDay extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdGMonthDay(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.gMonthDay);
    } // gMonthDay#constructor

} // gMonthDay

module.exports = gMonthDay;
