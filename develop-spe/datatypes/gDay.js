const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class gDay extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdGDay(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.gDay);
    } // gDay#constructor

} // gDay

module.exports = gDay;
