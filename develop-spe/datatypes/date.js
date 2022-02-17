const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class date extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdDate(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.date);
    } // date#constructor

} // date

module.exports = date;
