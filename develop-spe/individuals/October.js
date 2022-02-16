const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const October = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/October',
    'time:month':    {
        '@value': '--10',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = October;
