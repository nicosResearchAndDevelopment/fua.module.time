const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DurationDescription extends model.GeneralDurationDescription {

    constructor(param) {
        super(param);
        if (super.hasTRS !== model.Gregorian && super.hasTRS.id !== model.Gregorian.id)
            throw new Error('hasTRS must be Gregorian for DurationDescription');
    } // DurationDescription#constructor

    get hasTRS() {
        return model.Gregorian;
    }

    toJSON() {
        const result                = super.toJSON();
        result[util.timeIRI.hasTRS] = model.Gregorian;
        return result;
    } // DurationDescription#toJSON

} // DurationDescription

module.exports = DurationDescription;
