const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class duration extends model._Datatype {

    constructor(param) {
        super(param);
        if (!util.isXsdDuration(this.value))
            throw new Error('expected value to be an ' + util.xsdIRI.duration);
    } // duration#constructor

} // duration

module.exports = duration;
