const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const December = new model.MonthOfYear({
    '@id':           util.gregIRI('December'),
    'time:month':    {
        '@value': '--12',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = December;
