const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('./module.time.js'),
    maxDateTS        = 8640000000000000e-3; // 8,640,000,000,000,000 milliseconds => e-3 makes it to seconds

describe('develop-spe/module.time', function () {

    test('DEVELOP', function () {

        console.log(time.model);

    });

    test('TemporalPosition', function () {
        const ex1 = new time.model.TemporalPosition({
            '@type':                              'http://www.w3.org/2006/time#TemporalPosition',
            '@id':                                'ex:1',
            'http://www.w3.org/2006/time#hasTRS': time.model.Gregorian
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':       'time:TemporalPosition',
            '@id':         'ex:1',
            'time:hasTRS': {
                '@type': 'time:TRS',
                '@id':   'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian'
            }
        });
    });

    test('TemporalEntity', function () {
        const ex1 = new time.model.TemporalEntity({
            '@id':                 'ex:1',
            'time:hasXSDDuration': 'P1Y'
        });
        expect(JSON.parse(JSON.stringify(ex1))).toMatchObject({
            '@type':               'time:TemporalEntity',
            '@id':                 'ex:1',
            'time:hasXSDDuration': {
                '@type':  'xsd:duration',
                '@value': 'P1Y'
            }
        });
    });

});
