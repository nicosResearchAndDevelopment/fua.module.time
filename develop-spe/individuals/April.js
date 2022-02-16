const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const April = new model.MonthOfYear({
    '@id':           'http://www.w3.org/ns/time/gregorian/April',
    'time:month':    {
        '@value': '--04',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = April;
