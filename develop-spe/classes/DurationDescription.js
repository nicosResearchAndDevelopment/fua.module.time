const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class DurationDescription extends model.GeneralDurationDescription {

    constructor(param) {
        super(param);
        const hasTRS = super.hasTRS.get();
        if (!model.Gregorian.equals(hasTRS))
            throw new Error('hasTRS must be Gregorian for DurationDescription');
        if (hasTRS !== model.Gregorian) super.hasTRS.set(model.Gregorian);
        super.hasTRS.lock();
    } // DurationDescription#constructor

} // DurationDescription

module.exports = DurationDescription;
