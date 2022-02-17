const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const September = new model.MonthOfYear({
    '@id':           util.gregIRI('September'),
    'time:month':    {
        '@value': '--09',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = September;
