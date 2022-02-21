const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const October = new model.MonthOfYear({
    '@id':           util.gregIRI('October'),
    'time:month':    {
        '@value': '--10',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

October.lock();
module.exports = October;
