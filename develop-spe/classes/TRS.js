const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TRS extends model._Class {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for TRS');
    } // TRS#constructor

} // TRS

module.exports = TRS;
