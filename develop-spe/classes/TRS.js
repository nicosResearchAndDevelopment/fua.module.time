const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class TRS extends model._Object {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for TRS');
    } // TRS#constructor

    equals(other) {
        return (other instanceof TRS) && (this === other || this.id === other.id);
    } // TRS#equals

} // TRS

module.exports = TRS;
