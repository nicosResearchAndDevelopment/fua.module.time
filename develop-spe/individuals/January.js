const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const January = new model.MonthOfYear({
    '@id':           util.gregIRI('January'),
    'time:month':    {
        '@value': '--01',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = January;
