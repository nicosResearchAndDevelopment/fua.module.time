const
    _     = require('./module.time.util.js'),
    C     = require('./module.time.constants.js'),
    time  = require('./module.time.js') // REM : grogorian/UTC
    //

    //
    //,
    //geol         = require('./module.time.geol.js'),
    //anthropozean = require('./module.time.anthropozean.js'), // REM: "Anthropozän"@de
    //ad           = require('./module.time.ad.js'), // anno domini
;
let times = {
    "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian": time
};

// REM draft for TRS usage
class Time {

    //#trs            = undefined;
    //#Instant        = undefined;
    //#ProperInterval = undefined;

    constructor(trs = 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian') {

        _.assert(_.isString(trs), 'expected trs to be a string');

        this.trs = trs;
        _.lockProp(this, 'trs');

        // TODO :: OR
        //this.#trs            = trs;
        //this.#Instant        = times[trs]['Instant'];
        //this.#ProperInterval = times[trs]['ProperInterval'];

    } // Time#constructor

    buildTemporalEntity(beginning, end) {
        let temporalEntity = null;
        switch (this.trs) {
            // TODO : OR
            //switch (this.#trs) {
            case 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian':
                if (!end) {
                    temporalEntity = new time.Instant(beginning);
                    // TODO :: OR
                    // temporalEntity = new this.#Instant(beginning);
                } else {
                    temporalEntity = new time.ProperInterval(beginning, end);
                } // if ()
                break;
        }
        _.assert(temporalEntity, 'Time#buildTemporalEntity : could not build a temporal entity from trs ' + this.trs);
        // TODO : OR
        //_.assert(temporalEntity, 'Time#buildTemporalEntity : could not build a temporal entity from trs ' + this.#trs);

        temporalEntity.trs = this.trs;
        // TODO :: OR
        //temporalEntity.trs = this.#trs;
        _.lockProp(temporalEntity, 'trs');
        return temporalEntity;
    } // Time#buildTemporalEntity

    // TODO : AND
    //static setTime({'uri': uri, 'module': _module_}) {
    //    if (!times[uri])
    //        times[uri] = _module_;
    //}

    // TODO methods

} // Time

module.exports = Time;
