const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TRS extends model._Entity {

    constructor(param) {
        if (!param?.['@id']) throw new Error('param @id is mandatory for TRS');
        super(param);
    } // TRS#constructor

} // TRS

module.exports = TRS;
