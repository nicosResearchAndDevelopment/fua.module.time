const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const May = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/May',
    'time:month':    {
        '@value': '--05',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = May;
