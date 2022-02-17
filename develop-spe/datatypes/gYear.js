const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class gYear extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdGYear(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.gYear);
    } // gYear#constructor

} // gYear

module.exports = gYear;
