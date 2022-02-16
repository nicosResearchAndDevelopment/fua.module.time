const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const February = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/February',
    'time:month':    {
        '@value': '--02',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = February;
