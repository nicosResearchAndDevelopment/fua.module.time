// https://www.w3.org/TR/owl-time/
// https://www.w3.org/2006/time#
module.exports = (
    {
        'root':          root = "1/",
        'namespace':     namespace = "time",
        'setInstanceId': setInstanceId = true
    }) => {

    const
        map                            = new Map(),
        prefix                         = namespace, // "fua-t"
        //
        secondInMilliseconds           = 1000,
        minuteInSeconds                = 60,
        minuteInMilliseconds           = Math.floor(minuteInSeconds * secondInMilliseconds),
        secondInMinutes                = (1 / minuteInSeconds),
        hourInSeconds                  = Math.floor(minuteInSeconds * 60), // 60 * 60 = 3600
        hourInMilliseconds             = Math.floor(hourInSeconds * secondInMilliseconds),
        hourInMinutes                  = 60,
        secondInHours                  = (1 / hourInSeconds),
        dayInSeconds                   = Math.floor(hourInSeconds * 24), // 86400,
        dayInMinutes                   = 1440,
        dayInHours                     = 24,
        dayInMilliseconds              = Math.floor(dayInSeconds * secondInMilliseconds),
        weekInSeconds                  = Math.floor(7 * dayInSeconds),
        weekInMinutes                  = Math.floor(7 * dayInMinutes),
        weekInHours                    = Math.floor(7 * dayInHours),
        weekInMilliseconds             = Math.floor(weekInSeconds * secondInMilliseconds),
        month28inSeconds               = Math.floor(28 * dayInMilliseconds), // 2419200,
        month28inMilliseconds          = Math.floor(month28inSeconds * secondInMilliseconds),
        month29inSeconds               = month28inSeconds + dayInSeconds,
        month29inMilliseconds          = Math.floor(month29inSeconds * secondInMilliseconds),
        month30inSeconds               = month29inSeconds + dayInSeconds,
        month30inMilliseconds          = Math.floor(month30inSeconds * secondInMilliseconds),
        month31inSeconds               = month30inSeconds + dayInSeconds,
        month31inMilliseconds          = Math.floor(month31inSeconds * secondInMilliseconds),
        months                         = {
            0:  {'days': 31, 'seconds': month31inSeconds},
            1:  {
                28: {'days': 28, 'seconds': month28inSeconds, 'milliseconds': month28inMilliseconds},
                29: {'days': 29, 'seconds': month29inSeconds, 'milliseconds': month29inMilliseconds}
            },
            2:  {'days': 31, 'seconds': month31inSeconds, 'milliseconds': month31inMilliseconds},
            3:  {'days': 30, 'seconds': month30inSeconds, 'milliseconds': month30inMilliseconds},
            4:  {'days': 31, 'seconds': month31inSeconds, 'milliseconds': month31inMilliseconds},
            5:  {'days': 30, 'seconds': month30inSeconds, 'milliseconds': month30inMilliseconds},
            6:  {'days': 31, 'seconds': month31inSeconds, 'milliseconds': month31inMilliseconds},
            7:  {'days': 31, 'seconds': month31inSeconds, 'milliseconds': month31inMilliseconds},
            8:  {'days': 30, 'seconds': month30inSeconds, 'milliseconds': month30inMilliseconds},
            9:  {'days': 31, 'seconds': month31inSeconds, 'milliseconds': month31inMilliseconds},
            10: {'days': 30, 'seconds': month30inSeconds, 'milliseconds': month30inMilliseconds},
            11: {'days': 31, 'seconds': month31inSeconds, 'milliseconds': month31inMilliseconds}
        },
        leapYearInDays                 = 366, // 7 * 31 = 217, 4 * 30 = 120, 29
        leapYearInSeconds              = (leapYearInDays * dayInSeconds),
        leapYearInMilliseconds         = (leapYearInDays * dayInMilliseconds),
        nonLeapYearInDays              = 365,
        nonLeapInSeconds               = (nonLeapYearInDays * dayInSeconds), // 7 * 31 = 217, 4 * 30 = 120, 29
        nonLeapInMilliseconds          = (nonLeapYearInDays * dayInMilliseconds),
        monthsWithoutFebInSeconds      = Math.floor((7 * month31inSeconds) + (4 * month30inSeconds)),
        monthsWithoutFebInMilliseconds = Math.floor(monthsWithoutFebInSeconds * secondInMilliseconds),
        //
        durationZero                   = 0,
        durationZeroPeriod             = "P0Y",
        durationRegex                  = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/i,
        //
        trs_Unix_time                  = "http://dbpedia.org/resource/Unix_time",
        _trs                           = new Map([[trs_Unix_time, trs_Unix_time]]),
        //
        time                           = {}
    ; // const

    //region fn

    function properLeftRight(left, right) {
        return true;
    } // properLeftRight

    function buildDate(value) {
        let result = undefined;
        switch (typeof value) {
            case "string":
                //value^^xsd:dateTemeStamp
                result = new Date(value);
                break;
            case "number":
                //value^^xsd:second
                result = new Date((value * 1000));
                break;
            case "object":
                if (value instanceof Date) {
                    result = value;
                } else if (value instanceof Instant) {
                    result = value['date'];
                } // if ()
                break; // object
            default:
                break; // default
        } // switch ()
        return result;
    } // buildDate()

    function buildTemporalEntities(i, j, trs) {
        trs = trs || context['$trs'] || "marzipanhausen";
        let _i, _j;
        if (i.length > 1) {
            _i = new context['time']['Interval']({
                'p': {
                    '@id':       `${trs['@id']}/${i[0]}---${i[1]}`,
                    'nb':        [trs['@id'], `${i[0]}---${i[1]}`],
                    'nd':        `${i[0]}---${i[1]}`,
                    'trs':       trs,
                    'beginning': i[0],
                    'end':       i[1]
                }
            });
        } else {
            _i = new context['time']['Instant']({
                'p': {
                    '@id':      `${trs['@id']}/${i[0]}Y`,
                    'nb':       [trs['@id'], `${i[0]}`],
                    'nd':       `${i[0]}}`,
                    'trs':      trs,
                    'dateTime': i[0]
                }
            });
        } // if ()
        if (j.length > 1) {
            _j = new context['time']['Interval']({
                'p': {
                    '@id':       `${trs['@id']}/${j[0]}---${j[1]}`,
                    'nb':        [trs['@id'], `${j[0]}---${j[1]}`],
                    'nd':        `${j[0]}---${j[1]}`,
                    'trs':       trs,
                    'beginning': j[0],
                    'end':       j[1]
                }
            });
        } else {
            _j = new context['time']['Instant']({
                'p': {
                    '@id':      `${trs['@id']}/${j[0]}Y`,
                    'nb':       [trs['@id'], `${j[0]}`],
                    'nd':       `${j[0]}}`,
                    'trs':      trs,
                    'dateTime': j[0]
                }
            });
        } // if ()
        return {'_i': _i, '_j': _j};
    } // buildTemporalProperties()

    function padZero(value) {
        return ((value === undefined) ? "00" : ((value < 10) ? `0${value}` : `${value}`));
    } // padZero

    function isLeapYear(year) {
        //return (year % 4 + year % 100 + year % 400 === 0);
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    } // isLeapYear

    function daysOfMonth(month, year) {
        if (month === 1)
            return isLeapYear(year) ? 28 : 29;
        return (
            month === 3 || /** april     */
            month === 6 || /** june      */
            month === 8 || /** september */
            month === 10   /** november  */
        ) ? 30 : 31;
    } // function daysOfMonth

    function daysInSeconds(days) {
        return days * dayInSeconds;
    } // function daysInSeconds

    function monthsInSeconds(year, months) {
        months     = ((Array.isArray(months)) ? months : [months]);
        let
            result = 0
        ;
        months.map(month => {
            result += daysInSeconds(daysOfMonth(month, year));
        });
        return result;
    } // function monthsInSeconds

    function yearInSeconds(year) {
        return (isLeapYear(year) ?  /** 337 + 29 */ 365 : /** 337 + 28 */ 366) * dayInSeconds;
    } // function yearInSeconds

    //endregion fn

    //region helper

    function getTemporalEntity(parameter) {
        let temporalEntity;
        switch (typeof parameter) {
            case "object":
                temporalEntity = new ProperInterval(parameter[0], parameter[1]);
                break;
            case "string":
            default:
                temporalEntity = new Instant(parameter);
                break;
        } // switch()
        return temporalEntity;
    }

    function dayOfWeek(day) {
        day              = ((typeof day === 'string') ? day.toLowerCase().replace('.', "") : day);
        let
            //TODO: 0 <= day < 7
            result       = {'@type': undefined, '@value': undefined}
        ;
        result['@value'] = dayOfWeek[day];
        result['@type']  = ((result['@value'] !== undefined) ? "sxd:NonNegativeInteger" : undefined);
        return result;
    } // function dayOfWeek()

    Object.defineProperties(dayOfWeek, {
        '@id':       {value: `${prefix}:dayOfWeek`},
        //
        0:           {value: 0},
        1:           {value: 1},
        2:           {value: 2},
        3:           {value: 3},
        4:           {value: 4},
        5:           {value: 5},
        6:           {value: 6},
        //
        'sunday':    {value: 0},
        'sun':       {value: 0},
        'monday':    {value: 1},
        'mon':       {value: 1},
        'wednesday': {value: 2},
        'wed':       {value: 2},
        'tuesday':   {value: 3},
        'tue':       {value: 3},
        'thu':       {value: 4},
        'friday':    {value: 5},
        'fri':       {value: 5},
        'saturday':  {value: 6},
        'sat':       {value: 6}
    }); // Object.defineProperties(dayOfWeek)

    Object.defineProperties(dayOfWeek, {
        '@id': {value: `${prefix}:dayOfWeek`}
    });

    /**
     *
     * @param dateTime
     * @param resultType
     * @returns {string|(*|number)[]}
     * seeAlso: <https://www.w3.org/TR/xmlschema-2/#gMonthDay>
     */
    function getGMonthDayFromDateTime(dateTime, resultType) {
        let date = buildDate(dateTime);
        switch ((resultType) ? resultType : "xsd:gMonthDay") {
            case "gMonthDayArray":
                return [(date['getUTCMonth']() + 1), (date['getUTCDate']() - 1)];
                break;
            case "xsd:gMonthDay":
            default:
                return `--${padZero(date['getUTCMonth']() + 1)}-${(padZero(date['getUTCDate']() - 1))}`;
                break;
        } // switch()
    } // getGMonthFromDateTime()

    function getTimeFromDateTimeInSeconds(dateTimeInSeconds) {
        return (dateTimeInSeconds % dayInSeconds);
    } // getTimeFromDateTimeInSeconds()

    function dateToSeconds(date) {
        return (date['valueOf']() / 1000.0);
    } // dateToSeconds

    function getNumericDuration(beginning, end) {
        return (end - beginning);
    } // getNumericDuration

    function xsdDuration2durationArray(xsdDuration) {
        let result = durationRegex.exec(xsdDuration);
        return result ? [
            result[1] || "+",
            ...(result.slice(2, 7).map(val => parseInt(val || 0))),
            parseFloat(result[7] || 0)
            //,{'@type': "xsd:Second", '@v': undefined}
        ] : undefined;
    } // xsdDuration2durationArray()

    function durationArray2xsdDuration(durationArray) {
        let result = `${((durationArray[0] === "-") ? "-" : "")}P${((durationArray[1] !== 0) ? `${durationArray[1]}Y` : "")}${((durationArray[2] !== 0) ? `${durationArray[2]}M` : "")}${((durationArray[3] !== 0) ? `${durationArray[3]}D` : "")}T${((durationArray[4] !== 0) ? `${durationArray[4]}H` : "")}${((durationArray[5] !== 0) ? `${durationArray[5]}M` : "")}${((durationArray[6] !== 0) ? `${durationArray[6]}S` : "")}`;
        result     = (result.endsWith("T") ? result.slice(0, -1) : result);
        return ((result === "P") ? durationZeroPeriod : result);
    } // xsdDuration2durationArray()

    function durationFromDatesDiff2xsdDuration(diff, leapDays) {
        // REM: "+" so it is positive ever?!?
        //return durationArray2xsdDuration(["+", (diff.getUTCFullYear() - 1970), diff.getUTCMonth(), (diff.getUTCDate() - (1 + leapDays)), diff.getUTCHours(), diff.getUTCMinutes(), (diff.getUTCSeconds() + (diff.getUTCMilliseconds() / 1000))]);
        //return durationArray2xsdDuration(["+", (diff.getUTCFullYear() - 1970), diff.getUTCMonth(), (diff.getUTCDate() - ((leapDays === 0) ? 1 : ((leapDays === 1) ? 2 : 2))), diff.getUTCHours(), diff.getUTCMinutes(), (diff.getUTCSeconds() + (diff.getUTCMilliseconds() / 1000))]);
        //return durationArray2xsdDuration(["+", (diff.getUTCFullYear() - 1970), diff.getUTCMonth(), (diff.getUTCDate() - ((leapDays > 0) ? 2 : 1)), diff.getUTCHours(), diff.getUTCMinutes(), (diff.getUTCSeconds() + (diff.getUTCMilliseconds() / 1000))]);
        //return durationArray2xsdDuration(["+", (diff.getUTCFullYear() - 1970), diff.getUTCMonth(), (diff.getUTCDate() - ((leapDays === 0) ? 1 : leapDays)), diff.getUTCHours(), diff.getUTCMinutes(), (diff.getUTCSeconds() + (diff.getUTCMilliseconds() / 1000))]);
        return durationArray2xsdDuration(["+", (diff.getUTCFullYear() - 1970), diff.getUTCMonth(), (diff.getUTCDate() - ((leapDays > 1) ? 2 : 1)), diff.getUTCHours(), diff.getUTCMinutes(), (diff.getUTCSeconds() + (diff.getUTCMilliseconds() / 1000))]);
    } // durationFromDates2xsdDuration()

    function durationFromDates2xsdDuration(beginning, end) {

        const utc_beginning = Date.UTC(beginning.getFullYear(), beginning.getMonth(), beginning.getDate(), beginning.getHours(), beginning.getMinutes(), (beginning.getSeconds() + (beginning.getMilliseconds() / 1000)));
        const utc_end = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), (end.getSeconds() + (end.getMilliseconds() / 1000)));

        //return durationFromDatesDiff2xsdDuration(new Date(end['getTime']() - beginning['getTime']()), getNumberOfLeapDaysFromInterval({
        return durationFromDatesDiff2xsdDuration(new Date(utc_end - utc_beginning), getNumberOfLeapDaysFromInterval({
            'dateBeginning': beginning,
            'dateEnd':       end
        }));
    } // durationFromDates2xsdDuration()

    function durationFromInstants2xsdDuration(beginning, end) {
        return durationFromDates2xsdDuration(beginning['date'], end['date']);
    } // durationFromInstants2xsdDuration()

    const regexXsdDateTimeStamp2id = new RegExp(/[.:-]/, 'g');

    function xsdDateTimeStamp2id(value) {
        return value.replace(regexXsdDateTimeStamp2id, "_");
    }

    function getNumberOfLeapDaysFromInterval(interval) {
        // TODO: das sollte man DEFINITV anders, intelligenter machen...
        let
            feb  = (interval['dateBeginning']['getMonth']() <= 1),
            afterFeb   = (interval['dateEnd']['getMonth']() > 1),
            start_year = ((interval['dateBeginning']['getMonth']() < 2) ? interval['dateBeginning']['getFullYear']() : (interval['dateBeginning']['getFullYear']() + 1)),
            end_year   = ((interval['dateEnd']['getMonth']() > 1) ? interval['dateEnd']['getFullYear']() : (interval['dateEnd']['getFullYear']() - 1)),
            result     = ((feb && afterFeb) ? 1 : 0)
        ;
        //for (let i = start_year; i <= end_year; i++) {
        for (let i = start_year; i < end_year; i++) {
            if (isLeapYear(i))
                result++;
        } // for (i)
        return result;
    } // getNumberOfLeapDaysFromInterval()

    //endregion helper

    //region individuals

    function now() {
        //return new Instant((new Date).toISOString());
        return new Instant(new Date);
    } // function now()

    class Year {
        constructor(year) {
            if (setInstanceId) this['@id'] = `${root}years/${year}/`
            //this['properInterval'] = new ProperInterval(new Instant(new Date(year, 0, 1)), new Instant(new Date(year, 11, 31)));
            this['year']           = year;
            this['xsd:gYear']      = `${this['year']}`;
            this['properInterval'] = new ProperInterval(new Instant(new Date(year, 0, 1)), new Instant(new Date((year + 1), 0, 1)));
            //this['workingWeeks']   = [];
        } // constructor
    } // class Year()

    //class CalenderWeek {
    //    constructor(year) {
    //        //this['properInterval'] = new ProperInterval(new Instant(new Date(year, 0, 1)), new Instant(new Date((year + 1), 0, 1)));
    //        if (setInstanceId) this['@id'] = `${root}years/${year}/`
    //        this['properInterval'] = new ProperInterval(new Instant(new Date(year, 0, 1)), new Instant(new Date(year, 11, 31)));
    //        this['workingWeeks']   = []
    //    } // constructor
    //} // class CalenderWeek()

    function InsideWorkingWeek(year, workingWeek, temporalEntity) {
        let
            properInterval,
            result = false
        ;
        switch (typeof year) {
            case "number":
                properInterval = new Year(year)['properInterval'];
                break;
            case "object":
            default:
                if (year instanceof ProperInterval) {
                    properInterval = year;
                } else if (year instanceof Year) {
                    properInterval = year['properInterval'];
                } else {
                    return false;
                } // if ()
                break; // default, object
        } // switch()
        return result;
    }

    //endregion individuals

    function Instant(dateTimeStamp) {

        //let node;
        this['date'] = buildDate(dateTimeStamp);

        this['@type']         = `${prefix}:Instant`;
        this['duration']      = durationZero;
        this['beginning']     = this['end'] = dateToSeconds(this['date']);
        this['dateBeginning'] = this['dateEnd'] = this['date'];
        //
        //if (setInstanceId) this['@id'] = `${root}time/instant/${xsdDateTimeStamp2id(this['date']['toISOString']())}`;
        //node = map.get(this['@id']);
        //if (!node) {
        //    node              = this;
        //    node['@type']     = `${prefix}:Instant`;
        //    node['duration']  = durationZero;
        //    node['beginning'] = node['end'] = dateToSeconds(node['date']);
        //    node['instantBeginning'] = node['instantEnd'] = node;
        //    if (node['@id']) map.set(node['@id'], node);
        //} //
        //return node;

    } // Instant
    Object.defineProperties(Instant, {
        '@type': {value: "owl:Class"}
    }); // Object.defineProperties(Instant)
    Object.defineProperties(Instant['prototype'], {
        '$time':      {
            value: function () {
                return getTimeFromDateTimeInSeconds(this['beginning']);
            }
        }, //$time
        '$serialize': {
            value: function () {

                let node = {
                    'inTimePosition': {
                        '@type':           "time:TimePosition",
                        'hasTRS':          `<${trs_Unix_time}>`,
                        'numericPosition': {
                            '@type':  "xsd:decimal",
                            '@value': this['beginning']
                        }
                    }
                };
                Object.defineProperties(node, {
                    '@type':              {value: "time:Instant"},
                    'hasBeginning':       {value: node},
                    'hasEnd':             {value: node},
                    'duration':           {
                        value: {
                            '@type':           "time:Duration",
                            'numericDuration': 0,
                            'unitType':        "time:unitSecond"
                        }
                    },
                    'inXSDDateTimeStamp': {
                        value: this['date'].toISOString()
                    },
                    'inXSDgYear':         {
                        value: this['date']['getFullYear']()
                    },
                    'inXSDgYearMonth':    {
                        value: `${this['date']['getFullYear']()}-${padZero(this['date']['getMonth']() + 1)}`
                    },
                    /**
                     :inDateTime [
                     a :DateTimeDescription ;
                     :day "---01"^^xsd:gDay ;
                     :hour "17"^^xsd:nonNegativeInteger ;
                     :minute "58"^^xsd:nonNegativeInteger ;
                     :month "--11"^^xsd:gMonth ;
                     :second 16.102 ;
                     :timeZone <http://dbpedia.org/page/Coordinated_Universal_Time> ;
                     :year "2015"^^xsd:gYear ;
                     ] ;
                     */
                    'inDateTime':         {
                        value: {
                            '@type':     "time:DateTimeDescription",
                            'time:day':  {'@type': "xsd:gDay", '@value': `---${padZero(this['date'].getDay())}`},
                            'time:hour': {'@type': "xsd:nonNegativeInteger", '@value': this['date'].getHours()}
                        }
                    }
                });
                return node;
            }
        },
        'xsd:gYear':  {
            get: function () {
                return `${this['date'].getUTCFullYear()}`;
            }
        }
    }); // Object.defineProperties(Instant)

    function ProperInterval(beginning, end, duration) {
        //let node;
        this['@type'] = `${prefix}:ProperInterval`
        ;
        let hasDurationType;
        if (
            (!beginning && !end) ||
            (!beginning && !duration) ||
            (!end && !duration)
        ) { // error first!!!
            throw new Error();
        } else if (beginning && end && !duration) {
            this['dateBeginning'] = buildDate(beginning);
            this['dateEnd']       = buildDate(end);
        } else if (beginning && !end && duration) {
            switch (typeof duration) {
                case "string":
                    break; // string
                case "number":
                    break; // number
                default:
                    throw new Error();
                    break; // default
            } // switch()
        } else if (!beginning && end && duration) {
        } // if ()

        this['beginning'] = dateToSeconds(this['dateBeginning']);
        this['end']       = dateToSeconds(this['dateEnd']);
        this['duration']  = (this['end'] - this['beginning']);
        // TODO: getter!
        //this['xsdDuration'] = durationFromDates2xsdDuration(this['dateBeginning'], this['dateEnd']);

        //if (setInstanceId) this['@id'] =
        `${root}/time/instant/${xsdDateTimeStamp2id(this['dateBeginning']['toISOString']())}-${xsdDateTimeStamp2id(this['dateEnd']['toISOString']())}`
        ;
        //node = map.get(this['@id']);
        //if (!node) {
        //    node                = this;
        //    node['beginning']   = dateToSeconds(node['dateBeginning']);
        //    node['end']         = dateToSeconds(node['dateEnd']);
        //    node['duration']    = (node['end'] - node['beginning']);
        //    // TODO: getter!
        //    node['xsdDuration'] = durationFromDates2xsdDuration(node['dateBeginning'], node['dateEnd']);
        //    if (node['@id']) map.set(node['@id'], node);
        //} //
        //return node;

    } // ProperInterval()
    Object.defineProperties(ProperInterval, {
        '@type': {value: "owl:Class"}
    }); // Object.defineProperties(ProperInterval)
    Object.defineProperties(ProperInterval['prototype'], {
        '$serialize':   {
            value: function () {
                let node = {};
                return node;
            }
        },
        //'xsdDuration':  {
        //    get: function () {
        //        return durationFromDatesDiff2xsdDuration(new Date(this['dateEnd']['getTime']() - this['dateBeginning']['getTime']() - ((isLeapYear()) ? 1 : 0)));
        //        //return durationFromDates2xsdDuration(this['dateBeginning']['getTime']() - this['dateEnd']['getTime']());
        //    }
        //},
        'xsd:duration': {
            get: function () {
                return durationFromDates2xsdDuration(this['dateBeginning'], this['dateEnd']);
                //return durationFromDates2xsdDuration(this['dateBeginning']['getTime']() - this['dateEnd']['getTime']());
            }
        }
    }); // Object.defineProperties(ProperInterval['prototype'])

    //region binary operators

    function Before(i, j) {
        if (!properLeftRight())
            throw new Error();
        return (
            i['end']
            <
            j['beginning']
        );
    } // function Before()
    Object.defineProperties(Before, {
        '@id': {
            value:
                `${prefix}:Before`
        }
    });

    //endregion binary operators

    Object.defineProperties(time, {
        '$minuteInSeconds':                  {enumerable: true, value: minuteInSeconds},
        '$hourInSeconds':                    {enumerable: true, value: hourInSeconds},
        '$dayInSeconds':                     {enumerable: true, value: dayInSeconds},
        '$minuteInMilliseconds':             {enumerable: true, value: minuteInMilliseconds},
        '$hourInMilliseconds':               {enumerable: true, value: hourInMilliseconds},
        '$dayInMilliseconds':                {enumerable: true, value: dayInMilliseconds},
        '$buildTemporalEntities':            {enumerable: true, value: buildTemporalEntities},
        '$buildDate':                        {enumerable: true, value: buildDate},
        // duration
        '$getNumberOfLeapDaysFromInterval':  {enumerable: true, value: getNumberOfLeapDaysFromInterval},
        '$durationZeroPeriod':               {enumerable: true, value: durationZeroPeriod},
        '$xsdDuration2durationArray':        {enumerable: true, value: xsdDuration2durationArray},
        '$durationArray2xsdDuration':        {enumerable: true, value: durationArray2xsdDuration},
        '$durationFromInstants2xsdDuration': {enumerable: true, value: durationFromInstants2xsdDuration},
        // gMontDate
        '$getGMonthDayFromDateTime':         {enumerable: true, value: getGMonthDayFromDateTime},
        //
        //'TRS':                    {enumerable: true, value: TRS},
        //'TemporalEntity':         {enumerable: true, value: TemporalEntity},
        'Instant':                           {enumerable: true, value: Instant},
        //'Interval':               {enumerable: true, value: Interval},
        'ProperInterval':                    {enumerable: true, value: ProperInterval},
        // operators
        'Before':                            {enumerable: false, value: Before},
        //'After':                  {enumerable: false, value: After},
        //'Meets':                  {enumerable: false, value: Meets},
        //'MetBy':                  {enumerable: false, value: MetBy},
        //'Overlaps':               {enumerable: false, value: Overlaps},
        //'OverlappedBy':           {enumerable: false, value: OverlappedBy},
        //'Starts':                 {enumerable: false, value: Starts},
        //'StartedBy':              {enumerable: false, value: StartedBy},
        //'During':                 {enumerable: false, value: During},
        //'Contains':               {enumerable: false, value: Contains},
        //'Finishes':               {enumerable: false, value: Finishes},
        //'FinishedBy':             {enumerable: false, value: FinishedBy},
        //'Equals':                 {enumerable: false, value: Equals},
        //'In':                     {enumerable: false, value: In},
        //'Disjoint':               {enumerable: false, value: Disjoint},
        // helper
        //'dayOfWeek':      {enumerable: false, value: dayOfWeek},
        // individuals
        'now':                               {enumerable: false, value: now},
        'Year':                              {enumerable: true, value: Year},
        '$isLeapYear':                       {enumerable: true, value: isLeapYear},
        //extension
        'trs':                               {
            'set': (trs) => {
                if ((trs['@type'] === TRS) && !_trs.get(trs['@id']))
                    _trs.set(trs['@id'], trs);
            } // set
        }
    });

    Object.seal(time);

    return time;

};