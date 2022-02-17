const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const August = new model.MonthOfYear({
    '@id':           util.gregIRI('August'),
    'time:month':    {
        '@value': '--08',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = August;
