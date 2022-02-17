const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class dateTimeStamp extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdDateTimeStamp(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.dateTimeStamp);
    } // dateTimeStamp#constructor

} // dateTimeStamp

module.exports = dateTimeStamp;
