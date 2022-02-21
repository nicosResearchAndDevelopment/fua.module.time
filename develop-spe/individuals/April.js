const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const April = new model.MonthOfYear({
    '@id':           util.gregIRI('April'),
    'time:month':    {
        '@value': '--04',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

April.lock();
module.exports = April;
