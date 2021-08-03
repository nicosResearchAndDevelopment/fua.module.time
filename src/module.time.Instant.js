const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

class Instant {

    constructor(date) {
        date = _.buildDate(date);
        _.assert(date, 'Instant#constructor : invalid date', TypeError);

        this['@type']      = 'time:Instant';
        this.date          = date;
        this.dateBeginning = this.date;
        this.dateEnd       = this.dateBeginning;
        this.beginning     = _.dateToSeconds(this.date);
        this.end           = this.beginning;
        this.duration      = C.durationZero;

        _.lockProp(this, '@type', 'date', 'dateBeginning', 'dateEnd', 'beginning', 'end', 'duration');
    } // Instant#constructor

    $time() {
        return _.getTimeFromDateTimeInSeconds(this.beginning);
    } // Instant#$time

    $serialize() {
        const result = {
            '@type':        'time:Instant',
            inTimePosition: {
                '@type':         'time:TimePosition',
                hasTRS:          C.trsUnixTime,
                numericPosition: {
                    '@type':  'xsd:decimal',
                    '@value': this.beginning
                }
            },
            // TODO : thsi is MAYBE not correct (so flipped to 'hasDuration'...) duration:           {
            hasDuration:        {
                '@type':         'time:Duration',
                numericDuration: 0,
                unitType:        'time:unitSecond'
            },
            hasXSDDuration:     {'@type': "xsd:duration", '@value': "P0Y"},
            inXSDDateTimeStamp: this.date.toISOString(),
            inXSDgYear:         this.date.getFullYear(),
            inXSDgYearMonth:    this.date.getFullYear().toString() + '-' + (this.date.getMonth() + 1).toString().padStart(2, '0'),
            inDateTime:         {
                '@type':       'time:DateTimeDescription',
                'time:minute': {
                    '@type':  'xsd:nonNegativeInteger',
                    '@value': this.date.getMinutes().toString()
                },
                'time:hour':   {
                    '@type':  'xsd:nonNegativeInteger',
                    '@value': this.date.getHours().toString()
                },
                'time:day':    {
                    '@type':  "xsd:gDay",
                    '@value': '---' + this.date.getDate().toString().padStart(2, '0')
                },
                'time:year':   {
                    '@type':  'xsd:gYear',
                    '@value': this.date.getFullYear().toString()
                }
            }
        };

        result.hasBeginning = result;
        result.hasEnd       = result;

        return result;
    } // Instant#$serialize

    get 'xsd:gYear'() {
        return this.date.getUTCFullYear().toString();
    } // Instant#xsd:gYear

} // Instant

module.exports = Instant;