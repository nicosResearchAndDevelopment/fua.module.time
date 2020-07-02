// https://www.w3.org/TR/owl-time/
// https://www.w3.org/2006/time#
module.exports = (
    {
        'IM':        IM,
        'uuid':      uuid,
        'namespace': namespace = "time",
        'space':     space
    }) => {

    const
        //NamespaceIndex = context['$getNamespaceIndex'](),
        prefix          = "time",
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

        owl             = space.get("owl"),
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

    function now() {
        return new context['time']['Instant']({
            'p': {
                '@id':      `${trs['@id']}/${i[0]}Y`,
                'nb':       [trs['@id'], `${i[0]}`],
                'nd':       `${i[0]}}`,
                'trs':      trs,
                'dateTime': i[0]
            }
        });
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

    function TRS(config, node) {
        node = node || {};
        node = owl['Thing'](node, parameter);
        node = IM['$instance_serializer'](node, TRS);
        return node;
    } // function TRS ()

    Object.defineProperties(TRS, {
        //'@id':              {value: `${namespace}${vocab}BasicContainer`},
        '@id':              {value: `${namespace}:TRS`},
        '@type':            {value: "owl:Thing"},
        'rdfs:label':       {value: "TRS"},
        'rdfs:comment':     {value: ""},
        'rdfs:subClassOf':  {value: [{'@id': "ldp:Container"}]},
        "rdfs:isDefinedBy": {value: [{"@id": "http://www.w3.org/ns/ldp#"}]}
        ,
        '$serialize':       {
            value: (instance, node) => {
                node = owl['Thing']['$serialize'](instance, node, /** TODO */ parameter);
                return node;
            }
        }
    }); // Object.defineProperties(TRS)

    function TemporalEntity(node, parameter) {
        node          = node || {'@id': `urn:${uuid()}`};
        node['@id']   = node['@id'] || `urn:${uuid()}`;
        node['@type'] = node['@type'] || TemporalEntity['@id'];
        node          = owl['Thing'](node, parameter);
        node          = IM['$instance_serializer'](node, TemporalEntity);
        return node;
    } // function TemporalEntity

    Object.defineProperties(TemporalEntity, {
        '@id':             {value: `${namespace}:TemporalEntity`},
        '@type':           {value: "owl:Class"},
        //'rdfs:isDefinedBy': {value: `<${rdf_URI}>`},
        'rdfs:label':      {value: "Temporal entity"},
        'rdfs:comment':    {value: "The class of RDF properties."},
        'rdfs:subClassOf': {value: "owl:Thing"}
        ,
        '$serialize':      {
            value: (instance, node) => {
                node = owl['Thing']['$serialize'](instance, node, /** TODO: parameter */ null);
                return node;
            }
        }
    }); // Object.defineProperties(TemporalEntity)

    if (false) {
        //region TRS
        class TRS extends fua.RS {

            constructor({
                            'p': p = {
                                '@id': id
                            }
                        }) {

                p['nc']        = Object_1;
                p['dimension'] = 1;

                super({'p': p});

                if (this['__proto__']['constructor'] === TRS) {
                    TRS['$mixin'](this, p, /** configurable */ false);
                    //REM: OCS >>>
                    this['refs']['sealed'] = true;
                    Object.seal(this);
                } else {
                    TRS['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class TRS
        context['$classStaticMixin']({
            'CLASS':    TRS,
            '@id':      "time:TRS",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "Time Reference System",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': fua.RS,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                //Object.defineProperties(base, {
                //    'inside': {'get': () => []}
                //});
                return base;
            } // $mixin
        }); // TRS
        //endregion TRS

        //region TemporalEntity
        class TemporalEntity extends owl.Class {

            constructor({
                            'p': p = {
                                '@id':       null,
                                'beginning': null,
                                'duration':  null,
                                'end':       null,
                                'spaced':    spaced
                            }
                        }) {

                p['spaced'] = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);

                p['nc'] = Object_1;

                super({'p': p});

                if (this['__proto__']['constructor'] === TemporalEntity) {
                    throw new Error(`class 'TemporalEntity' is abstract, so it can NOT be instantiated directly`);
                } else {
                    TemporalEntity['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class TemporalEntity
        context['$classStaticMixin']({
            'CLASS':    TemporalEntity,
            '@id':      "time:TemporalEntity",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "TemporalEntity",
            'ia':       true,
            'nc':       BaseObjectType['nc'],
            'subClass': owl.Class,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                Object.defineProperties(base, {
                    'before':       {'get': () => p['before']},
                    'hasBeginning': {'get': () => p['beginning']},
                    'hasDuration':  {'get': () => p['duration']},
                    //'hasDurationDescription': {'get': () => p.hasDurationDescription},
                    'hasEnd':       {'get': () => p['end']}
                });
                return base;
            } // $mixin
        });
        //endregion TemporalEntity

        //region TemporalPosition
        class TemporalPosition extends owl.Class {

            constructor({
                            'p': p = {
                                '@id':    null,
                                'trs':    null,
                                'spaced': false
                            }
                        }) {

                p['spaced'] = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);

                p['trs'] = (p['trs'] || _trs.get(p['trs']));

                super({'p': p});

                if (this['__proto__']['constructor'] === TemporalPosition) {
                    throw new Error(`class 'TemporalPosition' is abstract, so it can NOT be instantiated directly`);
                } else {
                    TemporalPosition['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class TemporalPosition
        context['$classStaticMixin']({
            'CLASS':    TemporalPosition,
            '@id':      "time:TemporalPosition",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "TemporalPosition",
            'ia':       true,
            'nc':       BaseObjectType['nc'],
            'subClass': owl.Class,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                Object.defineProperties(base, {
                    'hasTRS': {
                        'get': () => {
                            return p['trs'];
                        }
                    }
                });
                return base;
            } // $mixin
        });
        //endregion TemporalPosition

        //region TimePosition
        class TimePosition extends TemporalPosition {

            constructor({
                            'p': p = {
                                '@id':             null,
                                'trs':             _trs.get(p['trs']),
                                'nominalPosition': "",
                                'numericPosition': null,
                                'spaced':          false
                            }
                        }) {

                p['spaced'] = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);
                p['trs']    = (p['trs'] || _trs.get(p['trs']));

                p['nb'] = p['nb'] || ['time', "timePosition"];

                p['nominalPosition'] = {
                    '@type':  "fua:PropertyType",
                    'dt':     "xsd:string",
                    '@value': p['nominalPosition']
                };
                p['numericPosition'] = {
                    '@type':  "fua:PropertyType",
                    'dt':     "xsd:decimal",
                    '@value': p['numericPosition']
                };

                super({'p': p});

                if (this['__proto__']['constructor'] === TimePosition) {
                    TimePosition['$mixin'](this, p, /** configurable */ false);
                    //REM: OCS >>>
                    this['refs']['sealed'] = true;
                    Object.seal(this);
                } else {
                    TimePosition['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class TimePosition
        context['$classStaticMixin']({
            'CLASS':    TimePosition,
            '@id':      "time:TimePosition",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "TimePosition",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': TemporalPosition,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;

                Object.defineProperties(base, {
                    'nominalPosition': {'get': () => p['nominalPosition']},
                    'numericPosition': {'get': () => p['numericPosition']}
                });

                return base;
            } // $mixin
        });
        //endregion TimePosition

        //region TemporalDuration
        class TemporalDuration extends owl.Class {

            constructor({
                            'p': p = {
                                '@id':    null,
                                'TRS':    null,
                                'spaced': false
                            }
                        }) {

                p['spaced'] = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);

                super({'p': p});

                if (this['__proto__']['constructor'] === TemporalDuration) {
                    throw new Error(`class 'TemporalDuration' is abstract, so it can NOT be instantiated directly`);
                } else {
                    TemporalDuration['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class TemporalDuration
        context['$classStaticMixin']({
            'CLASS':    TemporalDuration,
            '@id':      "time:TemporalDuration",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "TemporalDuration",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': owl.Class,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                //Object.defineProperties(base, {
                //    'hasTRS': {'get': () => p['TRS']}
                //});
                return base;
            } // $mixin
        });
        //endregion TemporalDuration

        //region Duration
        class Duration extends TemporalDuration {

            constructor({
                            'p': p = {
                                '@id':             null,
                                'unitType':        "unitSecond",
                                'numericDuration': null,
                                'spaced':          false
                            }
                        }) {

                p['spaced'] = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);
                p['nb']     = p['nb'] || ['time', "Duration"];

                p['numericDuration'] = {
                    '@type':  "fua:PropertyType",
                    'dt':     "xsd:decimal",
                    '@value': p['numericDuration']
                };

                super({'p': p});

                if (this['__proto__']['constructor'] === Duration) {
                    Duration['$mixin'](this, p, /** configurable */ false);
                    //REM: OCS >>>
                    this['refs']['sealed'] = true;
                    Object.seal(this);
                } else {
                    Duration['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class Duration
        context['$classStaticMixin']({
            'CLASS':    Duration,
            '@id':      "time:Duration",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "Duration",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': TemporalDuration,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                Object.defineProperties(base, {
                    'unitType':        {'get': () => p['unitType']},
                    'numericDuration': {'get': () => p['numericDuration']}
                });
                return base;
            } // $mixin
        });
        //endregion Duration

        //region Instant
        class Instant extends TemporalEntity {

            constructor({
                            'p': p = {
                                '@id':      null,
                                'trs':      _trs.get(trs_Unix_time),
                                'dateTime': null,
                                'unitType': "unitSecond",
                                'spaced':   false
                            }
                        }) {

                p['spaced']   = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);
                p['trs']      = (p['trs'] || _trs.get(trs_Unix_time));
                p['dateTime'] = fua_t['Instant'](p['dateTime']);

                //p['spaced'] = spaced;
                p['nb'] = [p['trs']['@id'], p['dateTime']['toISOString']()];

                p['@id'] = (p['@id'] || `${p['nb'][0]}/${p['nb'][1]}`);
                p['nc']  = Object_1;

                p['duration'] = new Duration({
                    'p': {
                        '@id':             `${p['@id']}#duration`,
                        'unitType':        p['unitType'],
                        'numericDuration': 0.0
                    }
                });

                //TODO: das ist GAR NICHT gut, da die Bruchteile der Sekunden < 10^-3 flöten gehen...
                p['timePosition'] = (p['dateTime'].toScriptDate().valueOf() / 1000.0);
                p['xsdDateTime']  = p['dateTime']['toISOString']();

                super({'p': p});

                p['beginning'] = this;
                p['end']       = this;

                if (this['__proto__']['constructor'] === Instant) {
                    Instant['$mixin'](this, p, /** configurable */ false);
                    //REM: OCS >>>
                    this['refs']['sealed'] = true;
                    Object.seal(this);
                } else {
                    Instant['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

                //delete p['dateTime'];

            } // constructor
        } // class Instant
        context['$classStaticMixin']({
            'CLASS':    Instant,
            '@id':      "time:Instant",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "Instant",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': TemporalEntity,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;

                Object.defineProperties(base, {
                    'inDateTime':         {'get': () => undefined},
                    'inTimePosition':     {
                        'get': () => {
                            if (p['timePosition']['@type'] !== TimePosition)
                                p['timePosition'] = new TimePosition({
                                    'p': {
                                        '@id':             `${p['@id']}#timePosition`,
                                        'trs':             p['trs'],
                                        'numericPosition': p['timePosition']
                                    }
                                });
                            return p['timePosition'];
                        }
                    },
                    //'inXSDDate':          {'get': () => p['xsdDate']},
                    'inXSDDate':          {
                        'get': () => {
                            return p['xsdDateTime'].split('T')[0];
                        }
                    },// TODO: make it better
                    'inXSDDateTime':      {'get': () => p['xsdDateTime']},
                    'inXSDDateTimeStamp': {'get': () => p['xsdDateTimeStamp']},
                    'inXSDgYear':         {'get': () => `${p['dateTime'][0]}`},
                    'inXSDgYearMonth':    {'get': () => `${p['dateTime'][0]}-${padZero((p['dateTime'][1] + 1))}`}
                });

                return base;
            } // $mixin
        });
        //endregion Instant

        //region Interval
        class Interval extends TemporalEntity {

            constructor({
                            'p': p = {
                                '@id':       null,
                                'trs':       _trs.get(trs_Unix_time),
                                'beginning': null,
                                'end':       null,
                                'unitType':  "unitSecond",
                                'spaced':    false
                            }
                        }) {

                //p['dateTime'] = fua_t['Instant'](p['dateTime']);

                p['spaced'] = ((typeof p['spaced'] === 'boolean') ? p['spaced'] : spaced);
                p['trs']    = (p['trs'] || _trs.get(trs_Unix_time));
                p['nc']     = Object_1;

                if (p['beginning']['@type'] !== Instant)
                    p['beginning'] = new Instant({
                        'p': {
                            'trs':      p['trs'],
                            'dateTime': p['beginning'],
                            'unitType': p['unitType'],
                            'spaced':   p['spaced']
                        }
                    });
                if (p['end']['@type'] !== Instant)
                    p['end'] = new Instant({
                        'p': {
                            'trs':      p['trs'],
                            'dateTime': p['end'],
                            'unitType': p['unitType'],
                            'spaced':   p['spaced']
                        }
                    });
                //p['duration']     = {'unitType': p['unitType'], 'numericDuration': {'@value': 0.0, '@type': "sxd:decimal"}};
                p['duration'] = new Duration({
                    'p': {
                        '@id':             `${p['@id']}#duration`,
                        'nb':              [p['@id'], "duration"],
                        'unitType':        p['unitType'],
                        //'numericDuration': ((p['end']['toScriptDate']() - p['beginning']['toScriptDate']()) / 1000.0)
                        'numericDuration': (p['end']['inTimePosition']['numericPosition']['@value'] - p['beginning']['inTimePosition']['numericPosition']['@value']),
                        'spaced':          p['spaced']
                    }
                });

                super({'p': p});

                if (this['__proto__']['constructor'] === Interval) {
                    Interval['$mixin'](this, p, /** configurable */ false);
                    //REM: OCS >>>
                    this['refs']['sealed'] = true;
                    Object.seal(this);
                } else {
                    Interval['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class Interval
        context['$classStaticMixin']({
            'CLASS':    Interval,
            '@id':      "time:Interval",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "Interval",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': TemporalEntity,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                Object.defineProperties(base, {
                    'inside': {'get': () => []}
                });
                return base;
            } // $mixin
        });
        //endregion Interval

        //region ProperInterval
        class ProperInterval extends Interval {

            constructor({
                            'p': p = {
                                '@id':      null,
                                'dateTime': null,
                                'unitType': "unitSecond",
                                'spaced':   false
                            }
                        }) {

                //p['spaced'] = spaced;
                p['nc'] = Object_1;

                //p['dateTime'] = fua_t['Instant'](p['dateTime']);
                //
                //p['beginning']    = p['dateTime'];
                ////p['duration']     = {'unitType': p['unitType'], 'numericDuration': {'@value': 0.0, '@type': "sxd:decimal"}};
                //p['duration']     = new Duration({
                //    'p': {
                //        '@id':             `${p['@id']}#duration`,
                //        'unitType':        p['unitType'],
                //        'numericDuration': 0.0
                //    }
                //});
                //p['end']          = p['dateTime'];
                //p['timePosition'] = (p['dateTime'].toScriptDate().valueOf() / 1000);

                super({'p': p});

                if (this['__proto__']['constructor'] === ProperInterval) {
                    ProperInterval['$mixin'](this, p, /** configurable */ false);
                    //REM: OCS >>>
                    this['refs']['sealed'] = true;
                    Object.seal(this);
                } else {
                    ProperInterval['$mixin'](this, p, /** configurable */ true);
                    //REM: OCS >>>
                } // if ()

            } // constructor
        } // class ProperInterval
        context['$classStaticMixin']({
            'CLASS':    ProperInterval,
            '@id':      "time:ProperInterval",
            //'nb':     {value: ["fua", "FolderType"]},
            'nd':       "ProperInterval",
            'ia':       false,
            'nc':       BaseObjectType['nc'],
            'subClass': Interval,
            'il':       undefined, // REM: identifierLiteral :: 'undefined' === '@id'
            '$mixin':   (base, p, configurable) => {
                configurable = (typeof configurable === "boolean") ? configurable : false;
                Object.defineProperties(base, {
                    'inside': {'get': () => []}
                });
                return base;
            } // $mixin
        });
        //endregion ProperInterval
    } // if (shield)

    //region functions
    function ___Before(i, j) {
        let
            result = {'@type': "xsd:boolean", '@value': false}
        ;
        if (
            i['hasEnd']['inTimePosition']['numericPosition']['@value']
            <
            j['hasBeginning']['inTimePosition']['numericPosition']['@value']
        )
            result['@value'] = true;

        return result;
    } // function ___Before()
    function Before(i, j) {
        let
            result = false
        ;
        //if (
        //    i['hasEnd']['inTimePosition']['numericPosition']['@value']
        //    <
        //    j['hasBeginning']['inTimePosition']['numericPosition']['@value']
        //)
        //    result = (
            return (
                i['hasEnd']['inTimePosition']['numericPosition']['@value']
                <
                j['hasBeginning']['inTimePosition']['numericPosition']['@value']
            );

        //return result;
    } // function Before()
    Object.defineProperties(Before, {
        '@id': {value: `${prefix}:Before`}
        //'nc':  {value: Method_4}
    });

    Object.defineProperties(time, {
        '$buildTemporalEntities': {enumerable: true, value: buildTemporalEntities},
        'TRS':                    {enumerable: true, value: TRS},
        'TemporalEntity':         {enumerable: true, value: TemporalEntity},
        //'Instant':                {enumerable: true, value: Instant},
        //'Interval':               {enumerable: true, value: Interval},
        //'ProperInterval':         {enumerable: true, value: ProperInterval}
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

    //context['$addSpaceType']([
    //    time['TRS'],
    //    time['TemporalEntity'],
    //    time['Instant'],
    //    time['Interval'],
    //    time['ProperInterval'],
    //    //extensions
    //    time['Year']
    //]);

    //return {
    //    '$version': `${version}.${subVersion}.${patch}`,
    //    'time':     time
    //}; // return

    return time;

};