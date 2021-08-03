const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

// REM draft for TRS usage
class Time {

    constructor(trs = 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian') {
        _.assert(_.isString(trs), 'expected trs to be a string');
        this.trs = trs;
        _.lockProp(this, 'trs');
    } // Time#constructor

    buildTemporalEntity(beginning, end) {
        let temporalEntity = null;
        switch (this.trs) {
            case 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian':
                if (!end) temporalEntity = new time.Instant(beginning);
                else temporalEntity = new time.ProperInterval(beginning, end);
                break;
        }
        _.assert(temporalEntity, 'Time#buildTemporalEntity : could not build a temporal entity from trs ' + this.trs);
        temporalEntity.trs = this.trs;
        _.lockProp(temporalEntity, 'trs');
        return temporalEntity;
    } // Time#buildTemporalEntity

    // TODO methods

} // Time

module.exports = Time;
