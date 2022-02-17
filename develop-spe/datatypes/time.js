const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class time extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdTime(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.time);
    } // time#constructor

} // time

module.exports = time;
