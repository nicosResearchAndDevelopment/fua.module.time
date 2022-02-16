const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const November = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/November',
    'time:month':    {
        '@value': '--11',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = November;
