const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class dateTime extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdDateTime(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.dateTime);
    } // dateTime#constructor

} // dateTime

module.exports = dateTime;
