const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    factory          = require('./module.time.factory.js');

describe('develop-spe/module.time/factory', function () {

    test('DEVELOP', function () {

        // console.log(factory.temporalPosition(Date.now() / 1000).toJSON());
        // console.log(factory.temporalDuration('-P1Y2M3DT4H5M6.7S').toJSON());
        // console.log(factory.temporalEntity(Date.now() / 1000).toJSON());
        // console.log(factory.temporalEntity([Date.now() / 1000, 'P1Y2M3DT4H5M6.7S']).toJSON());
        // console.log(JSON.stringify(factory.temporalEntity(['P1Y2M3DT4H5M6.7S', '2008']), null, 4));
        console.log(factory.temporalDuration([new Date(), Date.now() / 1000 + 3600]).toJSON());

    }); // test

}); // describe
