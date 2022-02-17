const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const June = new model.MonthOfYear({
    '@id':           util.gregIRI('June'),
    'time:month':    {
        '@value': '--06',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = June;
