const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const June = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/June',
    'time:month':    {
        '@value': '--06',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = June;
