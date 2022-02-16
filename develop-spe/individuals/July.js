const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const July = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/July',
    'time:month':    {
        '@value': '--07',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = July;
