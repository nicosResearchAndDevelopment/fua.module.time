const
    _    = require('./util.js'),
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
        this.duration      = 0;

        // REM: lock the properties and make the instant immutable?
        //_.lockProp(this, '@type', 'date', 'dateBeginning', 'dateEnd', 'beginning', 'end', 'duration');
    } // Instant#constructor

    // TODO: rethink interface

    $time() {
        return getTimeFromDateTimeInSeconds(this.beginning);
    } // Instant#$time

    $serialize() {
        const result = {
            '@type':            'time:Instant',
            inTimePosition:     {
                '@type':         'time:TimePosition',
                hasTRS:          _.UNIX_TIME,
                numericPosition: {
                    '@type':  'xsd:decimal',
                    '@value': this.beginning
                }
            },
            duration:           {
                '@type':         'time:Duration',
                numericDuration: 0,
                unitType:        'time:unitSecond'
            },
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

} // Instant

module.exports = Instant;