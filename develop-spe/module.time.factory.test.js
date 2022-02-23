const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {inspect}        = require('util'),
    logJSON          = (obj) => console.log(inspect(obj.toJSON?.() ?? obj, false, null, true)),
    factory          = require('./module.time.factory.js');

describe('develop-spe/module.time/factory', function () {

    test('DEVELOP', function () {

        // logJSON(factory.temporalPosition(Date.now() / 1000));
        // logJSON(factory.temporalDuration('-P1Y2M3DT4H5M6.7S'));
        // logJSON(factory.temporalEntity(Date.now() / 1000));
        // logJSON(factory.temporalEntity([Date.now() / 1000, 'P1Y2M3DT4H5M6.7S']));
        // logJSON(factory.temporalEntity(['P1Y2M3DT4H5M6.7S', '2008']));
        logJSON(factory.temporalDuration([new Date(), Date.now() / 1000 + 3600]));

    }); // test

}); // describe
