const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('./module.time.js'),
    maxDateTS        = 8640000000000000e-3; // 8,640,000,000,000,000 milliseconds => e-3 makes it to seconds

describe('develop-spe/module.time', function () {

    test('DEVELOP', function () {

        console.log(time.model);

        expect(time.model.Gregorian).toBeInstanceOf(time.model.TRS);

        expect(time.model.unitYear).toBeInstanceOf(time.model.TemporalUnit);
        expect(time.model.unitMonth).toBeInstanceOf(time.model.TemporalUnit);
        expect(time.model.unitWeek).toBeInstanceOf(time.model.TemporalUnit);
        expect(time.model.unitDay).toBeInstanceOf(time.model.TemporalUnit);
        expect(time.model.unitHour).toBeInstanceOf(time.model.TemporalUnit);
        expect(time.model.unitMinute).toBeInstanceOf(time.model.TemporalUnit);
        expect(time.model.unitSecond).toBeInstanceOf(time.model.TemporalUnit);

        expect(time.model.Monday).toBeInstanceOf(time.model.DayOfWeek);
        expect(time.model.Tuesday).toBeInstanceOf(time.model.DayOfWeek);
        expect(time.model.Wednesday).toBeInstanceOf(time.model.DayOfWeek);
        expect(time.model.Thursday).toBeInstanceOf(time.model.DayOfWeek);
        expect(time.model.Friday).toBeInstanceOf(time.model.DayOfWeek);
        expect(time.model.Saturday).toBeInstanceOf(time.model.DayOfWeek);
        expect(time.model.Sunday).toBeInstanceOf(time.model.DayOfWeek);

        expect(time.model.January).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.February).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.March).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.April).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.May).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.June).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.July).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.August).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.September).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.October).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.November).toBeInstanceOf(time.model.MonthOfYear);
        expect(time.model.December).toBeInstanceOf(time.model.MonthOfYear);

    }); // test

    test('TemporalPosition', function () {
        const ex1 = new time.model.TemporalPosition({
            '@type':                              'http://www.w3.org/2006/time#TemporalPosition',
            '@id':                                'ex:1',
            'http://www.w3.org/2006/time#hasTRS': time.model.Gregorian
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':       'time:TemporalPosition',
            '@id':         'ex:1',
            'time:hasTRS': {'@id': 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian'}
        });
        expect(ex1.hasTRS.get()).toBe(time.model.Gregorian);
    }); // test

    test('TimePosition', function () {
        const ex1 = new time.model.TimePosition({
            'time:hasTRS':          time.model.Gregorian,
            'time:numericPosition': {
                '@type':  'xsd:decimal',
                '@value': Math.floor(new Date('2000-01-01T00:00:00Z') / 1000).toString()
            }
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':                'time:TimePosition',
            'time:numericPosition': {
                '@type':  'xsd:decimal',
                '@value': '946684800'
            }
        });
        expect(ex1.numericPosition.size).toBe(1);
        expect(ex1.numericPosition.get().value).toBe('946684800');
        expect(ex1.numericPosition.get().number).toBe(946684800);
    }); // test

    test('GeneralDateTimeDescription'); // test

    test('DateTimeDescription', function () {
        const ex1 = new time.model.DateTimeDescription({
            '@id':           'ex:1',
            'time:day':      '---12',
            'time:month':    '--02',
            'time:year':     '2008',
            'time:unitType': time.model.unitDay
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':         'time:DateTimeDescription',
            '@id':           'ex:1',
            'time:day':      {
                '@type':  'xsd:gDay',
                '@value': '---12'
            },
            'time:month':    {
                '@type':  'xsd:gMonth',
                '@value': '--02'
            },
            'time:year':     {
                '@type':  'xsd:gYear',
                '@value': '2008'
            },
            'time:hasTRS':   {'@id': 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian'},
            'time:unitType': {'@id': 'time:unitDay'}
        });
        expect(ex1.month.size).toBe(1);
        expect(ex1.month.get().value).toBe('--02');
        expect(ex1.month.get().month).toBe(2);
    }); // test

    test('TemporalDuration', function () {
        const ex1 = new time.model.TemporalDuration({
            '@id':           'ex:1',
            'time:day':      '---12',
            'time:month':    '--02',
            'time:year':     '2008',
            'time:unitType': time.model.unitDay,
            'time:hasTRS':   time.model.Gregorian
        });
        expect(JSON.parse(JSON.stringify(ex1))).toEqual({
            '@type': 'time:TemporalDuration',
            '@id':   'ex:1'
        });
        expect(ex1.day).toBeFalsy();
        expect(ex1.month).toBeFalsy();
        expect(ex1.year).toBeFalsy();
    }); // test

    test('Duration', function () {
        const ex1 = new time.model.Duration({
            'time:unitType':        time.model.unitDay,
            'time:numericDuration': '365'
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':                'time:Duration',
            'time:unitType':        {'@id': 'time:unitDay'},
            'time:numericDuration': {
                '@type':  'xsd:decimal',
                '@value': '365'
            }
        });
    }); // test

    test('GeneralDurationDescription'); // test

    test('DurationDescription', function () {
        const ex1 = new time.model.DurationDescription({
            'time:days':    '7',
            'time:hours':   '24',
            'time:minutes': '60',
            'time:months':  '12',
            'time:seconds': '60',
            'time:weeks':   '52',
            'time:years':   '1'
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':        'time:DurationDescription',
            'time:hasTRS':  {'@id': 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian'},
            'time:days':    {
                '@type':  'xsd:decimal',
                '@value': '7'
            },
            'time:hours':   {
                '@type':  'xsd:decimal',
                '@value': '24'
            },
            'time:minutes': {
                '@type':  'xsd:decimal',
                '@value': '60'
            },
            'time:months':  {
                '@type':  'xsd:decimal',
                '@value': '12'
            },
            'time:seconds': {
                '@type':  'xsd:decimal',
                '@value': '60'
            },
            'time:weeks':   {
                '@type':  'xsd:decimal',
                '@value': '52'
            },
            'time:years':   {
                '@type':  'xsd:decimal',
                '@value': '1'
            }
        });
        expect(ex1.weeks.size).toBe(1);
        expect(ex1.weeks.get().value).toBe('52');
        expect(ex1.weeks.get().number).toBe(52);
    }); // test

    test('TemporalEntity', function () {
        const ex1 = new time.model.TemporalEntity({
            '@id':                 'ex:1',
            'time:hasXSDDuration': ['P1Y']
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':               'time:TemporalEntity',
            '@id':                 'ex:1',
            'time:hasXSDDuration': [{
                '@type':  'xsd:duration',
                '@value': 'P1Y'
            }]
        });
        expect(ex1.hasXSDDuration.size).toBe(1);
        expect(ex1.hasXSDDuration.get()[0].value).toBe('P1Y');
        expect(ex1.hasXSDDuration.get()[0].years).toBe(1);
        expect(ex1.hasXSDDuration.get()[0].months).toBe(0);
        expect(ex1.hasXSDDuration.get()[0].days).toBe(0);
        expect(ex1.hasBeginning.size).toBe(0);
        expect(() => ex1.hasBeginning.add({
            // NOTE: cardinality of inXSDDateTimeStamp is > 1, so an array must be used to construct the instant
            'time:inXSDDateTimeStamp': '2000-01-01T00:00:00Z'
        })).toThrow();
        ex1.hasBeginning.add({
            'time:inXSDDateTimeStamp': ['2000-01-01T00:00:00Z']
        });
        ex1.hasBeginning.add({
            'time:inXSDgYear': ['2000']
        });
        expect(ex1.hasBeginning.size).toBe(2);
        expect(JSON.parse(JSON.stringify(ex1.hasBeginning.get()))).toMatchObject([{
            '@type':                   'time:Instant',
            'time:inXSDDateTimeStamp': [{
                '@type':  'xsd:dateTimeStamp',
                '@value': '2000-01-01T00:00:00Z'
            }]
        }, {
            '@type':           'time:Instant',
            'time:inXSDgYear': [{
                '@type':  'xsd:gYear',
                '@value': '2000'
            }]
        }]);
    }); // test

    test('Instant'); // test

    test('Interval'); // test

    test('ProperInterval', function () {
        const ex1 = new time.model.ProperInterval({
            'time:hasBeginning':   [{'time:inXSDDateTimeStamp': ['2000-01-01T00:00:00Z']}],
            'time:hasEnd':         [{'time:inXSDDateTimeStamp': ['2001-01-01T00:00:00Z']}],
            'time:intervalMeets':  [{
                'time:hasBeginning': [{'time:inXSDDateTimeStamp': ['2001-01-01T00:00:00Z']}],
                'time:hasEnd':       [{'time:inXSDDateTimeStamp': ['2002-01-01T00:00:00Z']}]
            }],
            'time:intervalBefore': [{
                'time:hasBeginning': [{'time:inXSDDateTimeStamp': ['2002-01-01T00:00:00Z']}],
                'time:hasEnd':       [{'time:inXSDDateTimeStamp': ['2003-01-01T00:00:00Z']}]
            }]
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':               'time:ProperInterval',
            'time:hasBeginning':   [{
                '@type':                   'time:Instant',
                'time:inXSDDateTimeStamp': [{
                    '@type':  'xsd:dateTimeStamp',
                    '@value': '2000-01-01T00:00:00Z'
                }]
            }],
            'time:hasEnd':         [{
                '@type':                   'time:Instant',
                'time:inXSDDateTimeStamp': [{
                    '@type':  'xsd:dateTimeStamp',
                    '@value': '2001-01-01T00:00:00Z'
                }]
            }],
            'time:intervalMeets':  [{
                '@type':             'time:ProperInterval',
                'time:hasBeginning': [{
                    '@type':                   'time:Instant',
                    'time:inXSDDateTimeStamp': [{
                        '@type':  'xsd:dateTimeStamp',
                        '@value': '2001-01-01T00:00:00Z'
                    }]
                }],
                'time:hasEnd':       [{
                    '@type':                   'time:Instant',
                    'time:inXSDDateTimeStamp': [{
                        '@type':  'xsd:dateTimeStamp',
                        '@value': '2002-01-01T00:00:00Z'
                    }]
                }]
            }],
            'time:intervalBefore': [{
                '@type':             'time:ProperInterval',
                'time:hasBeginning': [{
                    '@type':                   'time:Instant',
                    'time:inXSDDateTimeStamp': [{
                        '@type':  'xsd:dateTimeStamp',
                        '@value': '2002-01-01T00:00:00Z'
                    }]
                }],
                'time:hasEnd':       [{
                    '@type':                   'time:Instant',
                    'time:inXSDDateTimeStamp': [{
                        '@type':  'xsd:dateTimeStamp',
                        '@value': '2003-01-01T00:00:00Z'
                    }]
                }]
            }]
        });
    }); // test

    test('DateTimeInterval'); // test

}); // describe
