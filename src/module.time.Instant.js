const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js')
;

// TODO : extends TemporalEntity
class Instant {

    #year             = undefined;
    #month            = undefined;
    #week             = undefined;
    #day              = undefined;
    #hour             = undefined;
    #minute           = undefined;
    #xsdDateTimeStamp = undefined;
    #hasDuration      = {
        '@type':           'time:Duration',
        'numericDuration': {'@type': "xsd:decimal", '@value': 0},
        'unitType':        'time:unitSecond'
    };
    #xsdDuration      = "P0Y";
    #inTimePosition   = undefined;
    #numericPosition  = undefined;

    constructor(date) {

        this['@type'] = 'time:Instant';

        date = _.buildDate(date);
        _.assert(date, 'Instant#constructor : invalid date', TypeError);

        this.date = date;

        this.dateBeginning = this.date;
        this.dateEnd       = this.dateBeginning;
        this.beginning     = _.dateToSeconds(this.date);
        this.end           = this.beginning;
        this.duration      = C.durationZero;

        this.#numericPosition = {'@type': 'xsd:decimal', '@value': this.beginning};
        this.#inTimePosition  = {
            '@type':           'time:TimePosition',
            'hasTRS':          C.trsUnixTime,
            'numericPosition': this.#numericPosition
        };

        _.lockProp(this, '@type', 'date', 'dateBeginning', 'dateEnd', 'beginning', 'end', 'duration');
    } // Instant#constructor

    $time() {
        return _.getTimeFromDateTimeInSeconds(this.beginning);
    } // Instant#$time

    $serialize() {

        const result        = {
            '@context':       [{
                [time.XSD_PREFIX]:       time.XSD_URI,
                [time.PREFIX]:           time.URI,
                [time.GREGORIAN_PREFIX]: time.GREGORIAN_URI
            }],
            '@type':          'time:Instant',
            'inTimePosition': this.#inTimePosition,
            // TODO : this is MAYBE not correct (so flipped to 'hasDuration'...) duration:           {
            //'hasDuration':        this.#hasDuration,      // REM: dropped, it's useless
            //'hasXSDDuration':     this['hasXSDDuration'], // REM: dropped, it's useless
            'inXSDDateTimeStamp': this['inXSDDateTimeStamp'],
            'inXSDgYear':         this['inXSDgYear'],
            'inXSDgYearMonth':    this['inXSDgYearMonth'],
            'inDateTime':         this['inDateTime']
        };
        // REM: dropped, it's useless
        //result.hasBeginning = {
        //    '@type':            "time:Instant",
        //    inXSDDateTimeStamp: this['inXSDDateTimeStamp']
        //};
        // REM: dropped, it's useless
        //result.hasEnd       = {
        //    '@type':            "time:Instant",
        //    inXSDDateTimeStamp: this['inXSDDateTimeStamp']
        //};
        // REM: dropped, it's BAD!!!
        //result['hasBeginning'] = result;
        //result['hasEnd']       = result;

        return result;
    } // Instant#$serialize

    get inTimePosition() {
        return this.#inTimePosition;
    }

    get numericPosition() {
        return this.#numericPosition;
    }

    get 'xsd:gYear'() {
        this.#year = (this.#year || this.date.getUTCFullYear().toString());
        return this.#year;
    }

    get inXSDgYear() {
        return {'@type': "xsd:gYear", '@value': this['xsd:gYear']}
    }

    get year() {
        return {'@type': "xsd:gYear", '@value': this['xsd:gYear']};
    }

    get month() {
        return {'@type': "xsd:gMonth", '@value': this['xsd:gMonth']};
    }

    get week() {
        this.#week = (this.#week || _.getWeekOfYear(this.date))
        return this.#week;
    }

    get 'xsd:gMonth'() {
        this.#month = (this.#month || `--${(this.date.getMonth() + 1).toString().padStart(2, '0')}`);
        return this.#month;
    }

    get inXSDgYearMonth() {
        return {'@type': "xsd:gYearMonth", '@value': this['xsd:gMonth']};
    }

    get 'xsd:dateTimeStamp'() {
        this.#xsdDateTimeStamp = (this.#xsdDateTimeStamp || this.date.toISOString());
        return this.#xsdDateTimeStamp;
    }

    get inXSDDateTimeStamp() {
        return {'@type': "xsd:dateTimeStamp", '@value': this['xsd:dateTimeStamp']};
    }

    get 'xsd:gDay'() {
        this.#day = (this.#day || `---${this.date.getDate().toString().padStart(2, '0')}`);
        return this.#day;
    }

    get day() {
        return {'@type': "xsd:gDay", '@value': this['xsd:gDay']};
    }

    get dayOfYear() {
        return _.getDayOfYear(this.date);
    }

    get dayOfWeek() {
        return time.dayOfWeekToTimeWeek[_.getDayOfWeek(this.date)];
    }

    get hour() {
        this.#hour = (this.#hour || this.date.getHours().toString());
        return {'@type': "xsd:nonNegativeInteger", '@value': this.#hour};
    }

    get minute() {
        this.#minute = (this.#minute || this.date.getHours().toString());
        return {'@type': "xsd:nonNegativeInteger", '@value': this.#minute};
    }

    get hasDuration() {
        return this.#hasDuration;
    }

    get 'xsd:duration'() {
        return this.#xsdDuration;
    }

    get hasXSDDuration() {
        return {'@type': "xsd:duration", '@value': this.#xsdDuration};
    }

    get inDateTime() {
        // TODO: is this format correct?!? aligned to time-ontology?
        return {
            '@type': 'time:DateTimeDescription',
            // TODO: timeZone:    "https://www.timeanddate.com/time/zones/aest",
            unitType:    'unitMinute',
            year:        this['year'],
            month:       this['month'],
            monthOfYear: time.XsdgMonthGregorianMonth[this['month']['@value']],
            week:        this['week'],
            day:         this['day'],
            dayOfWeek:   this['dayOfWeek'],
            dayOfYear:   this['dayOfYear'],
            hour:        this['hour'],
            minute:      this['minute']
            // TODO: second
        };
    } // get inDateTime

} // Instant

Object.defineProperties(Instant, {
    '@context': [{
        "@base":  "http://www.w3.org/2006/time",
        '@vocab': "#"
    }],
    '@id':      {value: "time:Instant"}
});

module.exports = Instant;