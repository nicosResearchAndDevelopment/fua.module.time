//https://www.w3.org/TR/owl-time/

module.exports = (
    {
        'context': context = {}
    } = {
        'context': {}
    }
) => {

    const
        NamespaceIndex = context['$getNamespaceIndex'](),
        prefix         = "time",
        URI            = "http://www.w3.org/2006/time",
        vocab          = "#",
        //
        version        = "0",
        subVersion     = "0",
        patch          = "1",
        BaseObjectType = context['BaseObjectType'],
        ObjectType_8   = context['fua']['enum']['NodeClass']['ObjectType_8'],
        Object_1       = context['fua']['enum']['NodeClass']['Object_1'],
        Method_4       = context['fua']['enum']['NodeClass']['Method_4'],
        //
        hourInSeconds  = 3600,
        dayInSeconds   = hourInSeconds * 24,
        //ownContext = {}

        owl            = {'Class': context['owl']['Class']}
        ,
        time           = {}
    ; // const

    //region fn

    //function isOdd(num) {
    //    return (num % 2 === 1);
    //} // function isOdd
    //
    //function isEven(num) {
    //    return !isOdd(num);
    //} // function isEven

    // TODO: move to fua-t
    function isLeapYear(year) {
        return (year % 4 + year % 100 + year % 400 === 0);
    }

    // TODO: move to fua-t
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

    // TODO: move to fua-t
    function daysInSeconds(days) {
        //REM:  /** 7 * 31 */ 217 + /** 4 * 30 */ 120 = 337
        return days * dayInSeconds;
    } // function yearInSeconds

    // TODO: move to fua-t
    function monthsInSeconds(year, months) {
        months        = ((Array.isArray(months)) ? months : [months]);
        let
            leap_year = isLeapYear(year),
            result    = 0
        ;
        months.map(month => {
            result += daysInSeconds(daysOfMonth(month, year));
        });
        return result;
    } // function monthsInSeconds
    ////region TEST
    //let monthsInSeconds_result;
    ////monthsInSeconds_result = monthsInSeconds(2019, 11);
    //monthsInSeconds_result = monthsInSeconds(2019, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    ////endregion TEST

    // TODO: move to fua-t
    function yearInSeconds(year) {
        //REM:  /** 7 * 31 */ 217 + /** 4 * 30 */ 120 = 337
        return (isLeapYear(year) ?  /** 337 + 29 */ 365 : /** 337 + 28 */ 366) * dayInSeconds;
    } // function yearInSeconds
    ////region TEST
    //let yearInSeconds_result;
    //yearInSeconds_result = yearInSeconds(2019);
    ////endregion TEST
    //endregion fn

    //region helper
    // TODO: move to fua-t
    function dayOfWeek(day) {

        day = ((typeof day === 'string') ? day.toLowerCase().replace('.', "") : day);

        let
            //TODO: 0 <= day < 7
            result      = {'@type': undefined, '@v': undefined}
        ;
        result['@v']    = dayOfWeek[day];
        result['@type'] = ((result['@v'] !== undefined) ? "sxd:NonNegativeInteger" : undefined);
        return result;
    } // function Before()

    Object.defineProperties(dayOfWeek, {
        '@id':       {'value': `${prefix}:dayOfWeek`},
        'nc':        {'value': Method_4},
        //
        0:           {'value': 0},
        1:           {'value': 1},
        2:           {'value': 2},
        3:           {'value': 3},
        4:           {'value': 4},
        5:           {'value': 5},
        6:           {'value': 6},
        'sunday':    {'value': 0},
        'sun':       {'value': 0},
        'monday':    {'value': 1},
        'mon':       {'value': 1},
        'wednesday': {'value': 2},
        'wed':       {'value': 2},
        'tuesday':   {'value': 3},
        'tue':       {'value': 3},
        'thu':       {'value': 4},
        'friday':    {'value': 5},
        'fri':       {'value': 5},
        'saturday':  {'value': 6},
        'sat':       {'value': 6}
    });

    //endregion helper

    Object.defineProperties(time, {
        '@base':           {
            'enumerable': true,
            'value':      {'@id': "http://www.w3.org/2006/time", '@vocab': "#", '@prefix': true}
        },
        '$NamespaceIndex': {
            'enumerable': false,
            'value':      NamespaceIndex
        },
        '$IMI':            {
            'enumerable': false,
            'value':      context['$getModelIndex']()
        },
        'const':           {
            'enumerable': false,
            'value':      {}
        }
    });
    context['$ModelIndexBuilder']({'context': context, 'NamespaceIndex': NamespaceIndex, 'SubmodelIndex': 0});

    class TRS extends BaseObjectType {

        constructor({
                        'p': p = {
                            '@id': id
                        }
                    }) {

            p['nc'] = Object_1;

            super({'p': p});

            //if (this['__proto__']['constructor']['name'] === "TRS")
            //    throw new Error(`class 'TRS' is abstract, so it can NOT be instantiated directly`);

        } // constructor
    } // class TRS
    Object.defineProperties(TRS, {
        '@id': {'value': `${prefix}:TRS`},
        'ia':  {'value': false},
        'nc':  {'value': ObjectType_8}
    });

    class TemporalEntity extends owl.Class {

        constructor({
                        'p': p = {
                            '@id':                    id,
                            'before':                 before, /** TemporalEntity */
                            'hasBeginning':           {
                                                          date
                                                      }['@type'] = undefined, /** Instant */
                            'hasDuration':            {
                                'months': /** integer */  0,
                                /** decimal */ 'seconds': 0
                            }, /** Duration, xsd:duration */
                            'hasDurationDescription': p.hasDurationDescription, /** GeneralDurationDescription */
                            'hasEnd':                 {
                                                          date
                                                      }['@type'] = undefined /** Instant */
                        }
                    }) {

            p['nc'] = Object_1;

            super({'p': p});

            if (this['__proto__']['constructor']['name'] === "TemporalEntity")
                throw new Error(`class 'TemporalEntity' is abstract, so it can NOT be instantiated directly`);

            if (p.hasBeginning) {
                switch (p.hasBeginning['@type']) {
                    case "script:Date":
                    case context['script']['Date']:
                        p.hasBeginning['ms'] = p.hasBeginning['date']['getUTCMilliseconds']();
                        p.hasBeginning['s']  = p.hasBeginning['date']['getUTCSeconds']();
                        p.hasBeginning['m']  = p.hasBeginning['date']['getUTCMinutes']();
                        p.hasBeginning['h']  = p.hasBeginning['date']['getUTCHours']();
                        p.hasBeginning['D']  = p.hasBeginning['date']['getUTCDate']();
                        p.hasBeginning['M']  = p.hasBeginning['date']['getUTCMonth'](); //REM: Jan === 0
                        p.hasBeginning['Y']  = p.hasBeginning['date']['getUTCFullYear']();

                        p.hasBeginning = [
                            Math.floor((p.hasBeginning['date']['getUTCFullYear']() * 12) + p.hasBeginning['date']['getUTCMonth']()),
                            (
                                p.hasBeginning['date']['getUTCDate']() * dayInSeconds +
                                p.hasBeginning['date']['getUTCHours']() * hourInSeconds +
                                p.hasBeginning['date']['getUTCMinutes']() * 60 +
                                p.hasBeginning['date']['getUTCSeconds']() +
                                p.hasBeginning['date']['getUTCMilliseconds']() / 1000.0
                            )
                        ];
                        break; // script:Date
                    default:
                        throw new Error();
                } // switch(p.hasBeginning['@type'])
            } else {
                p.hasBeginning = [0,0];
            } // if ()
            if (p.hasEnd) {
                switch (p.hasEnd['@type']) {
                    case "script:Date":
                    case context['script']['Date']:
                        p.hasEnd['ms'] = p.hasEnd['date']['getUTCMilliseconds']();
                        p.hasEnd['s']  = p.hasEnd['date']['getUTCSeconds']();
                        p.hasEnd['m']  = p.hasEnd['date']['getUTCMinutes']();
                        p.hasEnd['h']  = p.hasEnd['date']['getUTCHours']();
                        p.hasEnd['D']  = p.hasEnd['date']['getUTCDate']();
                        p.hasEnd['M']  = p.hasEnd['date']['getUTCMonth'](); //REM: Jan === 0
                        p.hasEnd['Y']  = p.hasEnd['date']['getUTCFullYear']();

                        p.hasEnd = [
                            Math.floor(p.hasEnd['date']['getUTCFullYear']() * 12 + p.hasEnd['date']['getUTCMonth']()),
                            (
                                p.hasEnd['date']['getUTCDate']() * dayInSeconds +
                                p.hasEnd['date']['getUTCHours']() * hourInSeconds +
                                p.hasEnd['date']['getUTCMinutes']() * 60 +
                                p.hasEnd['date']['getUTCSeconds']() +
                                p.hasEnd['date']['getUTCMilliseconds']() / 1000.0
                            )
                        ];
                        break; // script:Date
                    default:
                        throw new Error();
                } // switch(p.hasEnd['@type'])
            } else {
                p.hasEnd = [0,0];

            } // if ()
            p.hasDuration = [(p.hasEnd[0] - p.hasBeginning[0]), (p.hasEnd[1] - p.hasBeginning[1])];

            //Object.defineProperty(p.hasDuration, 'getMilliseconds', {'get': () => {
            //    return 42;
            //}});
            Object.defineProperties(this, {
                'before':                 {'get': () => p.before},
                'hasBeginning':           {'get': () => p.hasBeginning},
                'hasDuration':            {
                    'get': () => context.xsd.duration({
                        'months': /** integer */  p.hasDuration[0],
                        /** decimal */ 'seconds': p.hasDuration[1]
                    })
                },
                'hasDurationDescription': {'get': () => p.hasDurationDescription},
                'hasEnd':                 {'get': () => p.hasEnd}
            });

        } // constructor
    } // class TemporalEntity

    Object.defineProperties(TemporalEntity, {
        '@id': {'value': `${prefix}:TemporalEntity`},
        'ia':  {'value': true},
        'nc':  {'value': ObjectType_8}
    });

    class Instant extends TemporalEntity {
        constructor({
                        'p': p = {
                            '@id':            id,
                            'hasBeginning':   hasBeginning,
                            'inTimePosition': inTimePosition /** xsd:dateTimeStamp */
                        }
                    }) {

            p['nc'] = Object_1;

            super({'p': p});

        } // constructor
    } // class Instant

    Object.defineProperties(Instant, {
        '@id': {'value': `${prefix}:Instant`},
        'ia':  {'value': false},
        'nc':  {'value': ObjectType_8}
    });

    class Interval extends TemporalEntity {
        constructor({
                        'p': p = {
                            //'hasBeginning':   has_beginning,
                            //'inTimePosition': in_time_position /** xsd:dateTimeStamp */
                        }
                    }) {

            p['nc'] = Object_1;

            super({'p': p});

        } // constructor
    } // class Interval

    Object.defineProperties(Interval, {
        '@id': {'value': `${prefix}:Interval`},
        'ia':  {'value': false},
        'nc':  {'value': ObjectType_8}
    });

    //region functions
    function Before({'i': i, 'j': j, 'returnType': returnType = "return"}) {
        let
            result = {'s': true, 'v': undefined}
        ;
        switch (returnType) {
            case "return":
            default:
                return result;
        } // switch (returnType)
    } // function Before()

    Object.defineProperties(Before, {
        '@id': {'value': `${prefix}:Before`},
        'nc':  {'value': Method_4}
    });

    function After({'i': i, 'j': j, 'returnType': returnType = "return"}) {
        let
            result = {'s': true, 'v': undefined}
        ;
        switch (returnType) {
            case "return":
            default:
                return result;
        } // switch (returnType)
    } // function After()

    Object.defineProperties(After, {
        '@id': {'value': `${prefix}:After`},
        'nc':  {'value': Method_4}
    });

    //endregion functions

    Object.defineProperties(time, {
        'TRS':            {'enumerable': true, 'value': TRS},
        'TemporalEntity': {'enumerable': true, 'value': TemporalEntity},
        'Instant':        {'enumerable': true, 'value': Instant},
        'Interval':       {'enumerable': true, 'value': Interval},
        'Before':         {'enumerable': false, 'value': Before},
        'After':          {'enumerable': false, 'value': After},
        //helper
        'dayOfWeek':      {'enumerable': false, 'value': dayOfWeek}
    });

    Object.seal(time);

    //region TEST
    //let grunz = time.dayOfWeek("sun");
    //grunz = time.dayOfWeek("Monday");
    //grunz = time.dayOfWeek("Fri.");
    //endregion TEST

    context['$addSpaceType']([
        time['TRS'],
        time['TemporalEntity'],
        time['Instant'],
        time['Interval']
    ]);

    return {
        '$version': `${version}.${subVersion}.${patch}`,
        'time':     time
    }; // return

};