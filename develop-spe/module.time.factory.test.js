const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    factory          = require('./module.time.factory.js');

describe('develop-spe/module.time/factory', function () {

    test('DEVELOP', function () {

        console.log(factory.temporalPosition(Date.now() / 1000).toJSON());

    }); // test

}); // describe
