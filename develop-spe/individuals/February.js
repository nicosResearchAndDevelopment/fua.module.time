const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const February = new model.MonthOfYear({
    '@id':           util.gregIRI('February'),
    'time:month':    {
        '@value': '--02',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = February;
