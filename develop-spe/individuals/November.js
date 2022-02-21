const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const November = new model.MonthOfYear({
    '@id':           util.gregIRI('November'),
    'time:month':    {
        '@value': '--11',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

November.lock();
module.exports = November;
