const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

// TODO : class ProperInterval extends Interval extends TemporalEntity
class ProperInterval {

    #duration               = undefined;
    #xsdDuration            = undefined;
    #hasBeginning           = undefined;
    #hasBeginningSerialized = undefined;
    #hasEndSerialized       = undefined;
    #hasEnd                 = undefined;

    constructor(beginning, end) {
        if (_.isString(beginning) && beginning.startsWith("P")) {
            end = _.buildDate(end);
            _.assert(end, 'ProperInterval#constructor : invalid end', TypeError);

            const duration = _.xsdDuration2durationArray(beginning);
            _.assert(duration, 'ProperInterval#constructor : invalid beginning duration', TypeError);

            const [sign, years, months, days, hours, minutes, seconds] = duration;
            _.assert(sign === '+', 'ProperInterval#constructor : beginning duration must be positive', TypeError);

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
            _.assert(sign === '+', 'ProperInterval#constructor : end duration must be positive', TypeError);

            end = new Date(Date.UTC(
                beginning.getUTCFullYear() + years,
                beginning.getUTCMonth() + months,
                beginning.getUTCDate() + days,
                beginning.getUTCHours() + hours,
                beginning.getUTCMinutes() + minutes,
                beginning.getUTCSeconds() + 1e-3 * beginning.getUTCMilliseconds() + seconds
            ));
            end = _.buildDate(end);
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

        this.#duration    = this.end - this.beginning;
        // TODO : this.#xsdDuration :: das ist bislang auf Millisekunden gerundet "P1.042S" ist das korrekt?
        this.#xsdDuration = _.durationFromDates2xsdDuration(this.dateBeginning, this.dateEnd);

        //_.lockProp(this, '@type', 'date', 'dateBeginning', 'dateEnd', 'beginning', 'end', 'duration');
        _.lockProp(this, '@type', 'date', 'dateBeginning', 'dateEnd', 'beginning', 'end');
    } // ProperInterval#constructor

    $serialize() {

        const result = {
            '@context':       [{
                [time.XSD_PREFIX]:       time.XSD_URI,
                [time.PREFIX]:           time.URI,
                [time.GREGORIAN_PREFIX]: time.GREGORIAN_URI
            }],
            '@type':          'time:ProperInterval',
            'hasDuration':    this['hasDuration'],
            'hasXSDDuration': this['hasXSDDuration']
        };

        if (!this.#hasBeginningSerialized) {
            this.#hasBeginningSerialized = this['hasBeginning']['$serialize']();
            this.#hasBeginningSerialized = {
                "@type":              "time:Instant",
                "inXSDDateTimeStamp": this.#hasBeginningSerialized['inXSDDateTimeStamp']
            };
        } // if ()
        if (!this.#hasEndSerialized) {
            this.#hasEndSerialized = this['hasEnd']['$serialize']();
            this.#hasEndSerialized = {
                "@type":              "time:Instant",
                "inXSDDateTimeStamp": this.#hasEndSerialized['inXSDDateTimeStamp']
            };
        } // if ()

        result['hasBeginning'] = this.#hasBeginningSerialized;
        result['hasEnd']       = this.#hasEndSerialized;

        return result;
    } // ProperInterval#$serialize

    get hasBeginning() {
        this.#hasBeginning = (this.#hasBeginning || new time.Instant(this.beginning));
        return this.#hasBeginning;
    }

    get duration() {
        return this.#duration;
    }

    get hasDuration() {
        return {
            '@type':           'time:Duration',
            'numericDuration': {'@type': "xsd:decimal", '@value': this.#duration},
            'unitType':        'time:unitSecond'
        };
    }

    get 'xsd:duration'() {
        return this.#xsdDuration;
    }

    get hasXSDDuration() {
        return {'@type': "xsd:duration", '@value': this['xsd:duration']};
    }

    get hasEnd() {
        this.#hasEnd = (this.#hasEnd || new time.Instant(this.end));
        return this.#hasEnd;
    }

} // class ProperInterval

module.exports = ProperInterval;

// EOF