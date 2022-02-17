const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const July = new model.MonthOfYear({
    '@id':           util.gregIRI('July'),
    'time:month':    {
        '@value': '--07',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = July;
