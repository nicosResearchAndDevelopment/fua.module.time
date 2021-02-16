const
    _    = require('./util.js'),
    time = require('./module.time.js');

class ProperInterval {

    constructor(beginning, end) {
        if (_.isString(beginning) && beginning.startsWith("P")) {
            end = _.buildDate(end);
            _.assert(end, 'ProperInterval#constructor : invalid end', TypeError);

            const duration = _.xsdDuration2durationArray(beginning);
            _.assert(duration, 'ProperInterval#constructor : invalid beginning duration', TypeError);

            // TODO: should the check for sign really be "+" and not "-" here?
            const [sign, years, months, days, hours, minutes, seconds] = duration;
            _.assert(sign === "+", 'ProperInterval#constructor : beginning duration must be positive', TypeError);

            beginning = new Date(Date.UTC(
                end.getUTCFullYear() - years,
                end.getUTCMonth() - months,
                end.getUTCDate() - days,
                end.getUTCHours() - hours,
                end.getUTCMinutes() - minutes,
                end.getUTCSeconds() + 1e-3 * end.getUTCMilliseconds() - seconds
            ));
        } else if (_.isString(end) && end.startsWith("P")) {
            beginning = _.buildDate(beginning);
            _.assert(beginning, 'ProperInterval#constructor : invalid beginning', TypeError);

            const duration = _.xsdDuration2durationArray(end);
            _.assert(duration, 'ProperInterval#constructor : invalid end duration', TypeError);

            const [sign, years, months, days, hours, minutes, seconds] = duration;
            _.assert(sign === "+", 'ProperInterval#constructor : end duration must be positive', TypeError);

            end = new Date(Date.UTC(
                beginning.getUTCFullYear() + years,
                beginning.getUTCMonth() + months,
                beginning.getUTCDate() + days,
                beginning.getUTCHours() + hours,
                beginning.getUTCMinutes() + minutes,
                beginning.getUTCSeconds() + 1e-3 * beginning.getUTCMilliseconds() + seconds
            ));
        } else {
            beginning = _.buildDate(beginning);
            _.assert(beginning, 'ProperInterval#constructor : invalid beginning', TypeError);

            end = _.buildDate(end);
            _.assert(end, 'ProperInterval#constructor : invalid end', TypeError);
        } // if ()

        _.assert(beginning.valueOf() < end.valueOf(), 'ProperInterval#constructor : the end must come after the beginning');

        this['@type']      = 'time:ProperInterval';
        this.date          = null;
        this.dateBeginning = beginning;
        this.dateEnd       = end;
        this.beginning     = _.dateToSeconds(this.dateBeginning);
        this.end           = _.dateToSeconds(this.dateEnd);
        this.duration      = this.end - this.beginning;

        // REM: lock the properties and make the instant immutable?
        //_.lockProp(this, '@type', 'date', 'dateBeginning', 'dateEnd', 'beginning', 'end', 'duration');
    } // ProperInterval#constructor

    // TODO: rethink interface

    $serialize() {
        // TODO: unfinished
    } // // ProperInterval#$serialize

} // ProperInterval

module.exports = ProperInterval;