// https://www.w3.org/TR/owl-time/
// https://www.w3.org/2006/time#
module.exports = (
    {
        //'IM':        IM,
        'uuid':      uuid,
        'namespace': namespace = "time"
        //'space':     space
    }) => {

    const
        //NamespaceIndex = context['$getNamespaceIndex'](),
        prefix          = "time", // "fua-t"
        //URI            = "http://www.w3.org/2006/time",
        //vocab          = "#",
        //
        version         = "0",
        subVersion      = "0",
        patch           = "3",
        //BaseObjectType = context['BaseObjectType'],
        //ObjectType_8   = context['fua']['enum']['NodeClass']['ObjectType_8'],
        //Object_1       = context['fua']['enum']['NodeClass']['Object_1'],
        //Method_4       = context['fua']['enum']['NodeClass']['Method_4'],
        //
        minuteInSeconds = 60,
        hourInSeconds   = minuteInSeconds * 60,
        dayInSeconds    = hourInSeconds * 24,
        //ownContext = {}

        TSRGregorian    = "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian",
        //owl            = {'Class': context['owl']['Class']},
        //fua            = {'RS': context['fua']['Types']['ObjectTypes']['RS']},
        //fua_t          = context['fua-t']

        time            = {},
        trs_Unix_time   = "http://dbpedia.org/resource/Unix_time",
        //spaced         = false, // REM: NOT brought to space
        _trs            = new Map([[trs_Unix_time, trs_Unix_time]])
    ; // const

    //region fn

    function buildDate(value) {
        let result;
        switch (typeof value) {
            case "string":
                result = new Date(value);
                break;
            case "number":
                result = new Date(value);
                break;
            case "object":
                if (value['__proto__']['constructor']['name']) {
                    result = value;
                } // if ()
                break;
            default:
                break;
        } // switch
        return result;
    } // buildDate

    //region TEST
    //let grunz;
    //grunz = buildDate((new Date).toISOString());
    //grunz = buildDate((new Date));
    //grunz = buildDate((new Date).valueOf());
    //endregion TEST

    function now() {
        //return new Instant((new Date).toISOString());
        return new Instant(new Date);
    } // function now()

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

    //function isOdd(num) {
    //    return (num % 2 === 1);
    //} // function isOdd
    //
    //function isEven(num) {
    //    return !isOdd(num);
    //} // function isEven

    function padZero(value) {
        return ((value === undefined) ? "00" : ((value < 10) ? `0${value}` : `${value}`));
    }

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
            result       = {'@type': undefined, '@value': undefined}
        ;
        result['@value'] = dayOfWeek[day];
        result['@type']  = ((result['@value'] !== undefined) ? "sxd:NonNegativeInteger" : undefined);
        return result;
    } // function dayOfWeek()

    Object.defineProperties(dayOfWeek, {
        '@id':       {value: `${prefix}:dayOfWeek`},
        //'nc':        {value: Method_4},
        //
        0:           {value: 0},
        1:           {value: 1},
        2:           {value: 2},
        3:           {value: 3},
        4:           {value: 4},
        5:           {value: 5},
        6:           {value: 6},
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
    });

    //endregion helper

    //function TRS(config, node) {
    //    node = node || {};
    //    node = owl['Thing'](node, parameter);
    //    node = IM['$instance_serializer'](node, TRS);
    //    return node;
    //} // function TRS ()

    //Object.defineProperties(TRS, {
    //    //'@id':              {value: `${namespace}${vocab}BasicContainer`},
    //    '@id':              {value: `${namespace}:TRS`},
    //    '@type':            {value: "owl:Thing"},
    //    'rdfs:label':       {value: "TRS"},
    //    'rdfs:comment':     {value: ""},
    //    'rdfs:subClassOf':  {value: [{'@id': "ldp:Container"}]},
    //    "rdfs:isDefinedBy": {value: [{"@id": "http://www.w3.org/ns/ldp#"}]}
    //    ,
    //    '$serialize':       {
    //        value: (instance, node) => {
    //            node = owl['Thing']['$serialize'](instance, node, /** TODO */ parameter);
    //            return node;
    //        }
    //    }
    //}); // Object.defineProperties(TRS)

    function TemporalEntity(node, parameter) {
        node = node || {'@id': `urn:${uuid()}`};
        //node['@id']   = node['@id'] || `urn:${uuid()}`;
        //node['@type'] = node['@type'] || TemporalEntity['@id'];
        //node          = owl['Thing'](node, parameter);
        //node          = IM['$instance_serializer'](node, TemporalEntity);

        Object.defineProperties(node, {
            '@id':   {value: (node['@id'] || `urn:${uuid()}`)},
            '@type': {value: (node['@type'] || TemporalEntity['@id'])}
        });

        return node;
    } // function TemporalEntity
    Object.defineProperties(TemporalEntity, {
        '@id':        {value: `${namespace}:TemporalEntity`},
        '@type':      {value: "owl:Class"},
        //'rdfs:isDefinedBy': {value: `<${rdf_URI}>`},
        'rdfs:label': {value: "Temporal entity"}
    }); // Object.defineProperties(TemporalEntity)

    function Instant(dateTimeStamp) {
        //let
        //    node             = {
        //        'date':        buildDate(dateTimeStamp),
        //        'hasDuration': 0
        //    }
        //;
        //node['hasBeginning'] = node['hasEnd'] = (node['date'].valueOf() / 1000.0);
        //node['hasDuration']  = 0;
        //return node;

        this['date']        = buildDate(dateTimeStamp);
        this['hasDuration'] = 0;

        this['hasBeginning'] = this['hasEnd'] = (this['date'].valueOf() / 1000.0);
        //return this;
    }

    Object.defineProperties(Instant['prototype'], {
        '$serialize': {
            value: function () {

                let node = {
                    'inTimePosition': {
                        'numericPosition': {
                            '@value': this['hasBeginning']
                        }
                    }
                };
                Object.defineProperties(node, {
                    '@type':                  {value: "time:Instant"},
                    'hasBeginning':           {
                        value: node
                    },
                    'hasEnd':                 {
                        value: node
                    },
                    'hasDuration':            {
                        value: {
                            '@type':           "time:Duration",
                            'numericDuration': 0,
                            'unitType':        "time:unitSecond"
                        }
                    }
                });
                return node;
            }
        }

    }); // Object.defineProperties(Instant)

    function HOLD_Instant(node, parameter) {
        node = node || {};

        let
            date                        = buildDate(parameter['dateTimeStamp']),
            inNumericTimePosition       = (date.valueOf() / 1000.0),
            hasEndInNumericTimePosition = (date.valueOf() / 1000.0)
        ;

        Object.defineProperties(node, {
            '@type':                  {value: (node['@type'] || Instant['@id'])},
            '$inScriptDate':          {value: date},
            '$inNumericTimePosition': {
                //REM: short cut node.inTimePosition.numericPosition
                value: inNumericTimePosition
            },
            //
            'inTimePosition':         {
                get: () => {
                    return {
                        'rdf:type':        "time:TimePosition",
                        'hasTRS':          "<http://dbpedia.org/resource/Unix_time>",
                        'numericPosition': inNumericTimePosition
                    };
                }
            },
            'inXSDDateTimeStamp':     {
                get: () => {
                    return node['$inScriptDate'].toISOString()
                }
            },
            'inXSDgYear':             {
                get: () => {
                    return node['$inScriptDate']['getFullYear']()
                }
            },
            'inXSDgYearMonth':        {
                get: () => {
                    return `${node['$inScriptDate']['getFullYear']()}-${padZero(node['$inScriptDate']['getMonth']() + 1)}`;
                }
            },
            'inDateTime':             {
                get: () => {
                    return {
                        '@type':     "time:DateTimeDescription",
                        'time:day':  {'@type': "xsd:gDay", '@value': `---${padZero(date.getDay())}`},
                        'time:hour': {'@type': "xsd:nonNegativeInteger", '@value': date.getHours()}
                    };
                }
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
            //
            'hasBeginning':           {
                value: node
            },
            'hasEnd':                 {
                value: node
            },
            'hasDuration':            {
                value: {
                    '@type':           "time:Duration",
                    'numericDuration': 0,
                    'unitType':        "time:unitSecond"
                }
            }
        });
        node = new TemporalEntity(node, parameter);
        Object.seal(node);
        return node;
    } // function Instant
    Object.defineProperties(HOLD_Instant, {
        '@id':        {value: `${namespace}:Instant`},
        '@type':      {value: "owl:Class"},
        //'rdfs:isDefinedBy': {value: `<${rdf_URI}>`},
        'rdfs:label': {value: "Time instant"}
    }); // Object.defineProperties(Instant)

    function Interval(node, parameter) {
        node['@type'] = node['@type'] || Interval['@id'];
        node          = new TemporalEntity(node, parameter);
        return node;
    } // function Instant
    Object.defineProperties(Interval, {
        '@id':        {value: `${namespace}:Interval`},
        '@type':      {value: "owl:Class"},
        //'rdfs:isDefinedBy': {value: `<${rdf_URI}>`},
        'rdfs:label': {value: "Time interval"}
    }); // Object.defineProperties(Interval)

    function ProperInterval(node, parameter) {
        node['@type'] = node['@type'] || ProperInterval['@id'];
        node          = new Interval(node, parameter);
        return node;
    } // function Instant
    Object.defineProperties(ProperInterval, {
        '@id':        {value: `${namespace}:ProperInterval`},
        '@type':      {value: "owl:Class"},
        //'rdfs:isDefinedBy': {value: `<${rdf_URI}>`},
        'rdfs:label': {value: "Proper time interval"}
    }); // Object.defineProperties(ProperInterval)

    //region functions

    function Before(i, j) {
        let
            result = false
        ;
        return (
            //i['hasEnd']['inTimePosition']['numericPosition']['@value']
            //i['$inNumericTimePosition']
            //i['hasEnd']['$inNumericTimePosition']
            i['hasEndInNumericTimePosition']
            <
            j['hasBeginning']['inTimePosition']['numericPosition']['@value']
        );
    } // function Before()
    Object.defineProperties(Before, {
        '@id': {value: `${prefix}:Before`}
        //'nc':  {value: Method_4}
    });
    //endregion functions

    Object.defineProperties(time, {
        '$buildTemporalEntities': {enumerable: true, value: buildTemporalEntities},
        '$buildDate':             {enumerable: true, value: buildDate},
        //'TRS':                    {enumerable: true, value: TRS},
        'TemporalEntity':         {enumerable: true, value: TemporalEntity},
        'Instant':                {enumerable: true, value: Instant},
        'Interval':               {enumerable: true, value: Interval},
        'ProperInterval':         {enumerable: true, value: ProperInterval},
        //, // operators
        'Before':                 {enumerable: false, value: Before},
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
        //helper
        'now':                    {enumerable: false, value: now},
        //'dayOfWeek':      {enumerable: false, value: dayOfWeek},
        //extension
        //'Year':                   {enumerable: true, value: Year},
        'trs':                    {
            'set': (trs) => {
                if ((trs['@type'] === TRS) && !_trs.get(trs['@id']))
                    _trs.set(trs['@id'], trs);
            } // set
        }
    });

    Object.seal(time);

    //region TEST
    //let grunz = time.dayOfWeek("sun");
    //grunz = time.dayOfWeek("Monday");
    //grunz = time.dayOfWeek("Fri.");
    //endregion TEST

    return time;

};