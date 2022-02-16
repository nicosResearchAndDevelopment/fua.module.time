const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('./module.time.js'),
    maxDateTS        = 8640000000000000e-3; // 8,640,000,000,000,000 milliseconds => e-3 makes it to seconds

describe('develop-spe/module.time', function () {

    test('DEVELOP', function () {

        console.log(time.model);

    });

});
