const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DayOfWeek extends model._Object {

    constructor(param) {
        super(param);
        if (!this.id) throw new Error('id is mandatory for DayOfWeek');
    } // DayOfWeek#constructor

    equals(other) {
        return (other instanceof DayOfWeek) && (this === other || this.id === other.id);
    } // DayOfWeek#equals

} // DayOfWeek

module.exports = DayOfWeek;
