const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TRS extends model._Entity {

    constructor(param) {
        super(param);
        util.assert(this.id, 'id is mandatory');
    } // TRS#constructor

} // TRS

module.exports = TRS;
